import type { z } from "zod";
import { organizationMembershipsTableSelectSchema } from "~/src/drizzle/tables/organizationMemberships";
import { builder } from "~/src/graphql/builder";
import { OrganizationMembershipRole } from "~/src/graphql/enums/OrganizationMembershipRole";

export const mutationUpdateOrganizationMembershipInputSchema =
	organizationMembershipsTableSelectSchema
		.omit({
			createdAt: true,
			creatorId: true,
			isApproved: true,
			role: true,
			updatedAt: true,
			updaterId: true,
		})
		.extend({
			isApproved: organizationMembershipsTableSelectSchema.shape.isApproved
				.nullish()
				.transform((arg) => (arg === null ? undefined : arg)),
			role: organizationMembershipsTableSelectSchema.shape.role
				.nullish()
				.transform((arg) => (arg === null ? undefined : arg)),
		});

export const MutationUpdateOrganizationMembershipInput = builder
	.inputRef<z.infer<typeof mutationUpdateOrganizationMembershipInputSchema>>(
		"MutationUpdateOrganizationMembershipInput",
	)
	.implement({
		description: "",
		fields: (t) => ({
			isApproved: t.boolean({
				description:
					"Boolean to tell whether the membership has been approved.",
			}),
			memberId: t.id({
				description: "Global identifier of the associated user.",
				required: true,
			}),
			organizationId: t.id({
				description: "Global identifier of the associated organization.",
				required: true,
			}),
			role: t.field({
				description: "Role assigned to the user within the organization.",
				type: OrganizationMembershipRole,
			}),
		}),
	});
