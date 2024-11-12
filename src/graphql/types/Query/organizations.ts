import { type SQL, and, asc, desc, eq, exists, gt, lt } from "drizzle-orm";
import { organizationsTable } from "~/src/drizzle/schema";
import { builder } from "~/src/graphql/builder";
import {
	defaultGraphQLConnectionArgumentsSchema,
	transformDefaultGraphQLConnectionArguments,
	transformToDefaultGraphQLConnection,
} from "~/src/graphql/reusables/defaultGraphQLConnection";
import { Organization } from "~/src/graphql/types/Organization/Organization";
import { TalawaGraphQLError } from "~/src/utilities/TalawaGraphQLError";

const queryOrganizationsArgumentsSchema =
	defaultGraphQLConnectionArgumentsSchema.transform(
		transformDefaultGraphQLConnectionArguments,
	);

builder.queryField("organizations", (t) =>
	t.connection(
		{
			description:
				"Query field to read the organizations by traversing across a graphql connection.",
			resolve: async (_parent, args, ctx) => {
				const {
					data: parsedArgs,
					error,
					success,
				} = queryOrganizationsArgumentsSchema.safeParse(args);

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

				const { cursor, isInversed, limit } = parsedArgs;

				const orderBy = isInversed
					? asc(organizationsTable.id)
					: desc(organizationsTable.id);

				let where: SQL | undefined;
				if (isInversed) {
					if (cursor !== undefined) {
						where = and(
							exists(
								ctx.drizzleClient
									.select()
									.from(organizationsTable)
									.where(eq(organizationsTable.id, cursor)),
							),
							gt(organizationsTable.id, cursor),
						);
					}
				} else {
					if (cursor !== undefined) {
						where = and(
							exists(
								ctx.drizzleClient
									.select()
									.from(organizationsTable)
									.where(eq(organizationsTable.id, cursor)),
							),
							lt(organizationsTable.id, cursor),
						);
					}
				}

				const organizations =
					await ctx.drizzleClient.query.organizationsTable.findMany({
						limit,
						orderBy,
						where,
					});

				if (cursor !== undefined && organizations.length === 0) {
					throw new TalawaGraphQLError({
						extensions: {
							code: "arguments_associated_resources_not_found",
							issues: [
								{
									argumentPath: [isInversed ? "before" : "after"],
								},
							],
						},
						message:
							"No associated resources found for the provided arguments.",
					});
				}

				return transformToDefaultGraphQLConnection({
					createCursor: (organization) => organization.id,
					createNode: (organization) => organization,
					parsedArgs,
					rawNodes: organizations,
				});
			},

			type: Organization,
		},
		{
			description: "",
		},
		{
			description: "",
		},
	),
);
