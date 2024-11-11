import { eq } from "drizzle-orm";
import { z } from "zod";
import { organizationsTable } from "~/src/drizzle/tables/organizations";
import { builder } from "~/src/graphql/builder";
import {
	MutationUpdateOrganizationInput,
	mutationUpdateOrganizationInputSchema,
} from "~/src/graphql/inputs/MutationUpdateOrganizationInput";
import { Organization } from "~/src/graphql/types/Organization/Organization";
import {
	type ArgumentsAssociatedResourcesNotFound,
	TalawaGraphQLError,
} from "~/src/utilities/TalawaGraphQLError";

const mutationUpdateOrganizationsArgumentsSchema = z
	.object({
		input: mutationUpdateOrganizationInputSchema.array().min(1).max(32),
	})
	.superRefine((arg, ctx) => {
		const uniqueIds = new Set<
			z.infer<typeof mutationUpdateOrganizationInputSchema>["id"]
		>();

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

builder.mutationField("updateOrganizations", (t) =>
	t.field({
		args: {
			input: t.arg({
				description: "",
				required: true,
				type: t.arg.listRef(MutationUpdateOrganizationInput, {
					required: true,
				}),
			}),
		},
		description: "Mutation field to update organizations.",
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
				success,
				data: parsedArgs,
				error,
			} = mutationUpdateOrganizationsArgumentsSchema.safeParse(args);

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

			const ids = parsedArgs.input.map((input) => input.id);

			const existingOrganizationsWithIds = (
				await ctx.drizzleClient.query.organizationsTable.findMany({
					where: (fields, operators) => operators.inArray(fields.id, ids),
				})
			).sort(
				// Sort the organization records in the order of corresponding inputs provided by the client.
				(organization0, organization1) =>
					ids.indexOf(organization0.id) - ids.indexOf(organization1.id),
			);

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

			const currentClientUserId = ctx.currentClient.user.id;

			return await ctx.drizzleClient.transaction(async (tx) => {
				const updatedOrganizations = await Promise.all(
					parsedArgs.input.map(({ id, ...input }) => {
						const updatedOrganizationPromise =
							// Immediately invoked anonymous async function for creating a promise.
							(async () => {
								const [updatedOrganization] = await tx
									.update(organizationsTable)
									.set({
										...input,
										updaterId: currentClientUserId,
									})
									.where(eq(organizationsTable.id, id))
									.returning();

								// If the updated organization record is not returned, it means that either it was deleted or itrs `id` column was changed by an external entity before this update operation. To keep the update operation consistent with the input we throw the error to rollback the postgres transaction.
								if (updatedOrganization === undefined) {
									throw new TalawaGraphQLError({
										extensions: {
											code: "unexpected",
										},
										message: "Something went wrong. Please try again.",
									});
								}

								return updatedOrganization;
							})();

						return updatedOrganizationPromise;
					}),
				);

				return updatedOrganizations;
			});
		},
		type: t.listRef(Organization),
	}),
);
