import { familyMembershipRoleEnum } from "~/src/drizzle/enums/familyMembershipRole";
import { builder } from "~/src/graphql/builder";

export const FamilyMembershipRole = builder.enumType("FamilyMembershipRole", {
	description: "",
	values: familyMembershipRoleEnum.enumValues,
});
