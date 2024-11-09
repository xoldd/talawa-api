import { userMaritalStatusEnum } from "~/src/drizzle/enums";
import { builder } from "~/src/graphql/builder";

export const UserMaritalStatus = builder.enumType("UserMaritalStatus", {
	description: "",
	values: userMaritalStatusEnum.options,
});
