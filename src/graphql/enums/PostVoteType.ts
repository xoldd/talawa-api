import { postVoteTypeEnum } from "~/src/drizzle/enums.js";
import { builder } from "~/src/graphql/builder.js";

export const PostVoteType = builder.enumType("PostVoteType", {
	description: "",
	values: postVoteTypeEnum.options,
});
