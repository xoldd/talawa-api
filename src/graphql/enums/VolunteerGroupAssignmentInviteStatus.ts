import { volunteerGroupAssignmentInviteStatusEnum } from "~/src/drizzle/enums/volunteerGroupAssignmentInviteStatus";
import { builder } from "~/src/graphql/builder";

export const VolunteerGroupAssignmentInviteStatus = builder.enumType(
	"VolunteerGroupAssignmentInviteStatus",
	{
		description: "",
		values: volunteerGroupAssignmentInviteStatusEnum.enumValues,
	},
);
