import { eventAttachmentTypeEnum } from "~/src/drizzle/enums.js";
import { builder } from "~/src/graphql/builder.js";

export const EventAttachmentType = builder.enumType("EventAttachmentType", {
	description: "",
	values: eventAttachmentTypeEnum.options,
});
