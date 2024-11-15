import type { tagsTable } from "~/src/drizzle/tables/tags";
import { builder } from "~/src/graphql/builder";

export type Tag = typeof tagsTable.$inferSelect;

export const Tag = builder.objectRef<Tag>("Tag");

Tag.implement({
	description: "",
	fields: (t) => ({
		createdAt: t.expose("createdAt", {
			description: "",
			type: "DateTime",
		}),
		id: t.exposeID("id", {
			description: "Global identifier of the tag.",
		}),
		name: t.exposeString("name", {
			description: "Name of the tag.",
		}),
		updatedAt: t.expose("updatedAt", {
			description: "",
			type: "DateTime",
		}),
	}),
});
