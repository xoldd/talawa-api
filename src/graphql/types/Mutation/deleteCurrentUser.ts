import { eq } from "drizzle-orm";
import { usersTable } from "~/src/drizzle/tables/users";
import { builder } from "~/src/graphql/builder";
import { User } from "~/src/graphql/types/User/User";
import { TalawaGraphQLError } from "~/src/utilities/TalawaGraphQLError";

builder.mutationField("deleteCurrentUser", (t) =>
	t.field({
		description:
			"Entrypoint mutation field to delete the user record associated to the client performing the action.",
		resolve: async (_parent, _args, ctx) => {
			if (!ctx.currentClient.isAuthenticated) {
				throw ctx.currentClient.error;
			}

			const [deletedCurrentUser] = await ctx.drizzleClient
				.delete(usersTable)
				.where(eq(usersTable.id, ctx.currentClient.user.id))
				.returning();

			// Deleted current user's record not existing in the database means that the client is using an access token which hasn't expired yet.
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
