import { agendaItemTypeEnum } from "~/src/drizzle/enums.js";
import { builder } from "~/src/graphql/builder.js";

export const AgendaItemType = builder.enumType("AgendaItemType", {
	description: "",
	values: agendaItemTypeEnum.options,
});
