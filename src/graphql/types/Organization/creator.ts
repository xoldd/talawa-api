import { User } from "~/src/graphql/types/User/User";
import { TalawaGraphQLError } from "~/src/utilities/talawaGraphQLError";
import { Organization } from "./Organization";

Organization.implement({
	fields: (t) => ({
		creator: t.field({
			description: "User who first created this organization.",
			resolve: async (parent, _args, ctx) => {
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
					where: (fields, operators) => operators.eq(fields.id, currentUserId),
				});

				if (currentUser === undefined) {
					throw new TalawaGraphQLError({
						extensions: {
							code: "forbidden_action",
						},
						message: "Only authenticated users can perform this action.",
					});
				}

				if (currentUser.role !== "administrator") {
					throw new TalawaGraphQLError({
						extensions: {
							code: "unauthorized_action",
						},
						message: "You are not authorized to access this resource.",
					});
				}

				if (parent.creatorId === currentUserId) {
					return currentUser;
				}

				const creatorUser = await ctx.drizzleClient.query.usersTable.findFirst({
					where: (fields, operators) =>
						operators.eq(fields.id, parent.creatorId),
				});

				// Creator user id existing but the associated user not existing is a business logic error and means that the corresponding data in the database is in a corrupted state. It must be investigated and fixed as soon as possible to prevent additional data corruption.
				if (creatorUser === undefined) {
					ctx.log.error(
						"Postgres select operation returned an empty array for a user's creator user id that isn't null.",
					);
					throw new TalawaGraphQLError({
						extensions: {
							code: "unexpected",
						},
						message: "Something went wrong. Please try again later.",
					});
				}

				return creatorUser;
			},
			type: User,
		}),
	}),
});
