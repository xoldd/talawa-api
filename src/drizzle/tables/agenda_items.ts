import { type InferSelectModel, relations, sql } from "drizzle-orm";
import {
	index,
	integer,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	uuid,
} from "drizzle-orm/pg-core";
import { agendaItemTypePgEnum } from "../enums/agenda_item_type.js";
import { agendaSectionsPgTable } from "./agenda_sections.js";
import { eventsPgTable } from "./events.js";
import { usersPgTable } from "./users.js";

export const agendaItemsPgTable = pgTable(
	"agenda_items",
	{
		createdAt: timestamp("created_at", {}).notNull().defaultNow(),

		creatorId: uuid("creator_id").references(() => usersPgTable.id, {}),

		deletedAt: timestamp("deleted_at", {}),

		description: text("description"),

		duration: text("duration"),

		eventId: uuid("event_id")
			.notNull()
			.references(() => eventsPgTable.id),

		id: uuid("id").notNull().primaryKey().defaultRandom(),

		key: text("key"),

		name: text("name", {}),

		position: integer("position").notNull(),

		sectionId: uuid("section_id")
			.notNull()
			.references(() => agendaSectionsPgTable.id),

		type: agendaItemTypePgEnum("type").notNull(),

		updatedAt: timestamp("updated_at", {}),

		updaterId: uuid("updater_id").references(() => usersPgTable.id, {}),
	},
	(self) => ({
		index0: index().on(self.createdAt),
		index1: index().on(self.creatorId),
		index2: index().on(self.deletedAt),
		index3: index().on(self.name),
		index4: index().on(self.position),
		index5: index().on(self.sectionId),
		index6: index().on(self.type),
		uniqueIndex0: uniqueIndex()
			.on(self.eventId, self.position)
			.where(sql`where ${self.sectionId} is null`),
		uniqueIndex1: uniqueIndex()
			.on(self.position, self.sectionId)
			.where(sql`where ${self.sectionId} is not null`),
	}),
);

export type AgendaItemPgType = InferSelectModel<typeof agendaItemsPgTable>;

export const agendaItemsPgTableRelations = relations(
	agendaItemsPgTable,
	({ one }) => ({
		creator: one(usersPgTable, {
			fields: [agendaItemsPgTable.creatorId],
			references: [usersPgTable.id],
			relationName: "agenda_items.creator_id:users.id",
		}),

		event: one(eventsPgTable, {
			fields: [agendaItemsPgTable.eventId],
			references: [eventsPgTable.id],
			relationName: "agenda_items.event_id:events.id",
		}),

		section: one(agendaSectionsPgTable, {
			fields: [agendaItemsPgTable.sectionId],
			references: [agendaSectionsPgTable.id],
			relationName: "agenda_items.section_id:agenda_sections.id",
		}),

		updater: one(usersPgTable, {
			fields: [agendaItemsPgTable.updaterId],
			references: [usersPgTable.id],
			relationName: "agenda_items.updater_id:users.id",
		}),
	}),
);
