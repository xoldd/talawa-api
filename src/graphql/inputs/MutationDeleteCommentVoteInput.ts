import type { z } from "zod";
import { commentVotesTableInsertSchema } from "~/src/drizzle/tables/commentVotes";
import { builder } from "~/src/graphql/builder";

export const mutationDeleteCommentVoteInputSchema =
	commentVotesTableInsertSchema
		.pick({
			commentId: true,
		})
		.extend({
			voterId: commentVotesTableInsertSchema.shape.voterId.unwrap().unwrap(),
		});

export const MutationDeleteCommentVoteInput = builder
	.inputRef<z.infer<typeof mutationDeleteCommentVoteInputSchema>>(
		"MutationDeleteCommentVoteInput",
	)
	.implement({
		description: "",
		fields: (t) => ({
			commentId: t.id({
				description: "Global identifier of the comment that is voted.",
				required: true,
			}),
			voterId: t.id({
				description: "Global identifier of the user who voted.",
				required: true,
			}),
		}),
	});
