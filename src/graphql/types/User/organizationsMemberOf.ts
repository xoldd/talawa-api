import { Organization } from "~/src/graphql/types/Organization/Organization";
import { User } from "./User";

User.implement({
	fields: (t) => ({
		organizationsMemberOf: t.field({
			description:
				"User field to read the organizations the user is a member of.",
			resolve: async (parent, _args, ctx) => {
				const organizationMemberships =
					await ctx.drizzleClient.query.organizationMembershipsTable.findMany({
						columns: {},
						with: {
							organization: true,
						},
						where: (fields, operators) =>
							operators.and(
								operators.eq(fields.memberId, parent.id),
								operators.eq(fields.isApproved, true),
							),
					});

				if (organizationMemberships.length === 0) {
					return null;
				}

				return organizationMemberships.map(
					(membership) => membership.organization,
				);
			},
			type: t.listRef(Organization),
		}),
	}),
});
