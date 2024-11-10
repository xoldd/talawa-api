import { hash } from "@node-rs/argon2";
import { z } from "zod";
import {
	usersTable,
	type usersTableInsertSchema,
} from "~/src/drizzle/tables/users";
import { builder } from "~/src/graphql/builder";
import {
	MutationCreateUserInput,
	mutationCreateUserInputSchema,
} from "~/src/graphql/inputs/MutationCreateUserInput";
import { User } from "~/src/graphql/types/User/User";
import {
	type ForbiddenActionOnArgumentsAssociatedResources,
	TalawaGraphQLError,
} from "~/src/utilities/TalawaGraphQLError";

const mutationCreateUsersArgumentsSchema = z.object({
	input: mutationCreateUserInputSchema.array().min(1).max(32),
});

builder.mutationField("createUsers", (t) =>
	t.field({
		args: {
			input: t.arg({
				description: "",
				required: true,
				type: t.arg.listRef(MutationCreateUserInput, {
					required: true,
				}),
			}),
		},
		description: "Entrypoint mutation field to create user records.",
		resolve: async (_parent, args, ctx) => {
			if (!ctx.currentClient.isAuthenticated) {
				throw new TalawaGraphQLError({
					extensions: {
						code: "unauthenticated",
					},
					message: "Only authenticated users can perform this action.",
				});
			}

			const currentUserId = ctx.currentClient.user.id;

			const currentUser = await ctx.drizzleClient.query.usersTable.findFirst({
				columns: {
					role: true,
				},
				where: (fields, operators) => operators.eq(fields.id, currentUserId),
			});

			if (currentUser === undefined) {
				throw new TalawaGraphQLError({
					extensions: {
						code: "unauthenticated",
					},
					message: "Only authenticated users can perform this action.",
				});
			}

			if (currentUser.role !== "administrator") {
				throw new TalawaGraphQLError({
					extensions: {
						code: "unauthorized_action",
					},
					message: "You are not authorized to perform this action.",
				});
			}

			const {
				data: parsedArgs,
				error,
				success,
			} = mutationCreateUsersArgumentsSchema.safeParse(args);

			if (!success) {
				throw new TalawaGraphQLError({
					extensions: {
						code: "invalid_arguments",
						issues: error.issues.map((issue) => ({
							argumentPath: issue.path,
							message: issue.message,
						})),
					},
					message: "Invalid arguments provided.",
				});
			}

			const emailAddresses = parsedArgs.input.map(
				(input) => input.emailAddress,
			);

			/**
			 * Array of existing user records with `emailAddress` field that is equal to the corresponding `emailAddress` field in the inputs in the `parsedArgs.input` array.
			 */
			const existingUsersWithEmailAddresses = (
				await ctx.drizzleClient.query.usersTable.findMany({
					columns: {
						emailAddress: true,
					},
					where: (fields, operators) =>
						operators.inArray(fields.emailAddress, emailAddresses),
				})
			).sort(
				// Sort the user records in the order of corresponding inputs provided by the client.
				(user0, user1) =>
					emailAddresses.indexOf(user0.emailAddress) -
					emailAddresses.indexOf(user1.emailAddress),
			);

			// Length of the `existingUsersWithEmailAddresses` array not being equal to 0 means that the postgres insert operation would result in a unique constraint violation.
			if (existingUsersWithEmailAddresses.length !== 0) {
				throw new TalawaGraphQLError({
					extensions: {
						code: "forbidden_action_on_arguments_associated_resources",
						issues: emailAddresses.reduce<
							ForbiddenActionOnArgumentsAssociatedResources["issues"]
						>((accumulator, emailAddress, index) => {
							if (
								existingUsersWithEmailAddresses.some(
									(user) => user.emailAddress === emailAddress,
								)
							) {
								accumulator.push({
									argumentPath: ["input", index, "emailAddress"],
									message: "This email address is already registered.",
								});
							}
							return accumulator;
						}, []),
					},
					message:
						"This action is forbidden on the resources associated to the provided arguments.",
				});
			}

			const currentClientUserId = ctx.currentClient.user.id;

			const inputs = await Promise.all(
				parsedArgs.input.map<
					Promise<
						Omit<z.infer<typeof mutationCreateUserInputSchema>, "password"> & {
							creatorId: z.infer<typeof usersTableInsertSchema.shape.creatorId>;
							passwordHash: z.infer<
								typeof usersTableInsertSchema.shape.passwordHash
							>;
						}
					>
				>(({ password, ...remainingInput }) =>
					// Immediately invoked anonymous async function for creating a promise.
					(async () => ({
						...remainingInput,
						creatorId: currentClientUserId,
						passwordHash: await hash(password),
					}))(),
				),
			);

			return await ctx.drizzleClient
				.insert(usersTable)
				.values(inputs)
				.returning();
		},
		type: t.listRef(User),
	}),
);
