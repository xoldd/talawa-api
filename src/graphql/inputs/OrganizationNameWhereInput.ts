import { z } from "zod";
import { organizationsTableInsertSchema } from "~/src/drizzle/tables/organizations";
import { builder } from "~/src/graphql/builder";

export const organizationNameWhereInputSchema = z
	.object({
		equal: organizationsTableInsertSchema.shape.name
			.nullish()
			.transform((arg) => (arg === null ? undefined : arg)),
	})
	.superRefine((arg, ctx) => {
		if (!Object.values(arg).some((value) => value !== undefined)) {
			ctx.addIssue({
				code: "custom",
				message: "At least one optional argument must be provided.",
			});
		}
	});

export const OrganizationNameWhereInput = builder
	.inputRef<z.infer<typeof organizationNameWhereInputSchema>>(
		"OrganizationNameWhereInput",
	)
	.implement({
		description: "",
		fields: (t) => ({
			equal: t.string({
				description: "",
			}),
		}),
	});
