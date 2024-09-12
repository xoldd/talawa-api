import { type InferSelectModel, relations } from "drizzle-orm";
import {
	index,
	integer,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	uuid,
} from "drizzle-orm/pg-core";
import { organizationsPgTable } from "./organizations.js";
import { usersPgTable } from "./users.js";
import { venueAttachmentsPgTable } from "./venue_attachments.js";
import { venueBookingsPgTable } from "./venue_bookings.js";

export const venuesPgTable = pgTable(
	"venues",
	{
		capacity: integer("capacity").notNull(),

		createdAt: timestamp("created_at", {}).notNull().defaultNow(),

		creatorId: uuid("creator_id").references(() => usersPgTable.id, {}),

		deletedAt: timestamp("deleted_at", {}),

		description: text("description", {}),

		id: uuid("id").notNull().primaryKey().defaultRandom(),

		name: text("name", {}).notNull(),

		organizationId: uuid("organization_id")
			.notNull()
			.references(() => organizationsPgTable.id),

		updatedAt: timestamp("updated_at", {}),

		updaterId: uuid("updater_id").references(() => usersPgTable.id, {}),
	},
	(self) => ({
		index0: index().on(self.createdAt),
		index1: index().on(self.creatorId),
		index2: index().on(self.name),
		index3: index().on(self.organizationId),
		uniqueIndex0: uniqueIndex().on(self.name, self.organizationId),
	}),
);

export type VenuePgType = InferSelectModel<typeof venuesPgTable>;

export const venuesPgTableRelations = relations(
	venuesPgTable,
	({ many, one }) => ({
		creator: one(usersPgTable, {
			fields: [venuesPgTable.creatorId],
			references: [usersPgTable.id],
			relationName: "users.id:venues.creator_id",
		}),

		organization: one(organizationsPgTable, {
			fields: [venuesPgTable.organizationId],
			references: [organizationsPgTable.id],
			relationName: "organizations.id:venues.organization_id",
		}),

		updater: one(usersPgTable, {
			fields: [venuesPgTable.updaterId],
			references: [usersPgTable.id],
			relationName: "users.id:venues.updater_id",
		}),

		venueAttachmentsWhereVenue: many(venueAttachmentsPgTable, {
			relationName: "venue_attachments.venue_id:venues.id",
		}),

		venueBookingsWhereVenue: many(venueBookingsPgTable, {
			relationName: "venue_bookings.venue_id:venues.id",
		}),
	}),
);
