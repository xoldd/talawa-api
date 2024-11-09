import { userNatalSexEnum } from "~/src/drizzle/enums";
import { builder } from "~/src/graphql/builder";

export const UserNatalSex = builder.enumType("UserNatalSex", {
	description: "",
	values: userNatalSexEnum.options,
});
