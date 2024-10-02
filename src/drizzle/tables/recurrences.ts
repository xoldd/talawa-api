import { type InferSelectModel, relations } from "drizzle-orm";
import {
	index,
	integer,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import { recurrenceTypePgEnum } from "../enums/recurrenceType.js";
import { eventsPgTable } from "./events.js";
import { usersPgTable } from "./users.js";

export const recurrencesPgTable = pgTable(
	"recurrences",
	{
		createdAt: timestamp("created_at", {}).notNull().defaultNow(),

		creatorId: uuid("creator_id").references(() => usersPgTable.id, {}),

		dayOfMonth: integer("day_of_month"),

		dayOfWeek: integer("day_of_week"),

		deletedAt: timestamp("deleted_at", {}),

		eventId: uuid("event_id")
			.notNull()
			.references(() => eventsPgTable.id),

		id: uuid("id").notNull().primaryKey().defaultRandom(),

		maxCount: integer("max_count"),

		monthOfYear: integer("month_of_year"),

		rruleString: text("rrule_string").notNull(),

		seperationCount: integer("seperation_count"),

		type: recurrenceTypePgEnum("recurrence_type"),

		updatedAt: timestamp("updated_at", {}),

		updaterId: uuid("updater_id").references(() => usersPgTable.id, {}),

		weekOfMonth: integer("week_of_month"),
	},
	(self) => ({
		index0: index().on(self.createdAt),
		index1: index().on(self.creatorId),
		index3: index().on(self.eventId),
	}),
);

export type RecurrencePgType = InferSelectModel<typeof recurrencesPgTable>;

export const recurrencesPgTableRelations = relations(
	recurrencesPgTable,
	({ one }) => ({
		creator: one(usersPgTable, {
			fields: [recurrencesPgTable.creatorId],
			references: [usersPgTable.id],
			relationName: "recurrences.creator_id:users.id",
		}),

		event: one(eventsPgTable, {
			fields: [recurrencesPgTable.eventId],
			references: [eventsPgTable.id],
			relationName: "recurrences.event_id:events.id",
		}),

		updater: one(usersPgTable, {
			fields: [recurrencesPgTable.updaterId],
			references: [usersPgTable.id],
			relationName: "recurrences.updater_id:users.id",
		}),
	}),
);
