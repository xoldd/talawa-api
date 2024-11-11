import { builder } from "~/src/graphql/builder";
import { TalawaGraphQLError } from "~/src/utilities/TalawaGraphQLError";

builder.queryField("renewAuthenticationToken", (t) =>
	t.string({
		description:
			"Query field to renew the authentication token of an authenticated client for signing in to the talawa application.",
		resolve: async (_parent, _args, ctx) => {
			if (!ctx.currentClient.isAuthenticated) {
				throw new TalawaGraphQLError({
					extensions: {
						code: "forbidden_action",
					},
					message: "Only unauthenticated users can perform this action.",
				});
			}

			const currentClientUserId = ctx.currentClient.user.id;
			const currentUser = await ctx.drizzleClient.query.usersTable.findFirst({
				where: (fields, operators) =>
					operators.eq(fields.id, currentClientUserId),
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

			return ctx.jwt.sign({
				user: {
					id: currentUser.id,
				},
			});
		},
	}),
);
