import { commmentVoteTypeEnum } from "~/src/drizzle/enums.js";
import { builder } from "~/src/graphql/builder.js";

export const CommentVoteType = builder.enumType("CommentVoteType", {
	description: "",
	values: commmentVoteTypeEnum.options,
});
