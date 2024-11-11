import { builder } from "~/src/graphql/builder";
import { User } from "~/src/graphql/types/User/User";
import { TalawaGraphQLError } from "~/src/utilities/TalawaGraphQLError";

builder.queryField("currentUser", (t) =>
	t.field({
		description: "Query field to read data of a user.",
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
				where: (fields, operators) =>
					operators.eq(fields.emailAddress, currentUserId),
			});

			// User's record not existing in the database means that the client is using an authentication token which hasn't expired yet.
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
