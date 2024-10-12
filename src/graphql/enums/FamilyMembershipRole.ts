import { familyMembershipRoleEnum } from "~/src/drizzle/enums.js";
import { builder } from "~/src/graphql/builder.js";

export const FamilyMembershipRole = builder.enumType("FamilyMembershipRole", {
	description: "",
	values: familyMembershipRoleEnum.options,
});
