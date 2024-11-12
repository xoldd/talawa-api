import { z } from "zod";
import { organizationsTableSelectSchema } from "~/src/drizzle/tables/organizations";
import { builder } from "~/src/graphql/builder";
import { Organization } from "~/src/graphql/types/Organization/Organization";
import { TalawaGraphQLError } from "~/src/utilities/TalawaGraphQLError";

const queryOrganizationArgumentsSchema = z.object({
	id: organizationsTableSelectSchema.shape.id,
});

builder.queryField("organization", (t) =>
	t.field({
		args: {
			id: t.arg.id({
				description: "",
				required: true,
			}),
		},
		description: "Query field to read an organization.",
		resolve: async (_parent, args, ctx) => {
			const {
				data: parsedArgs,
				error,
				success,
			} = queryOrganizationArgumentsSchema.safeParse(args);

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

			const organization =
				await ctx.drizzleClient.query.organizationsTable.findFirst({
					where: (fields, operators) => operators.eq(fields.id, parsedArgs.id),
				});

			if (organization === undefined) {
				throw new TalawaGraphQLError({
					extensions: {
						code: "arguments_associated_resources_not_found",
						issues: [
							{
								argumentPath: ["id"],
							},
						],
					},
					message: "No associated resources found for the provided arguments.",
				});
			}

			return organization;
		},
		type: Organization,
	}),
);
