import type { z } from "zod";
import { tagAssignmentsTableInsertSchema } from "~/src/drizzle/tables/tagAssignments";
import { builder } from "~/src/graphql/builder";

export const mutationDeleteTagAssignmentInputSchema =
	tagAssignmentsTableInsertSchema.pick({
		assigneeId: true,
		tagId: true,
	});

export const MutationDeleteTagAssignmentInput = builder
	.inputRef<z.infer<typeof mutationDeleteTagAssignmentInputSchema>>(
		"MutationDeleteTagAssignmentInput",
	)
	.implement({
		description: "",
		fields: (t) => ({
			assigneeId: t.id({
				description: "Global identifier of the user who is assigned the tag.",
				required: true,
			}),
			tagId: t.id({
				description: "Global identifier of the associated tag.",
				required: true,
			}),
		}),
	});
