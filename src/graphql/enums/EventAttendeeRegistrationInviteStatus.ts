import { eventAttendeeRegistrationInviteStatusEnum } from "~/src/drizzle/enums";
import { builder } from "~/src/graphql/builder";

export const EventAttendeeRegistrationInviteStatus = builder.enumType(
	"EventAttendeeRegistrationInviteStatus",
	{
		description: "",
		values: eventAttendeeRegistrationInviteStatusEnum.options,
	},
);
