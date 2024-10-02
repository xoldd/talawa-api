import { type InferSelectModel, relations } from "drizzle-orm";
import {
	index,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	uuid,
} from "drizzle-orm/pg-core";
import { advertisementTypePgEnum } from "../enums/advertisementType.js";
import { advertisementAttachmentsPgTable } from "./advertisementAttachments.js";
import { organizationsPgTable } from "./organizations.js";
import { usersPgTable } from "./users.js";

export const advertisementsPgTable = pgTable(
	"advertisements",
	{
		createdAt: timestamp("created_at", {}).notNull().defaultNow(),

		creatorId: uuid("creator_id").references(() => usersPgTable.id, {}),

		deletedAt: timestamp("deleted_at", {}),

		description: text("description"),

		endAt: timestamp("end_at", {}).notNull(),

		id: uuid("id").notNull().primaryKey().defaultRandom(),

		name: text("name", {}).notNull(),

		organizationId: uuid("organization_id")
			.notNull()
			.references(() => organizationsPgTable.id),

		startAt: timestamp("start_at", {}).notNull(),

		updatedAt: timestamp("updated_at", {}),

		updaterId: uuid("updater_id").references(() => usersPgTable.id, {}),

		type: advertisementTypePgEnum("type").notNull(),
	},
	(self) => ({
		index0: index().on(self.createdAt),
		index1: index().on(self.creatorId),
		index2: index().on(self.endAt),
		index3: index().on(self.name),
		index4: index().on(self.organizationId),
		index5: index().on(self.startAt),
		uniqueIndex0: uniqueIndex().on(self.name, self.organizationId),
	}),
);

export type AdvertisementPgType = InferSelectModel<
	typeof advertisementsPgTable
>;

export const advertisementsPgTableRelations = relations(
	advertisementsPgTable,
	({ many, one }) => ({
		advertisementAttachmentsWhereAdvertisement: many(
			advertisementAttachmentsPgTable,
			{
				relationName:
					"advertisement_attachments.advertisement_id:advertisements.id",
			},
		),

		creator: one(usersPgTable, {
			fields: [advertisementsPgTable.creatorId],
			references: [usersPgTable.id],
			relationName: "advertisements.creator_id:users.id",
		}),

		organization: one(organizationsPgTable, {
			fields: [advertisementsPgTable.organizationId],
			references: [organizationsPgTable.id],
			relationName: "advertisements.organization_id:organizations.id",
		}),

		updater: one(usersPgTable, {
			fields: [advertisementsPgTable.updaterId],
			references: [usersPgTable.id],
			relationName: "advertisements.updater_id:users.id",
		}),
	}),
);
