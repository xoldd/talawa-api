import type { familiesTable } from "~/src/drizzle/tables/families";
import { builder } from "~/src/graphql/builder";

export type Family = typeof familiesTable.$inferSelect;

export const Family = builder.objectRef<Family>("Family");

Family.implement({
	description: "",
	fields: (t) => ({
		body: t.exposeString("body", {
			description: "Body of the family.",
		}),
		createdAt: t.expose("createdAt", {
			description: "Date time at the time the family was created.",
			type: "DateTime",
		}),
		id: t.exposeID("id", {
			description: "Global identifier of the family.",
			nullable: false,
		}),
		updatedAt: t.expose("updatedAt", {
			description: "Date time at the time the family was last updated.",
			type: "DateTime",
		}),
	}),
});
