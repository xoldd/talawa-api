import { userNatalSexEnum } from "~/src/drizzle/enums.js";
import { builder } from "~/src/graphql/builder.js";

export const UserNatalSex = builder.enumType("UserNatalSex", {
	description: "",
	values: userNatalSexEnum.options,
});
