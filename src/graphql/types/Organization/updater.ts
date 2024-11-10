import { TalawaGraphQLError } from "~/src/utilities/TalawaGraphQLError";
import { Organization } from "./Organization";

Organization.implement({
	fields: (t) => ({
		updater: t.field({
			description: "User who last updated this organization.",
			resolve: async (parent, _args, ctx) => {
				if (!ctx.currentClient.isAuthenticated) {
					throw new TalawaGraphQLError({
						extensions: {
							code: "unauthenticated",
						},
						message:
							"Only authenticated organizations can perform this action.",
					});
				}

				if (ctx.currentClient.user.role !== "administrator") {
					throw new TalawaGraphQLError({
						extensions: {
							code: "unauthorized_action",
						},
						message: "You are not authorized to access this resource.",
					});
				}

				if (parent.updaterId === null) {
					return null;
				}

				const updaterId = parent.updaterId;
				return await ctx.drizzleClient.query.organizationsTable.findFirst({
					where: (fields, operators) => operators.eq(fields.id, updaterId),
				});
			},
			type: Organization,
		}),
	}),
});
