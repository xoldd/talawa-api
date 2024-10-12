import { recurrenceTypeEnum } from "~/src/drizzle/enums.js";
import { builder } from "~/src/graphql/builder.js";

export const RecurrenceType = builder.enumType("RecurrenceType", {
	description: "",
	values: recurrenceTypeEnum.options,
});
