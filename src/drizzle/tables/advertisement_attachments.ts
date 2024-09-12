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
import { advertisementAttachmentTypePgEnum } from "../enums/advertisement_attachment_type.js";
import { advertisementsPgTable } from "./advertisements.js";
import { usersPgTable } from "./users.js";

export const advertisementAttachmentsPgTable = pgTable(
	"advertisement_attachments",
	{
		advertisementId: uuid("advertisement_id")
			.notNull()
			.references(() => advertisementsPgTable.id),

		createdAt: timestamp("created_at", {}).notNull().defaultNow(),

		creatorId: uuid("creator_id").references(() => usersPgTable.id, {}),

		deletedAt: timestamp("deleted_at", {}),

		position: integer("position").notNull(),

		updatedAt: timestamp("updated_at", {}),

		updaterId: uuid("updater_id").references(() => usersPgTable.id, {}),

		uri: text("uri", {}).notNull(),

		type: advertisementAttachmentTypePgEnum("type").notNull(),
	},
	(self) => ({
		index0: index().on(self.advertisementId),
		index1: index().on(self.createdAt),
		index2: index().on(self.creatorId),
		uniqueIndex0: uniqueIndex().on(self.advertisementId, self.position),
	}),
);

export type AdvertisementAttachmentPgType = InferSelectModel<
	typeof advertisementAttachmentsPgTable
>;

export const advertisementAttachmentsPgTableRelations = relations(
	advertisementAttachmentsPgTable,
	({ one }) => ({
		advertisement: one(advertisementsPgTable, {
			fields: [advertisementAttachmentsPgTable.advertisementId],
			references: [advertisementsPgTable.id],
			relationName:
				"advertisement_attachments.advertisement_id:advertisements.id",
		}),

		creator: one(usersPgTable, {
			fields: [advertisementAttachmentsPgTable.creatorId],
			references: [usersPgTable.id],
			relationName: "advertisement_attachments.creator_id:users.id",
		}),

		updater: one(usersPgTable, {
			fields: [advertisementAttachmentsPgTable.updaterId],
			references: [usersPgTable.id],
			relationName: "advertisement_attachments.updater_id:users.id",
		}),
	}),
);
