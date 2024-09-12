import { type InferSelectModel, relations } from "drizzle-orm";
import {
	index,
	pgTable,
	primaryKey,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import { eventsPgTable } from "./events.js";
import { usersPgTable } from "./users.js";
import { venuesPgTable } from "./venues.js";

export const venueBookingsPgTable = pgTable(
	"venue_bookings",
	{
		createdAt: timestamp("created_at", {}).notNull().defaultNow(),

		creatorId: uuid("creator_id").references(() => usersPgTable.id, {}),

		deletedAt: timestamp("deleted_at", {}),

		eventId: uuid("event_id")
			.notNull()
			.references(() => eventsPgTable.id),

		updatedAt: timestamp("updated_at", {}),

		updaterId: uuid("updater_id").references(() => usersPgTable.id, {}),

		venueId: uuid("venue_id")
			.notNull()
			.references(() => venuesPgTable.id),
	},
	(self) => ({
		compositePrimaryKey: primaryKey({
			columns: [self.eventId, self.venueId],
		}),
		index0: index().on(self.createdAt),
		index1: index().on(self.creatorId),
		index2: index().on(self.eventId),
		index3: index().on(self.venueId),
	}),
);

export type VenueBookingPgType = InferSelectModel<typeof venueBookingsPgTable>;

export const venueBookingsPgTableRelations = relations(
	venueBookingsPgTable,
	({ one }) => ({
		creator: one(usersPgTable, {
			fields: [venueBookingsPgTable.creatorId],
			references: [usersPgTable.id],
			relationName: "users.id:venue_bookings.creator_id",
		}),

		event: one(eventsPgTable, {
			fields: [venueBookingsPgTable.eventId],
			references: [eventsPgTable.id],
			relationName: "events.id:venue_bookings.event_id",
		}),

		updater: one(usersPgTable, {
			fields: [venueBookingsPgTable.updaterId],
			references: [usersPgTable.id],
			relationName: "users.id:venue_bookings.updater_id",
		}),

		venue: one(venuesPgTable, {
			fields: [venueBookingsPgTable.venueId],
			references: [venuesPgTable.id],
			relationName: "venue_bookings.venue_id:venues.id",
		}),
	}),
);
