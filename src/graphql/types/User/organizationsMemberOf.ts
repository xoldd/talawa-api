import { Organization } from "~/src/graphql/types/Organization/Organization";
import { TalawaGraphQLError } from "~/src/utilities/TalawaGraphQLError";
import { User } from "./User";

User.implement({
	fields: (t) => ({
		organizationsMemberOf: t.field({
			description:
				"User field to read the organizations the user is a member of.",
			resolve: async (parent, _args, ctx) => {
				if (!ctx.currentClient.isAuthenticated) {
					throw new TalawaGraphQLError({
						extensions: {
							code: "forbidden_action",
						},
						message: "Only unauthenticated users can perform this action.",
					});
				}

				const currentUserId = ctx.currentClient.user.id;
				const currentUser = await ctx.drizzleClient.query.usersTable.findFirst({
					columns: {
						role: true,
					},
					where: (fields, operators) => operators.eq(fields.id, currentUserId),
					with: {
						organizationMembershipsWhereMember: {
							columns: {},
							orderBy: (fields, operators) => [
								operators.desc(fields.createdAt),
								operators.desc(fields.organizationId),
							],
							where: (fields, operators) =>
								operators.eq(fields.isApproved, true),
							with: {
								organization: true,
							},
						},
					},
				});

				// Current client's user not existing in the database means that the client is using an authentication token which hasn't expired yet.
				if (currentUser === undefined) {
					throw new TalawaGraphQLError({
						extensions: {
							code: "unauthenticated",
						},
						message: "Only authenticated users can perform this action.",
					});
				}

				if (currentUser.role !== "administrator") {
					if (currentUserId !== parent.id) {
						throw new TalawaGraphQLError({
							extensions: {
								code: "unauthorized_action",
							},
							message: "You are not authorized to perform this action.",
						});
					}

					return currentUser.organizationMembershipsWhereMember.map(
						(membership) => membership.organization,
					);
				}

				if (currentUserId === parent.id) {
					return currentUser.organizationMembershipsWhereMember.map(
						(membership) => membership.organization,
					);
				}

				return (
					await ctx.drizzleClient.query.organizationMembershipsTable.findMany({
						columns: {},
						orderBy: (fields, operators) => [
							operators.desc(fields.createdAt),
							operators.desc(fields.organizationId),
						],
						where: (fields, operators) =>
							operators.and(
								operators.eq(fields.memberId, parent.id),
								operators.eq(fields.isApproved, true),
							),
						with: {
							organization: true,
						},
					})
				).map((membership) => membership.organization);
			},
			type: t.listRef(Organization),
		}),
	}),
});
