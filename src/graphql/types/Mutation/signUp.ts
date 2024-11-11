import { hash } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { uuidv7 } from "uuidv7";
import { z } from "zod";
import { usersTable } from "~/src/drizzle/tables/users";
import { builder } from "~/src/graphql/builder";
import {
	MutationSignUpInput,
	mutationSignUpInputSchema,
} from "~/src/graphql/inputs/MutationSignUpInput";
import { AuthenticationPayload } from "~/src/graphql/types/AuthenticationPayload";
import { TalawaGraphQLError } from "~/src/utilities/TalawaGraphQLError";

const mutationSignUpArgumentsSchema = z.object({
	input: mutationSignUpInputSchema.transform((arg, ctx) => {
		const { confirmedPassword, ...transformedArg } = arg;
		if (confirmedPassword !== arg.password) {
			ctx.addIssue({
				code: "custom",
				path: ["confirmedPassword"],
				message: "Does not match the password.",
			});
		}

		return transformedArg;
	}),
});

builder.mutationField("signUp", (t) =>
	t.field({
		args: {
			input: t.arg({
				description: "Input required for signing up to talawa application.",
				required: true,
				type: MutationSignUpInput,
			}),
		},
		description: "Mutation field for a client to sign up to talawa.",
		resolve: async (_parent, args, ctx) => {
			if (ctx.currentClient.isAuthenticated) {
				throw new TalawaGraphQLError({
					extensions: {
						code: "forbidden_action",
					},
					message: "Only unauthenticated users can perform this action.",
				});
			}

			const {
				data: parsedArgs,
				error,
				success,
			} = mutationSignUpArgumentsSchema.safeParse(args);

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

			const [existingUserWithEmailAddress] = await ctx.drizzleClient
				.select()
				.from(usersTable)
				.where(eq(usersTable.emailAddress, parsedArgs.input.emailAddress));

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

			const userId = uuidv7();

			const [createdUser] = await ctx.drizzleClient
				.insert(usersTable)
				.values({
					...parsedArgs.input,
					creatorId: userId,
					id: userId,
					passwordHash: await hash(parsedArgs.input.password),
				})
				.returning();

			// Inserted user not being returned is a external defect unrelated to this code. It is very unlikely for this error to occur.
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

			return {
				authenticationToken: ctx.jwt.sign({
					user: {
						id: createdUser.id,
					},
				}),
				user: createdUser,
			};
		},
		type: AuthenticationPayload,
	}),
);
