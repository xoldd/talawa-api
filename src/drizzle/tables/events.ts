import { type InferSelectModel, relations } from "drizzle-orm";
import type { AnyPgColumn } from "drizzle-orm/pg-core";
import {
	boolean,
	date,
	index,
	pgTable,
	text,
	time,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import { actionsPgTable } from "./actions.js";
import { agendaSectionsPgTable } from "./agenda_sections.js";
import { eventAttachmentsPgTable } from "./event_attachments.js";
import { eventAttendancesPgTable } from "./event_attendances.js";
import { organizationsPgTable } from "./organizations.js";
import { usersPgTable } from "./users.js";
import { venueBookingsPgTable } from "./venue_bookings.js";
import { volunteerGroupsPgTable } from "./volunteer_groups.js";

export const eventsPgTable = pgTable(
	"events",
	{
		baseRecurringEventId: uuid("base_recurring_event_id").references(
			(): AnyPgColumn => eventsPgTable.id,
		),

		createdAt: timestamp("created_at", {}).notNull().defaultNow(),

		creatorId: uuid("creator_id").references(() => usersPgTable.id, {}),

		deletedAt: timestamp("deleted_at", {}),

		description: text("description"),

		endDate: date("end_date"),

		endTime: time("end_time"),

		id: uuid("id").notNull().primaryKey().defaultRandom(),

		isAllDay: boolean("is_all_day").notNull().default(false),

		isBaseRecurringEvent: boolean("is_base_recurring_event")
			.notNull()
			.default(false),

		isPrivate: boolean("is_private").notNull().default(false),

		isRecurring: boolean("is_recurring").notNull().default(false),

		isRecurringException: boolean("is_recurring_exception")
			.notNull()
			.default(false),

		isRegisterable: boolean("is_registerable").notNull().default(true),

		name: text("name", {}).notNull(),

		organizationId: uuid("organization_id")
			.notNull()
			.references(() => organizationsPgTable.id),

		startDate: date("start_date").notNull(),

		startTime: time("start_time"),

		updatedAt: timestamp("updated_at", {}),

		updaterId: uuid("updater_id").references(() => usersPgTable.id, {}),
	},
	(self) => ({
		index0: index().on(self.createdAt),
		index1: index().on(self.creatorId),
		index2: index().on(self.name),
		index3: index().on(self.organizationId),
	}),
);

export type EventPgType = InferSelectModel<typeof eventsPgTable>;

export const eventsPgTableRelations = relations(
	eventsPgTable,
	({ many, one }) => ({
		actionsWhereEvent: many(actionsPgTable, {
			relationName: "actions.event_id:events.id",
		}),

		agendaSectionsWhereEvent: many(agendaSectionsPgTable, {
			relationName: "agenda_sections.event_id:events.id",
		}),

		creator: one(usersPgTable, {
			fields: [eventsPgTable.creatorId],
			references: [usersPgTable.id],
			relationName: "events.creator_id:users.id",
		}),

		eventAttachmentsWhereEvent: many(eventAttachmentsPgTable, {
			relationName: "event_attachments.event_id:events.id",
		}),

		eventAttendancesWhereEvent: many(eventAttendancesPgTable, {
			relationName: "event_attendances.event_id:events.id",
		}),

		updater: one(usersPgTable, {
			fields: [eventsPgTable.updaterId],
			references: [usersPgTable.id],
			relationName: "events.updater_id:users.id",
		}),

		venueBookingsWhereEvent: many(venueBookingsPgTable, {
			relationName: "events.id:venue_bookings.event_id",
		}),

		volunteerGroupsWhereEvent: many(volunteerGroupsPgTable, {
			relationName: "events.id:volunteer_groups.event_id",
		}),
	}),
);
