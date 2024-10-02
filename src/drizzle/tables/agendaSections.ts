import { type InferSelectModel, relations } from "drizzle-orm";
import {
	type AnyPgColumn,
	index,
	integer,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	uuid,
} from "drizzle-orm/pg-core";
import { agendaItemsPgTable } from "./agendaItems.js";
import { eventsPgTable } from "./events.js";
import { usersPgTable } from "./users.js";

export const agendaSectionsPgTable = pgTable(
	"agenda_sections",
	{
		createdAt: timestamp("created_at", {}).notNull().defaultNow(),

		creatorId: uuid("creator_id").references(() => usersPgTable.id, {}),

		deletedAt: timestamp("deleted_at", {}),

		eventId: uuid("event_id")
			.notNull()
			.references(() => eventsPgTable.id),

		id: uuid("id").notNull().primaryKey().defaultRandom(),

		name: text("name", {}).notNull(),

		parentSectionId: uuid("parent_section_id").references(
			(): AnyPgColumn => agendaSectionsPgTable.id,
		),

		position: integer("position").notNull(),

		updatedAt: timestamp("updated_at", {}),

		updaterId: uuid("updater_id").references(() => usersPgTable.id, {}),
	},
	(self) => ({
		index0: index().on(self.createdAt),
		index1: index().on(self.creatorId),
		index2: index().on(self.eventId),
		index3: index().on(self.name),
		index4: index().on(self.parentSectionId),
		uniqueIndex0: uniqueIndex().on(self.eventId, self.name),
		uniqueIndex1: uniqueIndex().on(self.eventId, self.position),
	}),
);

export type AgendaSectionPgType = InferSelectModel<
	typeof agendaSectionsPgTable
>;

export const agendaSectionsPgTableRelations = relations(
	agendaSectionsPgTable,
	({ many, one }) => ({
		agendaItemsWhereSection: many(agendaItemsPgTable, {
			relationName: "agenda_items.section_id:agenda_sections.id",
		}),

		agendaSectionsWhereParentSection: many(agendaSectionsPgTable, {
			relationName: "agenda_sections.id:agenda_sections.parent_section_id",
		}),

		creator: one(usersPgTable, {
			fields: [agendaSectionsPgTable.creatorId],
			references: [usersPgTable.id],
			relationName: "agenda_sections.creator_id:users.id",
		}),

		event: one(eventsPgTable, {
			fields: [agendaSectionsPgTable.eventId],
			references: [eventsPgTable.id],
			relationName: "agenda_sections.event_id:events.id",
		}),

		parentSection: one(agendaSectionsPgTable, {
			fields: [agendaSectionsPgTable.parentSectionId],
			references: [agendaSectionsPgTable.id],
			relationName: "agenda_sections.id:agenda_sections.parent_section_id",
		}),

		updater: one(usersPgTable, {
			fields: [agendaSectionsPgTable.updaterId],
			references: [usersPgTable.id],
			relationName: "agenda_sections.updater_id:users.id",
		}),
	}),
);
