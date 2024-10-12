import { postAttachmentTypeEnum } from "~/src/drizzle/enums.js";
import { builder } from "~/src/graphql/builder.js";

export const PostAttachmentType = builder.enumType("PostAttachmentType", {
	description: "",
	values: postAttachmentTypeEnum.options,
});
