import { eventAttendeeRegistrationInviteStatusEnum } from "~/src/drizzle/enums/eventAttendeeRegistrationInviteStatus";
import { builder } from "~/src/graphql/builder";

export const EventAttendeeRegistrationInviteStatus = builder.enumType(
	"EventAttendeeRegistrationInviteStatus",
	{
		description: "",
		values: eventAttendeeRegistrationInviteStatusEnum.enumValues,
	},
);
