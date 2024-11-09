import { venueAttachmentTypeEnum } from "~/src/drizzle/enums";
import { builder } from "~/src/graphql/builder";

export const VenueAttachmentType = builder.enumType("VenueAttachmentType", {
	description: "",
	values: venueAttachmentTypeEnum.options,
});
