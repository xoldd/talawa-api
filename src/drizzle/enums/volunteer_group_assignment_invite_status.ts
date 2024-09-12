import { pgEnum } from "drizzle-orm/pg-core";

export const volunteerGroupAssignmentInviteStatusPgEnum = pgEnum(
	"volunteer_group_assignment_invite_status",
	["ACCEPTED", "DECLINED", "NO_RESPONSE"],
);
