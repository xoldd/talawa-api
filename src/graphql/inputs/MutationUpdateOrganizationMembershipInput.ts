import type { z } from "zod";
import { organizationMembershipsTableInsertSchema } from "~/src/drizzle/tables/organizationMemberships";
import { builder } from "~/src/graphql/builder";
import { OrganizationMembershipRole } from "~/src/graphql/enums/OrganizationMembershipRole";

export const mutationUpdateOrganizationMembershipInputSchema =
	organizationMembershipsTableInsertSchema
		.omit({
			createdAt: true,
			creatorId: true,
			isApproved: true,
			role: true,
			updatedAt: true,
			updaterId: true,
		})
		.extend({
			isApproved: organizationMembershipsTableInsertSchema.shape.isApproved
				.nullable()
				.transform((arg) => (arg === null ? undefined : arg)),
			role: organizationMembershipsTableInsertSchema.shape.role
				.nullable()
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
