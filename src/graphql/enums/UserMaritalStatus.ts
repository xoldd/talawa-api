import { userMaritalStatusEnum } from "~/src/drizzle/enums.js";
import { builder } from "~/src/graphql/builder.js";

export const UserMaritalStatus = builder.enumType("UserMaritalStatus", {
	description: "",
	values: userMaritalStatusEnum.options,
});
