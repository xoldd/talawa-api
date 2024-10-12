import { advertisementTypeEnum } from "~/src/drizzle/enums.js";
import { builder } from "~/src/graphql/builder.js";

export const AdvertisementType = builder.enumType("AdvertisementType", {
	description: "",
	values: advertisementTypeEnum.options,
});
