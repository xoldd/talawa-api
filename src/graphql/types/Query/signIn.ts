import { verify } from "@node-rs/argon2";
import { z } from "zod";
import { builder } from "~/src/graphql/builder";
import {
	QuerySignInInput,
	querySignInInputSchema,
} from "~/src/graphql/inputs/QuerySignInInput";
import { AuthenticationPayload } from "~/src/graphql/types/AuthenticationPayload";
import { TalawaGraphQLError } from "~/src/utilities/TalawaGraphQLError";

const querySignInArgumentsSchema = z.object({
	input: querySignInInputSchema,
});

builder.queryField("signIn", (t) =>
	t.field({
		args: {
			input: t.arg({
				description: "",
				required: true,
				type: QuerySignInInput,
			}),
		},
		description: "Entrypoint query field for a client to sign in to talawa.",
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
			} = querySignInArgumentsSchema.safeParse(args);

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

			const existingUser = await ctx.drizzleClient.query.usersTable.findFirst({
				where: (fields, operators) =>
					operators.eq(fields.emailAddress, parsedArgs.input.emailAddress),
			});

			if (existingUser === undefined) {
				throw new TalawaGraphQLError({
					extensions: {
						code: "invalid_arguments",
						issues: [
							{
								argumentPath: ["input", "emailAddress"],
								message: "This email might be invalid.",
							},
							{
								argumentPath: ["input", "password"],
								message: "This password might be invalid.",
							},
						],
					},
					message: "Invalid arguments provided.",
				});
			}

			if (
				!(await verify(existingUser.passwordHash, parsedArgs.input.password))
			) {
				throw new TalawaGraphQLError({
					extensions: {
						code: "invalid_arguments",
						issues: [
							{
								argumentPath: ["input", "emailAddress"],
								message: "This email might be invalid.",
							},
							{
								argumentPath: ["input", "password"],
								message: "This password might be invalid.",
							},
						],
					},
					message: "Invalid arguments provided.",
				});
			}

			return {
				authenticationToken: ctx.jwt.sign({
					user: {
						id: existingUser.id,
					},
				}),
				user: existingUser,
			};
		},
		type: AuthenticationPayload,
	}),
);
