import { hash } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { usersTable } from "~/src/drizzle/schema";
import { builder } from "~/src/graphql/builder";
import {
	MutationUpdateCurrentUserInput,
	mutationUpdateCurrentUserInputSchema,
} from "~/src/graphql/inputs/MutationUpdateCurrentUserInput";
import { User } from "~/src/graphql/types/User/User";
import { TalawaGraphQLError } from "~/src/utilities/TalawaGraphQLError";

const mutationUpdateCurrentUserArgumentsSchema = z.object({
	input: mutationUpdateCurrentUserInputSchema,
});

builder.mutationField("updateCurrentUser", (t) =>
	t.field({
		args: {
			input: t.arg({
				description: "",
				required: true,
				type: MutationUpdateCurrentUserInput,
			}),
		},
		description:
			"Entrypoint mutation field to update the user record associated to the client performing the action.",
		resolve: async (_parent, args, ctx) => {
			if (!ctx.currentClient.isAuthenticated) {
				throw new TalawaGraphQLError({
					extensions: {
						code: "unauthenticated",
					},
					message: "Only authenticated users can perform this action.",
				});
			}

			const {
				success,
				data: parsedArgs,
				error,
			} = mutationUpdateCurrentUserArgumentsSchema.safeParse(args);

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

			const [updatedCurrentUser] = await ctx.drizzleClient
				.update(usersTable)
				.set({
					...parsedArgs.input,
					passwordHash:
						parsedArgs.input.password !== undefined
							? await hash(parsedArgs.input.password)
							: undefined,
				})
				.where(eq(usersTable.id, ctx.currentClient.user.id))
				.returning();

			// Updated user's record not existing in the database means that the client is using an access token which hasn't expired yet.
			if (updatedCurrentUser === undefined) {
				throw new TalawaGraphQLError({
					extensions: {
						code: "unauthenticated",
					},
					message: "Only authenticated users can perform this action.",
				});
			}

			return updatedCurrentUser;
		},
		type: User,
	}),
);
