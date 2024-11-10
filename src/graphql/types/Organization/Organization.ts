import type { organizationsTable } from "~/src/drizzle/tables/organizations";
import { builder } from "~/src/graphql/builder";
import { Iso3166Alpha2CountryCode } from "~/src/graphql/enums/Iso3166Alpha2CountryCode";

export type Organization = typeof organizationsTable.$inferSelect;

export const Organization = builder.objectRef<Organization>("Organization");

Organization.implement({
	description: "",
	fields: (t) => ({
		address: t.exposeString("address", {
			description: "Address of the organization.",
		}),
		avatarURI: t.exposeString("avatarURI", {
			description: "URI to the avatar of the organization.",
		}),
		city: t.exposeString("city", {
			description: "Name of the city where the organization resides in.",
		}),
		countryCode: t.expose("countryCode", {
			description:
				"Country code of the country the organization is a citizen of.",
			type: Iso3166Alpha2CountryCode,
		}),
		description: t.exposeString("description", {
			description: "Custom information about the organization.",
		}),
		id: t.exposeID("id", {
			description: "Global identifier of the organization.",
		}),
		isPrivate: t.exposeBoolean("isPrivate", {
			description:
				"Boolean to tell whether the organization requires manual verification for membership.",
		}),
		isVisible: t.exposeBoolean("isVisible", {
			description:
				"Boolean to tell whether the organization is visible in public search.",
		}),
		name: t.exposeString("name", {
			description: "Name of the organization.",
		}),
		postalCode: t.exposeString("postalCode", {
			description: "Postal code of the organization.",
		}),
		state: t.exposeString("state", {
			description: "Name of the state the organization resides in.",
		}),
	}),
});
