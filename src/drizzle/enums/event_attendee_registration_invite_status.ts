import { pgEnum } from "drizzle-orm/pg-core";

export const eventAttendeeRegistrationInviteStatusPgEnum = pgEnum(
	"event_attendee_registration_invite_status",
	["ACCEPTED", "DECLINED", "NO_RESPONSE"],
);
