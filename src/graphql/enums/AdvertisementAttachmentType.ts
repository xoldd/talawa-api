import { advertisementAttachmentTypeEnum } from "~/src/drizzle/enums.js";
import { builder } from "~/src/graphql/builder.js";

export const AdvertisementAttachmentType = builder.enumType(
	"AdvertisementAttachmentType",
	{
		description: "",
		values: advertisementAttachmentTypeEnum.options,
	},
);
