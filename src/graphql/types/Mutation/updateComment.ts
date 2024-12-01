import { eq } from "drizzle-orm";
import { z } from "zod";
import { commentsTable } from "~/src/drizzle/tables/comments";
import { builder } from "~/src/graphql/builder";
import {
	MutationUpdateCommentInput,
	mutationUpdateCommentInputSchema,
} from "~/src/graphql/inputs/MutationUpdateCommentInput";
import { Comment } from "~/src/graphql/types/Comment/Comment";
import { getKeyPathsWithNonUndefinedValues } from "~/src/utilities/getKeyPathsWithNonUndefinedValues";
import { TalawaGraphQLError } from "~/src/utilities/talawaGraphQLError";

const mutationUpdateCommentArgumentsSchema = z.object({
	input: mutationUpdateCommentInputSchema,
});

builder.mutationField("updateComment", (t) =>
	t.field({
		args: {
			input: t.arg({
				description: "",
				required: true,
				type: MutationUpdateCommentInput,
			}),
		},
		description: "Mutation field to update a comment.",
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
			} = mutationUpdateCommentArgumentsSchema.safeParse(args);

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

			const [currentUser, existingComment] = await Promise.all([
				ctx.drizzleClient.query.usersTable.findFirst({
					columns: {
						role: true,
					},
					where: (fields, operators) => operators.eq(fields.id, currentUserId),
				}),
				ctx.drizzleClient.query.commentsTable.findFirst({
					columns: {
						pinnedAt: true,
						commenterId: true,
					},
					with: {
						post: {
							columns: {},
							with: {
								organization: {
									columns: {},
									with: {
										organizationMembershipsWhereOrganization: {
											columns: {
												role: true,
											},
											where: (fields, operators) =>
												operators.eq(fields.memberId, currentUserId),
										},
									},
								},
							},
						},
					},
					where: (fields, operators) =>
						operators.eq(fields.id, parsedArgs.input.id),
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

			if (existingComment === undefined) {
				throw new TalawaGraphQLError({
					extensions: {
						code: "arguments_associated_resources_not_found",
						issues: [
							{
								argumentPath: ["input", "id"],
							},
						],
					},
					message: "No associated resources found for the provided arguments.",
				});
			}

			if (currentUser.role === "administrator") {
				if (
					parsedArgs.input.body !== undefined &&
					currentUserId !== existingComment.commenterId
				) {
					throw new TalawaGraphQLError({
						extensions: {
							code: "unauthorized_action_on_arguments_associated_resources",
							issues: [
								{
									argumentPath: ["input", "id"],
								},
							],
						},
						message:
							"You are not authorized to perform this action on the resources associated to the provided arguments.",
					});
				}
			} else {
				const currentUserOrganizationMembership =
					existingComment.post.organization
						.organizationMembershipsWhereOrganization[0];

				if (currentUserOrganizationMembership === undefined) {
					throw new TalawaGraphQLError({
						extensions: {
							code: "unauthorized_action_on_arguments_associated_resources",
							issues: [
								{
									argumentPath: ["input", "id"],
								},
							],
						},
						message:
							"You are not authorized to perform this action on the resources associated to the provided arguments.",
					});
				}

				if (currentUserOrganizationMembership.role === "administrator") {
					if (currentUserId !== existingComment.commenterId) {
						const unauthorizedArgumentPaths = getKeyPathsWithNonUndefinedValues(
							{
								keyPaths: [["input", "body"]],
								object: parsedArgs,
							},
						);

						if (unauthorizedArgumentPaths.length !== 0) {
							throw new TalawaGraphQLError({
								extensions: {
									code: "unauthorized_arguments",
									issues: unauthorizedArgumentPaths.map((argumentPath) => ({
										argumentPath,
									})),
								},
								message:
									"You are not authorized to perform this action with the provided arguments.",
							});
						}
					}
				} else {
					const unauthorizedArgumentPaths = getKeyPathsWithNonUndefinedValues({
						keyPaths: [["input", "isPinned"]],
						object: parsedArgs,
					});

					if (unauthorizedArgumentPaths.length !== 0) {
						throw new TalawaGraphQLError({
							extensions: {
								code: "unauthorized_arguments",
								issues: unauthorizedArgumentPaths.map((argumentPath) => ({
									argumentPath,
								})),
							},
							message:
								"You are not authorized to perform this action with the provided arguments.",
						});
					}

					if (currentUserId !== existingComment.commenterId) {
						throw new TalawaGraphQLError({
							extensions: {
								code: "unauthorized_action_on_arguments_associated_resources",
								issues: [
									{
										argumentPath: ["input", "id"],
									},
								],
							},
							message:
								"You are not authorized to perform this action on the resources associated to the provided arguments.",
						});
					}
				}
			}

			const [updatedComment] = await ctx.drizzleClient
				.update(commentsTable)
				.set({
					body: parsedArgs.input.body,
					isPinned:
						parsedArgs.input.isPinned === undefined
							? undefined
							: parsedArgs.input.isPinned,
					pinnedAt:
						parsedArgs.input.isPinned === undefined
							? undefined
							: parsedArgs.input.isPinned
								? existingComment.pinnedAt === null
									? new Date()
									: undefined
								: null,
					updaterId: currentUserId,
				})
				.where(eq(commentsTable.id, parsedArgs.input.id))
				.returning();

			// Updated comment not being returned means that either it was already updated or its `id` column was changed by external entities before this update operation could take place.
			if (updatedComment === undefined) {
				throw new TalawaGraphQLError({
					extensions: {
						code: "unexpected",
					},
					message: "Something went wrong. Please try again.",
				});
			}

			return updatedComment;
		},
		type: Comment,
	}),
);
