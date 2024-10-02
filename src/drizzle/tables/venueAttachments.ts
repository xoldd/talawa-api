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
import { venueAttachmentTypePgEnum } from "../enums/venueAttachmentType.js";
import { usersPgTable } from "./users.js";
import { venuesPgTable } from "./venues.js";

export const venueAttachmentsPgTable = pgTable(
	"venue_attachments",
	{
		createdAt: timestamp("created_at", {}).notNull().defaultNow(),

		creatorId: uuid("creator_id").references(() => usersPgTable.id, {}),

		deletedAt: timestamp("deleted_at", {}),

		position: integer("position").notNull(),

		type: venueAttachmentTypePgEnum("type").notNull(),

		updatedAt: timestamp("updated_at", {}),

		updaterId: uuid("updater_id").references(() => usersPgTable.id, {}),

		uri: text("uri", {}).notNull(),

		venueId: uuid("venue_id")
			.notNull()
			.references(() => venuesPgTable.id),
	},
	(self) => ({
		index0: index().on(self.createdAt),
		index1: index().on(self.creatorId),
		index2: index().on(self.venueId),
		uniqueIndex0: uniqueIndex().on(self.position, self.venueId),
	}),
);

export type VenueAttachmentPgType = InferSelectModel<
	typeof venueAttachmentsPgTable
>;

export const venueAttachmentsPgTableRelations = relations(
	venueAttachmentsPgTable,
	({ one }) => ({
		creator: one(usersPgTable, {
			fields: [venueAttachmentsPgTable.creatorId],
			references: [usersPgTable.id],
			relationName: "users.id:venue_attachments.creator_id",
		}),

		updater: one(usersPgTable, {
			fields: [venueAttachmentsPgTable.updaterId],
			references: [usersPgTable.id],
			relationName: "users.id:venue_attachments.updater_id",
		}),

		venue: one(venuesPgTable, {
			fields: [venueAttachmentsPgTable.venueId],
			references: [venuesPgTable.id],
			relationName: "venue_attachments.venue_id:venues.id",
		}),
	}),
);
