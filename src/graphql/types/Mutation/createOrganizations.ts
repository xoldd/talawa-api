import { z } from "zod";
import { organizationsTable } from "~/src/drizzle/tables/organizations";
import { builder } from "~/src/graphql/builder";
import {
	MutationCreateOrganizationInput,
	mutationCreateOrganizationInputSchema,
} from "~/src/graphql/inputs/MutationCreateOrganizationInput";
import { Organization } from "~/src/graphql/types/Organization/Organization";
import { TalawaGraphQLError } from "~/src/utilities/talawaGraphQLError";

const mutationCreateOrganizationsArgumentsSchema = z.object({
	input: mutationCreateOrganizationInputSchema.array().min(1).max(32),
});

builder.mutationField("createOrganizations", (t) =>
	t.field({
		args: {
			input: t.arg({
				description: "",
				required: true,
				type: t.arg.listRef(MutationCreateOrganizationInput, {
					required: true,
				}),
			}),
		},
		description: "Mutation field to create organizations.",
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
			} = mutationCreateOrganizationsArgumentsSchema.safeParse(args);

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

			const currentClientUserId = ctx.currentClient.user.id;

			return await ctx.drizzleClient
				.insert(organizationsTable)
				.values(
					parsedArgs.input.map((input) => ({
						...input,
						creatorId: currentClientUserId,
					})),
				)
				.returning();
		},
		type: t.listRef(Organization),
	}),
);
