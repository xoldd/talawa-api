import { volunteerGroupAssignmentInviteStatusEnum } from "~/src/drizzle/enums";
import { builder } from "~/src/graphql/builder";

export const VolunteerGroupAssignmentInviteStatus = builder.enumType(
	"VolunteerGroupAssignmentInviteStatus",
	{
		description: "",
		values: volunteerGroupAssignmentInviteStatusEnum.options,
	},
);
