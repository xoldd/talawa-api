import { z } from "zod";
import { tagsTableInsertSchema } from "~/src/drizzle/tables/tags";
import { builder } from "~/src/graphql/builder";
import { Tag } from "~/src/graphql/types/Tag/Tag";
import { TalawaGraphQLError } from "~/src/utilities/talawaGraphQLError";

const queryTagArgumentsSchema = z.object({
	id: tagsTableInsertSchema.shape.id.unwrap(),
});

builder.queryField("tag", (t) =>
	t.field({
		args: {
			id: t.arg.id({
				description: "",
				required: true,
			}),
		},
		description: "Query field to read a tag.",
		resolve: async (_parent, args, ctx) => {
			const {
				data: parsedArgs,
				error,
				success,
			} = queryTagArgumentsSchema.safeParse(args);

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

			const tag = await ctx.drizzleClient.query.tagsTable.findFirst({
				where: (fields, operators) => operators.eq(fields.id, parsedArgs.id),
			});

			if (tag === undefined) {
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

			return tag;
		},
		type: Tag,
	}),
);
