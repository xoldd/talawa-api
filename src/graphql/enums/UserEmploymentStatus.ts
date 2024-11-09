import { userEmploymentStatusEnum } from "~/src/drizzle/enums";
import { builder } from "~/src/graphql/builder";

export const UserEmploymentStatus = builder.enumType("UserEmploymentStatus", {
	description: "",
	values: userEmploymentStatusEnum.options,
});
