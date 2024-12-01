import { builder } from "~/src/graphql/builder";
import { User } from "~/src/graphql/types/User/User";
import { TalawaGraphQLError } from "~/src/utilities/talawaGraphQLError";

builder.queryField("currentUser", (t) =>
	t.field({
		description: "Query field to read a user.",
		resolve: async (_parent, _args, ctx) => {
			if (!ctx.currentClient.isAuthenticated) {
				throw new TalawaGraphQLError({
					extensions: {
						code: "unauthenticated",
					},
					message: "Only authenticated organizations can perform this action.",
				});
			}

			const currentUserId = ctx.currentClient.user.id;
			const currentUser = await ctx.drizzleClient.query.usersTable.findFirst({
				where: (fields, operators) => operators.eq(fields.id, currentUserId),
			});

			// Current user not existing in the database means that either it was deleted or its `id` column was changed by external entities which correspondingly means that the current client is using an invalid authentication token which hasn't expired yet.
			if (currentUser === undefined) {
				throw new TalawaGraphQLError({
					extensions: {
						code: "unauthenticated",
					},
					message: "Only authenticated users can perform this action.",
				});
			}

			return currentUser;
		},
		type: User,
	}),
);
