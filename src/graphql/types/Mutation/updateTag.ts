import { createContext } from "node:vm";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { tagsTable } from "~/src/drizzle/tables/tags";
import { builder } from "~/src/graphql/builder";
import {
	MutationUpdateTagInput,
	mutationUpdateTagInputSchema,
} from "~/src/graphql/inputs/MutationUpdateTagInput";
import { Tag } from "~/src/graphql/types/Tag/Tag";
import { isNotNullish } from "~/src/utilities/isNotNullish";
import { TalawaGraphQLError } from "~/src/utilities/talawaGraphQLError";

const mutationUpdateTagArgumentsSchema = z.object({
	input: mutationUpdateTagInputSchema,
});

builder.mutationField("updateTag", (t) =>
	t.field({
		args: {
			input: t.arg({
				description: "",
				required: true,
				type: MutationUpdateTagInput,
			}),
		},
		description: "Mutation field to update a tag.",
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
			} = mutationUpdateTagArgumentsSchema.safeParse(args);

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

			const [currentUser, existingTag] = await Promise.all([
				ctx.drizzleClient.query.usersTable.findFirst({
					columns: {
						role: true,
					},
					where: (fields, operators) => operators.eq(fields.id, currentUserId),
				}),
				ctx.drizzleClient.query.tagsTable.findFirst({
					columns: {
						name: true,
						organizationId: true,
					},
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

			if (existingTag === undefined) {
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

			if (isNotNullish(parsedArgs.input.folderId)) {
				const folderId = parsedArgs.input.folderId;

				const existingTagFolder =
					ctx.drizzleClient.query.tagFoldersTable.findFirst({
						columns: {},
						where: (fields, operators) =>
							operators.and(operators.eq(fields.id, folderId)),
					});

				if (existingTagFolder !== undefined) {
					throw new TalawaGraphQLError({
						extensions: {
							code: "arguments_associated_resources_not_found",
							issues: [
								{
									argumentPath: ["input", "folderId"],
								},
							],
						},
						message:
							"No associated resources found for the provided arguments.",
					});
				}
			}

			if (isNotNullish(parsedArgs.input.name)) {
				const name = parsedArgs.input.name;

				const existingTagWithName = ctx.drizzleClient.query.tagsTable.findFirst(
					{
						columns: {},
						where: (fields, operators) =>
							operators.and(
								operators.eq(fields.name, name),
								operators.eq(fields.organizationId, existingTag.organizationId),
							),
					},
				);

				if (existingTagWithName !== undefined) {
					throw new TalawaGraphQLError({
						extensions: {
							code: "forbidden_action_on_arguments_associated_resources",
							issues: [
								{
									argumentPath: ["input", "name"],
									message: "This name is not available.",
								},
							],
						},
						message:
							"This action is forbidden on the resources associated to the provided arguments.",
					});
				}
			}

			if (currentUser.role !== "administrator") {
				const currentUserMembership =
					existingTag.organization.organizationMembershipsWhereOrganization[0];

				if (
					currentUserMembership === undefined ||
					currentUserMembership.role !== "administrator"
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
			}

			const [updatedTag] = await ctx.drizzleClient
				.update(tagsTable)
				.set({
					folderId: parsedArgs.input.folderId,
					name: parsedArgs.input.name,
					updaterId: currentUserId,
				})
				.where(eq(tagsTable.id, parsedArgs.input.id))
				.returning();

			// Inserted tag not being returned is an external defect unrelated to this code. It is very unlikely for this error to occur.
			if (updatedTag === undefined) {
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

			return updatedTag;
		},
		type: Tag,
	}),
);
