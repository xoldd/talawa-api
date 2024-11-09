import { advertisementAttachmentTypeEnum } from "~/src/drizzle/enums";
import { builder } from "~/src/graphql/builder";

export const AdvertisementAttachmentType = builder.enumType(
	"AdvertisementAttachmentType",
	{
		description: "",
		values: advertisementAttachmentTypeEnum.options,
	},
);
