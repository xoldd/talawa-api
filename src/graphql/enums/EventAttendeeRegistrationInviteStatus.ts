import { eventAttendeeRegistrationInviteStatusEnum } from "~/src/drizzle/enums.js";
import { builder } from "~/src/graphql/builder.js";

export const EventAttendeeRegistrationInviteStatus = builder.enumType(
	"EventAttendeeRegistrationInviteStatus",
	{
		description: "",
		values: eventAttendeeRegistrationInviteStatusEnum.options,
	},
);
