import { z } from "zod";
import { organizationsTableSelectSchema } from "~/src/drizzle/tables/organizations";
import { builder } from "~/src/graphql/builder";

export const mutationDeleteOrganizationInputSchema = z.object({
	id: organizationsTableSelectSchema.shape.id,
});

export const MutationDeleteOrganizationInput = builder
	.inputRef<z.infer<typeof mutationDeleteOrganizationInputSchema>>(
		"MutationDeleteOrganizationInput",
	)
	.implement({
		description: "",
		fields: (t) => ({
			id: t.id({
				description: "Global identifier of the organization.",
				required: true,
			}),
		}),
	});
