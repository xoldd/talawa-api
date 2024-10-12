import { volunteerGroupAssignmentInviteStatusEnum } from "~/src/drizzle/enums.js";
import { builder } from "~/src/graphql/builder.js";

export const VolunteerGroupAssignmentInviteStatus = builder.enumType(
	"VolunteerGroupAssignmentInviteStatus",
	{
		description: "",
		values: volunteerGroupAssignmentInviteStatusEnum.options,
	},
);
