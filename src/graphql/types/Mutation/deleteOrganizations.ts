import { inArray } from "drizzle-orm";
import { z } from "zod";
import { organizationsTable } from "~/src/drizzle/tables/organizations";
import { builder } from "~/src/graphql/builder";
import {
	MutationDeleteOrganizationInput,
	mutationDeleteOrganizationInputSchema,
} from "~/src/graphql/inputs/MutationDeleteOrganizationInput";
import { Organization } from "~/src/graphql/types/Organization/Organization";
import {
	type ArgumentsAssociatedResourcesNotFound,
	TalawaGraphQLError,
} from "~/src/utilities/TalawaGraphQLError";

const mutationDeleteOrganizationsArgumentsSchema = z
	.object({
		input: mutationDeleteOrganizationInputSchema.array().min(1).max(32),
	})
	.superRefine((arg, ctx) => {
		const uniqueIds = new Set();

		for (const [index, input] of arg.input.entries()) {
			if (uniqueIds.has(input.id)) {
				ctx.addIssue({
					code: "custom",
					message: "Duplicate value of a previous input's id argument.",
					path: ["input", index, "id"],
				});
			}
			uniqueIds.add(input.id);
		}
	});

builder.mutationField("deleteOrganizations", (t) =>
	t.field({
		args: {
			input: t.arg({
				description: "",
				required: true,
				type: t.arg.listRef(MutationDeleteOrganizationInput, {
					required: true,
				}),
			}),
		},
		description: "Entrypoint mutation field to delete an organization.",
		resolve: async (_parent, args, ctx) => {
			if (!ctx.currentClient.isAuthenticated) {
				throw ctx.currentClient.error;
			}

			if (ctx.currentClient.user.role !== "administrator") {
				throw new TalawaGraphQLError({
					extensions: {
						code: "unauthorized_action",
					},
					message: "You are not authorized to perform this action.",
				});
			}

			const {
				data: parsedArgs,
				error,
				success,
			} = mutationDeleteOrganizationsArgumentsSchema.safeParse(args);

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

			const ids = parsedArgs.input.map((input, index) => input.id);

			const existingOrganizationsWithIds = (
				await ctx.drizzleClient.query.organizationsTable.findMany({
					where: (fields, operators) => operators.inArray(fields.id, ids),
				})
			).sort(
				// Sort the organizations in the order of corresponding inputs provided by the client.
				(organization0, organization1) =>
					ids.indexOf(organization0.id) - ids.indexOf(organization1.id),
			);

			// Length of the `existingOrganizationsWithIds` array not being equal to the length of the `ids` array means that the delete operation would result in a partial deletion inconsistent with the provided input.
			if (existingOrganizationsWithIds.length !== ids.length) {
				throw new TalawaGraphQLError({
					extensions: {
						code: "arguments_associated_resources_not_found",
						issues: ids.reduce<ArgumentsAssociatedResourcesNotFound["issues"]>(
							(accumulator, id, index) => {
								if (
									existingOrganizationsWithIds.some(
										(organization) => organization.id !== id,
									)
								) {
									accumulator.push({
										argumentPath: ["input", index, "id"],
									});
								}
								return accumulator;
							},
							[],
						),
					},
					message: "No associated resources found for the provided arguments.",
				});
			}

			return await ctx.drizzleClient.transaction(async (tx) => {
				const deletedOrganizations = (
					await tx
						.delete(organizationsTable)
						.where(inArray(organizationsTable.id, ids))
						.returning()
				).sort(
					// Sort the organization records in the order of corresponding inputs provided by the client.
					(organization0, organization1) =>
						ids.indexOf(organization0.id) - ids.indexOf(organization1.id),
				);

				// If the number of deleted organization records is not equal to the number of records that were meant to be deleted, it means that some of those records were either deleted or their `id` column was changed by external entities before this delete operation. To keep the delete operation consistent with the input we throw the error to rollback the postgres transaction.
				if (deletedOrganizations.length !== ids.length) {
					throw new TalawaGraphQLError({
						extensions: {
							code: "unexpected",
						},
						message: "Something went wrong. Please try again.",
					});
				}

				return deletedOrganizations;
			});
		},
		type: t.listRef(Organization),
	}),
);
