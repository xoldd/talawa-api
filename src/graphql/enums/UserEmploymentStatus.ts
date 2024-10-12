import { userEmploymentStatusEnum } from "~/src/drizzle/enums.js";
import { builder } from "~/src/graphql/builder.js";

export const UserEmploymentStatus = builder.enumType("UserEmploymentStatus", {
	description: "",
	values: userEmploymentStatusEnum.options,
});
