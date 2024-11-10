import { eq } from "drizzle-orm";
import { z } from "zod";
import { organizationsTable } from "~/src/drizzle/schema";
import { builder } from "~/src/graphql/builder";
import {
	MutationUpdateOrganizationInput,
	mutationUpdateOrganizationInputSchema,
} from "~/src/graphql/inputs/MutationUpdateOrganizationInput";
import { Organization } from "~/src/graphql/types/Organization/Organization";
import { TalawaGraphQLError } from "~/src/utilities/TalawaGraphQLError";

const mutationUpdateOrganizationArgumentsSchema = z.object({
	input: mutationUpdateOrganizationInputSchema,
});

builder.mutationField("updateOrganization", (t) =>
	t.field({
		args: {
			input: t.arg({
				description: "",
				required: true,
				type: MutationUpdateOrganizationInput,
			}),
		},
		description: "Entrypoint mutation field to update a organization.",
		resolve: async (_parent, args, ctx) => {
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

			if (currentUser.role !== "administrator") {
				throw new TalawaGraphQLError({
					extensions: {
						code: "unauthorized_action",
					},
					message: "You are not authorized to perform this action.",
				});
			}

			const {
				success,
				data: parsedArgs,
				error,
			} = mutationUpdateOrganizationArgumentsSchema.safeParse(args);

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

			const { id, ...input } = parsedArgs.input;

			const existingOrganization =
				await ctx.drizzleClient.query.organizationsTable.findFirst({
					with: {
						organizationMembershipsWhereOrganization: {
							where: (fields, operators) =>
								operators.eq(fields.role, "administrator"),
						},
					},
					where: (fields, operators) => operators.eq(fields.id, id),
				});

			if (existingOrganization === undefined) {
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

			const [updatedOrganization] = await ctx.drizzleClient
				.update(organizationsTable)
				.set({
					...input,
					updaterId: currentUserId,
				})
				.where(eq(organizationsTable.id, id))
				.returning();

			// Updated organization not being returned means that either the record was deleted or its `id` column was changed before this delete operation by an external entity.
			if (updatedOrganization === undefined) {
				throw new TalawaGraphQLError({
					extensions: {
						code: "unexpected",
					},
					message: "Something went wrong. Please try again later.",
				});
			}

			return updatedOrganization;
		},
		type: Organization,
	}),
);
