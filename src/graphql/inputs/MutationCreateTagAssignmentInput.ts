import type { z } from "zod";
import { tagAssignmentsTableInsertSchema } from "~/src/drizzle/tables/tagAssignments";
import { builder } from "~/src/graphql/builder";

export const mutationCreateTagAssignmentInputSchema =
	tagAssignmentsTableInsertSchema.pick({
		assigneeId: true,
		tagId: true,
	});

export const MutationCreateTagAssignmentInput = builder
	.inputRef<z.infer<typeof mutationCreateTagAssignmentInputSchema>>(
		"MutationCreateTagAssignmentInput",
	)
	.implement({
		description: "",
		fields: (t) => ({
			assigneeId: t.id({
				description:
					"Global identifier of the user that the tag is assigned to.",
				required: true,
			}),
			tagId: t.id({
				description: "Global identifier of the tag that is assigned.",
				required: true,
			}),
		}),
	});
