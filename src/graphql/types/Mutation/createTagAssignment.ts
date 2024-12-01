import { z } from "zod";
import { tagAssignmentsTable } from "~/src/drizzle/tables/tagAssignments";
import { builder } from "~/src/graphql/builder";
import {
	MutationCreateTagAssignmentInput,
	mutationCreateTagAssignmentInputSchema,
} from "~/src/graphql/inputs/MutationCreateTagAssignmentInput";
import { Tag } from "~/src/graphql/types/Tag/Tag";
import { TalawaGraphQLError } from "~/src/utilities/talawaGraphQLError";

const mutationCreateTagAssignmentArgumentsSchema = z.object({
	input: mutationCreateTagAssignmentInputSchema,
});

builder.mutationField("createTagAssignment", (t) =>
	t.field({
		args: {
			input: t.arg({
				description: "",
				required: true,
				type: MutationCreateTagAssignmentInput,
			}),
		},
		description: "Mutation field to create a tag assignment.",
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
			} = mutationCreateTagAssignmentArgumentsSchema.safeParse(args);

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

			const [
				currentUser,
				existingAssignee,
				existingTag,
				existingTagAssignment,
			] = await Promise.all([
				ctx.drizzleClient.query.usersTable.findFirst({
					columns: {
						role: true,
					},
					where: (fields, operators) => operators.eq(fields.id, currentUserId),
				}),
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
										operators.eq(fields.memberId, parsedArgs.input.assigneeId),
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

			if (currentUser === undefined) {
				throw new TalawaGraphQLError({
					extensions: {
						code: "unauthenticated",
					},
					message: "Only authenticated users can perform this action.",
				});
			}

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

			if (existingTagAssignment !== undefined) {
				throw new TalawaGraphQLError({
					extensions: {
						code: "forbidden_action_on_arguments_associated_resources",
						issues: [
							{
								argumentPath: ["input", "assigneeId"],
								message:
									"This user is already assigned with the associated tag.",
							},
							{
								argumentPath: ["input", "tagId"],
								message:
									"This tag is already assigned to the associated assignee.",
							},
						],
					},
					message:
						"This action is forbidden on the resources associated to the provided arguments.",
				});
			}

			if (existingTag.isFolder === true) {
				throw new TalawaGraphQLError({
					extensions: {
						code: "forbidden_action_on_arguments_associated_resources",
						issues: [
							{
								argumentPath: ["input", "tagId"],
								message: "This tag cannot be a tag folder.",
							},
						],
					},
					message:
						"This action is forbidden on the resources associated to the provided arguments.",
				});
			}

			const currentUserOrganizationMembership =
				existingTag.organization.organizationMembershipsWhereOrganization[0];

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

			const [createdTagAssignment] = await ctx.drizzleClient
				.insert(tagAssignmentsTable)
				.values({
					assigneeId: parsedArgs.input.assigneeId,
					creatorId: currentUserId,
					tagId: parsedArgs.input.tagId,
				})
				.returning();

			// Created tag assignment not being returned is an external defect unrelated to this code. It is very unlikely for this error to occur.
			if (createdTagAssignment === undefined) {
				ctx.log.error(
					"Postgres insert operation unexpectedly returned an empty array instead of throwing an error.",
				);
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
