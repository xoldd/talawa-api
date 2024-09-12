import { pgEnum } from "drizzle-orm/pg-core";

export const familyMembershipRolePgEnum = pgEnum("family_membership_role", [
	"adult",
	"child",
	"head_of_household",
	"spouse",
]);
