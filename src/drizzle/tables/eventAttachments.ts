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
import { eventAttachmentTypePgEnum } from "../enums/eventAttachmentType.js";
import { eventsPgTable } from "./events.js";
import { usersPgTable } from "./users.js";

export const eventAttachmentsPgTable = pgTable(
	"event_attachments",
	{
		createdAt: timestamp("created_at", {}).notNull().defaultNow(),

		creatorId: uuid("creator_id").references(() => usersPgTable.id, {}),

		deletedAt: timestamp("deleted_at", {}),

		eventId: uuid("event_id")
			.notNull()
			.references(() => eventsPgTable.id),

		position: integer("position").notNull(),

		updatedAt: timestamp("updated_at", {}),

		updaterId: uuid("updater_id").references(() => usersPgTable.id, {}),

		uri: text("uri", {}).notNull(),

		type: eventAttachmentTypePgEnum("type").notNull(),
	},
	(self) => ({
		index0: index().on(self.eventId),
		index1: index().on(self.createdAt),
		index2: index().on(self.creatorId),
		uniqueIndex0: uniqueIndex().on(self.eventId, self.position),
	}),
);

export type EventAttachmentPgType = InferSelectModel<
	typeof eventAttachmentsPgTable
>;

export const eventAttachmentsPgTableRelations = relations(
	eventAttachmentsPgTable,
	({ one }) => ({
		creator: one(usersPgTable, {
			fields: [eventAttachmentsPgTable.creatorId],
			references: [usersPgTable.id],
			relationName: "event_attachments.creator_id:users.id",
		}),

		event: one(eventsPgTable, {
			fields: [eventAttachmentsPgTable.eventId],
			references: [eventsPgTable.id],
			relationName: "event_attachments.event_id:events.id",
		}),

		updater: one(usersPgTable, {
			fields: [eventAttachmentsPgTable.updaterId],
			references: [usersPgTable.id],
			relationName: "event_attachments.updater_id:users.id",
		}),
	}),
);
