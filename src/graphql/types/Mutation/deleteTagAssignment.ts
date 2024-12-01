import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { tagAssignmentsTable } from "~/src/drizzle/tables/tagAssignments";
import { builder } from "~/src/graphql/builder";
import {
	MutationDeleteTagAssignmentInput,
	mutationDeleteTagAssignmentInputSchema,
} from "~/src/graphql/inputs/MutationDeleteTagAssignmentInput";
import { Tag } from "~/src/graphql/types/Tag/Tag";
import { TalawaGraphQLError } from "~/src/utilities/talawaGraphQLError";

const mutationDeleteTagAssignmentArgumentsSchema = z.object({
	input: mutationDeleteTagAssignmentInputSchema,
});

builder.mutationField("deleteTagAssignment", (t) =>
	t.field({
		args: {
			input: t.arg({
				description: "",
				required: true,
				type: MutationDeleteTagAssignmentInput,
			}),
		},
		description: "Mutation field to delete a tag assignment.",
		resolve: async (_parent, args, ctx) => {
			if (!ctx.currentClient.isAuthenticated) {
				throw new TalawaGraphQLError({
					extensions: {
						code: "unauthenticated",
					},
					message: "Only authenticated users can perform this action.",
				});
			}

			const {
				data: parsedArgs,
				error,
				success,
			} = mutationDeleteTagAssignmentArgumentsSchema.safeParse(args);

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

			const currentUser = await ctx.drizzleClient.query.usersTable.findFirst({
				columns: {
					role: true,
				},
				where: (fields, operators) => operators.eq(fields.id, currentUserId),
			});

			if (currentUser === undefined) {
				throw new TalawaGraphQLError({
					extensions: {
						code: "unauthenticated",
					},
					message: "Only authenticated users can perform this action.",
				});
			}

			const [existingAssignee, existingTag, existingTagAssignment] =
				await Promise.all([
					ctx.drizzleClient.query.usersTable.findFirst({
						columns: {},
						where: (fields, operators) =>
							operators.eq(fields.id, parsedArgs.input.assigneeId),
					}),
					ctx.drizzleClient.query.tagsTable.findFirst({
						with: {
							organization: {
								columns: {},
								with: {
									organizationMembershipsWhereOrganization: {
										where: (fields, operators) =>
											operators.eq(fields.memberId, currentUserId),
									},
								},
							},
						},
						where: (fields, operators) =>
							operators.eq(fields.id, parsedArgs.input.tagId),
					}),
					ctx.drizzleClient.query.tagAssignmentsTable.findFirst({
						columns: {},
						where: (fields, operators) =>
							operators.and(
								operators.eq(fields.assigneeId, parsedArgs.input.assigneeId),
								operators.eq(fields.tagId, parsedArgs.input.tagId),
							),
					}),
				]);

			if (existingAssignee === undefined && existingTag === undefined) {
				throw new TalawaGraphQLError({
					extensions: {
						code: "arguments_associated_resources_not_found",
						issues: [
							{
								argumentPath: ["input", "assigneeId"],
							},
							{
								argumentPath: ["input", "tagId"],
							},
						],
					},
					message: "No associated resources found for the provided arguments.",
				});
			}

			if (existingAssignee === undefined) {
				throw new TalawaGraphQLError({
					extensions: {
						code: "arguments_associated_resources_not_found",
						issues: [
							{
								argumentPath: ["input", "assigneeId"],
							},
						],
					},
					message: "No associated resources found for the provided arguments.",
				});
			}

			if (existingTag === undefined) {
				throw new TalawaGraphQLError({
					extensions: {
						code: "arguments_associated_resources_not_found",
						issues: [
							{
								argumentPath: ["input", "tagId"],
							},
						],
					},
					message: "No associated resources found for the provided arguments.",
				});
			}

			const currentUserOrganizationMembership =
				existingTag.organization.organizationMembershipsWhereOrganization[0];

			if (existingTagAssignment === undefined) {
				throw new TalawaGraphQLError({
					extensions: {
						code: "arguments_associated_resources_not_found",
						issues: [
							{
								argumentPath: ["input", "assigneeId"],
							},
							{
								argumentPath: ["input", "tagId"],
							},
						],
					},
					message: "No associated resources found for the provided arguments.",
				});
			}

			if (
				currentUser.role !== "administrator" &&
				(currentUserOrganizationMembership === undefined ||
					currentUserOrganizationMembership.role !== "administrator")
			) {
				throw new TalawaGraphQLError({
					extensions: {
						code: "unauthorized_action_on_arguments_associated_resources",
						issues: [
							{
								argumentPath: ["input", "assigneeId"],
							},
							{
								argumentPath: ["input", "tagId"],
							},
						],
					},
					message:
						"You are not authorized to perform this action on the resources associated to the provided arguments.",
				});
			}

			const [deletedTagAssignment] = await ctx.drizzleClient
				.delete(tagAssignmentsTable)
				.where(
					and(
						eq(tagAssignmentsTable.assigneeId, parsedArgs.input.assigneeId),
						eq(tagAssignmentsTable.tagId, parsedArgs.input.tagId),
					),
				)
				.returning();

			// Deleted tag assignment not being returned means that either it was deleted or its `id` column was changed by external entities before this delete operation could take place.
			if (deletedTagAssignment === undefined) {
				throw new TalawaGraphQLError({
					extensions: {
						code: "unexpected",
					},
					message: "Something went wrong. Please try again.",
				});
			}

			return existingTag;
		},
		type: Tag,
	}),
);
