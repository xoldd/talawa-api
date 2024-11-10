import type { z } from "zod";
import { organizationsTableInsertSchema } from "~/src/drizzle/tables/organizations";
import { builder } from "~/src/graphql/builder";
import { Iso3166Alpha2CountryCode } from "~/src/graphql/enums/Iso3166Alpha2CountryCode";

export const mutationCreateOrganizationInputSchema =
	organizationsTableInsertSchema
		.omit({
			createdAt: true,
			creatorId: true,
			id: true,
			isPrivate: true,
			isVisible: true,
			updatedAt: true,
			updaterId: true,
		})
		.extend({
			isPrivate: organizationsTableInsertSchema.shape.isPrivate
				.nullable()
				.transform((arg) => (arg === null ? undefined : arg)),
			isVisible: organizationsTableInsertSchema.shape.isVisible
				.nullable()
				.transform((arg) => (arg === null ? undefined : arg)),
		});

export const MutationCreateOrganizationInput = builder
	.inputRef<z.infer<typeof mutationCreateOrganizationInputSchema>>(
		"MutationCreateOrganizationInput",
	)
	.implement({
		description: "",
		fields: (t) => ({
			address: t.string({
				description: "Address of the organization.",
			}),
			avatarURI: t.string({
				description: "URI to the avatar of the organization.",
			}),
			city: t.string({
				description: "Name of the city where the organization resides in.",
			}),
			countryCode: t.field({
				description:
					"Country code of the country the organization is a citizen of.",
				type: Iso3166Alpha2CountryCode,
			}),
			description: t.string({
				description: "Custom information about the organization.",
			}),
			isPrivate: t.boolean({
				description:
					"Boolean to tell whether the organization requires manual verification for membership.",
			}),
			isVisible: t.boolean({
				description:
					"Boolean to tell whether the organization is visible in public search.",
			}),
			name: t.string({
				description: "Name of the organization.",
				required: true,
			}),
			postalCode: t.string({
				description: "Postal code of the organization.",
			}),
			state: t.string({
				description: "Name of the state the organization resides in.",
			}),
		}),
	});
