import { z } from "zod";
import { familiesTable } from "~/src/drizzle/tables/families";
import { builder } from "~/src/graphql/builder";
import {
	MutationCreateFamilyInput,
	mutationCreateFamilyInputSchema,
} from "~/src/graphql/inputs/MutationCreateFamilyInput";
import { Family } from "~/src/graphql/types/Family/Family";
import { TalawaGraphQLError } from "~/src/utilities/talawaGraphQLError";

const mutationCreateFamilyArgumentsSchema = z.object({
	input: mutationCreateFamilyInputSchema,
});

builder.mutationField("createFamily", (t) =>
	t.field({
		args: {
			input: t.arg({
				description: "",
				required: true,
				type: MutationCreateFamilyInput,
			}),
		},
		description: "Mutation field to create an familiy.",
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
			} = mutationCreateFamilyArgumentsSchema.safeParse(args);

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

			const [currentUser, existingOrganization] = await Promise.all([
				ctx.drizzleClient.query.usersTable.findFirst({
					columns: {
						role: true,
					},
					with: {
						organizationMembershipsWhereMember: {
							columns: {
								role: true,
							},
							where: (fields, operators) =>
								operators.eq(
									fields.organizationId,
									parsedArgs.input.organizationId,
								),
						},
					},
					where: (fields, operators) => operators.eq(fields.id, currentUserId),
				}),
				ctx.drizzleClient.query.organizationsTable.findFirst({
					with: {
						familiesWhereOrganization: {
							columns: {
								type: true,
							},
							where: (fields, operators) =>
								operators.eq(fields.name, parsedArgs.input.name),
						},
					},
					where: (fields, operators) =>
						operators.eq(fields.id, parsedArgs.input.organizationId),
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

			if (existingOrganization === undefined) {
				throw new TalawaGraphQLError({
					extensions: {
						code: "arguments_associated_resources_not_found",
						issues: [
							{
								argumentPath: ["input", "organizationId"],
							},
						],
					},
					message: "No associated resources found for the provided arguments.",
				});
			}

			const existingFamilyWithName =
				existingOrganization.familiesWhereOrganization[0];

			if (existingFamilyWithName !== undefined) {
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

			if (currentUser.role !== "administrator") {
				const currentUserOrganizationMembership =
					currentUser.organizationMembershipsWhereMember[0];

				if (
					currentUserOrganizationMembership === undefined ||
					currentUserOrganizationMembership.role !== "administrator"
				) {
					throw new TalawaGraphQLError({
						extensions: {
							code: "unauthorized_action_on_arguments_associated_resources",
							issues: [
								{
									argumentPath: ["input", "organizationId"],
								},
							],
						},
						message:
							"You are not authorized to perform this action on the resources associated to the provided arguments.",
					});
				}
			}

			return await ctx.drizzleClient.transaction(async (tx) => {
				const [createdFamily] = await tx
					.insert(familiesTable)
					.values({
						creatorId: currentUserId,
						endAt: parsedArgs.input.endAt,
						name: parsedArgs.input.name,
						organizationId: parsedArgs.input.organizationId,
						startAt: parsedArgs.input.startAt,
						type: parsedArgs.input.type,
					})
					.returning();

				// Inserted familiy not being returned is an external defect unrelated to this code. It is very unlikely for this error to occur.
				if (createdFamily === undefined) {
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

				if (parsedArgs.input.attachments !== undefined) {
					await tx.insert(familiyAttachmentsTable).values(
						parsedArgs.input.attachments.map((attachment) => ({
							familiyId: createdFamily.id,
							creatorId: currentUserId,

							type: attachment.type,
							uri: attachment.uri,
						})),
					);
				}

				return createdFamily;
			});
		},
		type: Family,
	}),
);
