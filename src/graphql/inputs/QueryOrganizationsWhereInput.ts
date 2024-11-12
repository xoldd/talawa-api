import { z } from "zod";
import { builder } from "~/src/graphql/builder";
import {
	OrganizationNameWhereInput,
	organizationNameWhereInputSchema,
} from "./OrganizationNameWhereInput";

export const queryOrganizationsWhereInputSchema = z
	.object({
		name: organizationNameWhereInputSchema
			.nullish()
			.transform((arg) => (arg === null ? undefined : arg)),
	})
	.superRefine((arg, ctx) => {
		const argDefinedValues = Object.values(arg).filter(
			(value) => value !== undefined,
		);

		if (argDefinedValues.length === 0) {
			ctx.addIssue({
				code: "custom",
				message: "At least one optional argument must be provided.",
			});
		}

		if (argDefinedValues.length !== 1) {
			ctx.addIssue({
				code: "custom",
				message: "At any time only one optional argument must be provided.",
			});
		}
	});

export const QueryOrganizationsWhereInput = builder
	.inputRef<z.infer<typeof queryOrganizationsWhereInputSchema>>(
		"QueryOrganizationsWhereInput",
	)
	.implement({
		description: "",
		fields: (t) => ({
			name: t.field({
				description: "",
				type: OrganizationNameWhereInput,
			}),
		}),
	});
