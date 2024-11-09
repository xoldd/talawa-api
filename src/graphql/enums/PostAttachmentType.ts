import { postAttachmentTypeEnum } from "~/src/drizzle/enums";
import { builder } from "~/src/graphql/builder";

export const PostAttachmentType = builder.enumType("PostAttachmentType", {
	description: "",
	values: postAttachmentTypeEnum.options,
});
