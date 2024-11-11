import { eq } from "drizzle-orm";
import { usersTable } from "~/src/drizzle/tables/users";
import { builder } from "~/src/graphql/builder";
import { User } from "~/src/graphql/types/User/User";
import { TalawaGraphQLError } from "~/src/utilities/TalawaGraphQLError";

builder.mutationField("deleteCurrentUser", (t) =>
	t.field({
		description: "Mutation field to delete the current user.",
		resolve: async (_parent, _args, ctx) => {
			if (!ctx.currentClient.isAuthenticated) {
				throw new TalawaGraphQLError({
					extensions: {
						code: "unauthenticated",
					},
					message: "Only authenticated users can perform this action.",
				});
			}

			const [deletedCurrentUser] = await ctx.drizzleClient
				.delete(usersTable)
				.where(eq(usersTable.id, ctx.currentClient.user.id))
				.returning();

			// Deleted current user not existing in the database means that the client is using an authentication token which hasn't expired yet.
			if (deletedCurrentUser === undefined) {
				throw new TalawaGraphQLError({
					extensions: {
						code: "unauthenticated",
					},
					message: "Only authenticated users can perform this action.",
				});
			}

			return deletedCurrentUser;
		},
		type: User,
	}),
);
