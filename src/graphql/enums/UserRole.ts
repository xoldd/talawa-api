import { userRole } from "~/src/drizzle/enums";
import { builder } from "~/src/graphql/builder";

export const UserRole = builder.enumType("UserRole", {
	description: "",
	values: userRole.options,
});
