import { familyMembershipRoleEnum } from "~/src/drizzle/enums";
import { builder } from "~/src/graphql/builder";

export const FamilyMembershipRole = builder.enumType("FamilyMembershipRole", {
	description: "",
	values: familyMembershipRoleEnum.options,
});
