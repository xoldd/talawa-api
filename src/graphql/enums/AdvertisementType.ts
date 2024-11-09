import { advertisementTypeEnum } from "~/src/drizzle/enums";
import { builder } from "~/src/graphql/builder";

export const AdvertisementType = builder.enumType("AdvertisementType", {
	description: "",
	values: advertisementTypeEnum.options,
});
