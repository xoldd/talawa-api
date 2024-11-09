import { commmentVoteTypeEnum } from "~/src/drizzle/enums";
import { builder } from "~/src/graphql/builder";

export const CommentVoteType = builder.enumType("CommentVoteType", {
	description: "",
	values: commmentVoteTypeEnum.options,
});
