import { TalawaGraphQLError } from "~/src/utilities/TalawaGraphQLError";
import { User } from "./User";

User.implement({
	fields: (t) => ({
		creator: t.field({
			description: "User who first created this user.",
			resolve: async (parent, _args, ctx) => {
				if (!ctx.currentClient.isAuthenticated) {
					throw ctx.currentClient.error;
				}

				if (ctx.currentClient.user.role !== "administrator") {
					throw new TalawaGraphQLError({
						extensions: {
							code: "unauthorized_action",
						},
						message: "You are not authorized to access this resource.",
					});
				}

				if (parent.creatorId === null) {
					return null;
				}

				const creatorId = parent.creatorId;
				return await ctx.drizzleClient.query.usersTable.findFirst({
					where: (fields, operators) => operators.eq(fields.id, creatorId),
				});
			},
			type: User,
		}),
	}),
});
