import { recurrenceTypeEnum } from "~/src/drizzle/enums";
import { builder } from "~/src/graphql/builder";

export const RecurrenceType = builder.enumType("RecurrenceType", {
	description: "",
	values: recurrenceTypeEnum.options,
});
