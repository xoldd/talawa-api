import { type SQL, and, asc, desc, eq, exists, gt, lt, or } from "drizzle-orm";
import { z } from "zod";
import { organizationMembershipsTable } from "~/src/drizzle/schema";
import { organizationMembershipsTableSelectSchema } from "~/src/drizzle/tables/organizationMemberships";
import {
	defaultGraphQLConnectionArgumentsSchema,
	transformDefaultGraphQLConnectionArguments,
	transformToDefaultGraphQLConnection,
} from "~/src/graphql/reusables/defaultGraphQLConnection";
import { User } from "~/src/graphql/types/User/User";
import { TalawaGraphQLError } from "~/src/utilities/TalawaGraphQLError";
import { Organization } from "./Organization";

const organizationMembersArgumentsSchema =
	defaultGraphQLConnectionArgumentsSchema
		.transform(transformDefaultGraphQLConnectionArguments)
		.transform((arg, ctx) => {
			let cursor: z.infer<typeof cursorSchema> | undefined = undefined;

			try {
				if (arg.cursor !== undefined) {
					cursor = cursorSchema.parse(
						JSON.parse(Buffer.from(arg.cursor, "base64url").toString("utf-8")),
					);
				}
			} catch (error) {
				console.log(error);
				ctx.addIssue({
					code: "custom",
					message: "Not a valid cursor.",
					path: [arg.isInversed ? "before" : "after"],
				});
			}

			return {
				cursor,
				isInversed: arg.isInversed,
				limit: arg.limit,
			};
		});

const cursorSchema = organizationMembershipsTableSelectSchema
	.pick({
		memberId: true,
	})
	.extend({
		createdAt: z.string().datetime(),
	})
	.transform((arg) => ({
		createdAt: new Date(arg.createdAt),
		memberId: arg.memberId,
	}));

Organization.implement({
	fields: (t) => ({
		members: t.connection(
			{
				description:
					"Organization field to read the members of the organization by traversing across a graphql connection.",
				resolve: async (parent, args, ctx) => {
					if (!ctx.currentClient.isAuthenticated) {
						throw new TalawaGraphQLError({
							extensions: {
								code: "forbidden_action",
							},
							message: "Only unauthenticated users can perform this action.",
						});
					}

					const {
						data: parsedArgs,
						error,
						success,
					} = organizationMembersArgumentsSchema.safeParse(args);

					if (!success) {
						throw new TalawaGraphQLError({
							extensions: {
								code: "invalid_arguments",
								issues: error.issues.map((issue) => ({
									argumentPath: issue.path,
									message: issue.message,
								})),
							},
							message: "Invalid arguments provided.",
						});
					}

					const currentUserId = ctx.currentClient.user.id;
					const currentUser =
						await ctx.drizzleClient.query.usersTable.findFirst({
							columns: {
								role: true,
							},
							where: (fields, operators) =>
								operators.eq(fields.id, currentUserId),
							with: {
								organizationMembershipsWhereMember: {
									columns: {},
									where: (fields, operators) =>
										operators.and(
											operators.eq(fields.organizationId, parent.id),
											operators.eq(fields.isApproved, true),
										),
								},
							},
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

					if (currentUser.role !== "administrator") {
						const currentUserOrganizationMembership =
							currentUser.organizationMembershipsWhereMember[0];

						if (currentUserOrganizationMembership === undefined) {
							throw new TalawaGraphQLError({
								extensions: {
									code: "unauthorized_action",
								},
								message: "You are not authorized to perform this action.",
							});
						}
					}

					const { cursor, isInversed, limit } = parsedArgs;

					const orderBy = isInversed
						? [
								asc(organizationMembershipsTable.createdAt),
								asc(organizationMembershipsTable.memberId),
							]
						: [
								desc(organizationMembershipsTable.createdAt),
								desc(organizationMembershipsTable.memberId),
							];

					let where: SQL | undefined;
					if (isInversed) {
						if (cursor !== undefined) {
							where = and(
								exists(
									ctx.drizzleClient
										.select()
										.from(organizationMembershipsTable)
										.where(
											and(
												eq(
													organizationMembershipsTable.memberId,
													cursor.memberId,
												),
												eq(
													organizationMembershipsTable.organizationId,
													parent.id,
												),
											),
										),
								),
								eq(organizationMembershipsTable.organizationId, parent.id),
								eq(organizationMembershipsTable.isApproved, true),
								or(
									and(
										eq(
											organizationMembershipsTable.createdAt,
											cursor.createdAt,
										),
										gt(organizationMembershipsTable.memberId, cursor.memberId),
									),
									gt(organizationMembershipsTable.createdAt, cursor.createdAt),
								),
							);
						} else {
							where = and(
								eq(organizationMembershipsTable.organizationId, parent.id),
								eq(organizationMembershipsTable.isApproved, true),
							);
						}
					} else {
						if (cursor !== undefined) {
							where = and(
								exists(
									ctx.drizzleClient
										.select()
										.from(organizationMembershipsTable)
										.where(
											and(
												eq(
													organizationMembershipsTable.memberId,
													cursor.memberId,
												),
												eq(
													organizationMembershipsTable.organizationId,
													parent.id,
												),
											),
										),
								),
								eq(organizationMembershipsTable.organizationId, parent.id),
								eq(organizationMembershipsTable.isApproved, true),
								or(
									and(
										eq(
											organizationMembershipsTable.createdAt,
											cursor.createdAt,
										),
										lt(organizationMembershipsTable.memberId, cursor.memberId),
									),
									lt(organizationMembershipsTable.createdAt, cursor.createdAt),
								),
							);
						} else {
							where = and(
								eq(organizationMembershipsTable.organizationId, parent.id),
								eq(organizationMembershipsTable.isApproved, true),
							);
						}
					}

					const organizationMemberships =
						await ctx.drizzleClient.query.organizationMembershipsTable.findMany(
							{
								columns: {
									createdAt: true,
									memberId: true,
								},
								limit,
								orderBy,
								with: {
									member: true,
								},
								where,
							},
						);

					if (cursor !== undefined && organizationMemberships.length === 0) {
						throw new TalawaGraphQLError({
							extensions: {
								code: "arguments_associated_resources_not_found",
								issues: [
									{
										argumentPath: [isInversed ? "before" : "after"],
									},
								],
							},
							message:
								"No associated resources found for the provided arguments.",
						});
					}

					return transformToDefaultGraphQLConnection({
						createCursor: (organizationMembership) =>
							Buffer.from(
								JSON.stringify({
									createdAt: organizationMembership.createdAt,
									memberId: organizationMembership.memberId,
									organizationId: parent.id,
								}),
							).toString("base64url"),
						createNode: (organizationMembership) =>
							organizationMembership.member,
						parsedArgs,
						rawNodes: organizationMemberships,
					});
				},
				type: User,
			},
			{
				description: "",
			},
			{
				description: "",
			},
		),
	}),
});
