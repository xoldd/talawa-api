import { hash } from "@node-rs/argon2";
import { z } from "zod";
import { usersTable } from "~/src/drizzle/tables/users";
import { builder } from "~/src/graphql/builder";
import {
	MutationCreateUserInput,
	mutationCreateUserInputSchema,
} from "~/src/graphql/inputs/MutationCreateUserInput";
import { User } from "~/src/graphql/types/User/User";
import { TalawaGraphQLError } from "~/src/utilities/TalawaGraphQLError";

const mutationCreateUserArgumentsSchema = z.object({
	input: mutationCreateUserInputSchema,
});

builder.mutationField("createUser", (t) =>
	t.field({
		args: {
			input: t.arg({
				description: "",
				required: true,
				type: MutationCreateUserInput,
			}),
		},
		description: "Entrypoint mutation field to create a single user record.",
		resolve: async (_parent, args, ctx) => {
			if (!ctx.currentClient.isAuthenticated) {
				throw ctx.currentClient.error;
			}

			if (ctx.currentClient.user.role !== "administrator") {
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
			} = mutationCreateUserArgumentsSchema.safeParse(args);

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

			const existingUserWithEmailAddress =
				await ctx.drizzleClient.query.usersTable.findFirst({
					where: (fields, operators) =>
						operators.eq(fields.emailAddress, parsedArgs.input.emailAddress),
				});

			if (existingUserWithEmailAddress !== undefined) {
				throw new TalawaGraphQLError({
					extensions: {
						code: "forbidden_action_on_arguments_associated_resources",
						issues: [
							{
								argumentPath: ["input", "emailAddress"],
								message: "This email address is already registered.",
							},
						],
					},
					message:
						"This action is forbidden on the resources associated to the provided arguments.",
				});
			}

			const [createdUser] = await ctx.drizzleClient
				.insert(usersTable)
				.values({
					...parsedArgs.input,
					creatorId: ctx.currentClient.user.id,
					passwordHash: await hash(parsedArgs.input.password),
				})
				.returning();

			// Inserted user record not being returned is a tooling specific defect unrelated to this code. It is very unlikely for this error to occur.
			if (createdUser === undefined) {
				ctx.log.error(
					"Postgres insert operation unexpectedly returned an empty array instead of throwing an error.",
				);
				throw new TalawaGraphQLError({
					extensions: {
						code: "unexpected",
					},
					message: "Something went wrong. Please try again.",
				});
			}

			return createdUser;
		},
		type: User,
	}),
);
