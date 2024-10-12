import { venueAttachmentTypeEnum } from "~/src/drizzle/enums.js";
import { builder } from "~/src/graphql/builder.js";

export const VenueAttachmentType = builder.enumType("VenueAttachmentType", {
	description: "",
	values: venueAttachmentTypeEnum.options,
});
