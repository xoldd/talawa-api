import { organizationMembershipRole } from "~/src/drizzle/enums";
import { builder } from "~/src/graphql/builder";

export const OrganizationMembershipRole = builder.enumType(
	"OrganizationMembershipRole",
	{
		description: "",
		values: organizationMembershipRole.options,
	},
);
