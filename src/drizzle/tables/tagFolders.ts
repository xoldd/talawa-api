import { type InferSelectModel, relations } from "drizzle-orm";
import type { AnyPgColumn } from "drizzle-orm/pg-core";
import {
	index,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	uuid,
} from "drizzle-orm/pg-core";
import { organizationsPgTable } from "./organizations.js";
import { tagsPgTable } from "./tags.js";
import { usersPgTable } from "./users.js";

export const tagFoldersPgTable = pgTable(
	"tag_folders",
	{
		createdAt: timestamp("created_at", {}).notNull().defaultNow(),

		creatorId: uuid("creator_id").references(() => usersPgTable.id, {}),

		deletedAt: timestamp("deleted_at", {}),

		id: uuid("id").notNull().primaryKey().defaultRandom(),

		name: text("name").notNull(),

		organizationId: uuid("organization_id")
			.notNull()
			.references(() => organizationsPgTable.id, {}),

		parentFolderId: uuid("parent_folder_id").references(
			(): AnyPgColumn => tagFoldersPgTable.id,
		),

		updatedAt: timestamp("updated_at", {}),

		updaterId: uuid("updater_id").references(() => usersPgTable.id),
	},
	(self) => ({
		index0: index().on(self.createdAt),
		index1: index().on(self.creatorId),
		index2: index().on(self.name),
		index3: index().on(self.organizationId),
		uniqueIndex0: uniqueIndex().on(self.name, self.organizationId),
	}),
);

export type TagFolderPgType = InferSelectModel<typeof tagFoldersPgTable>;

export const tagFoldersPgTableRelations = relations(
	tagFoldersPgTable,
	({ many, one }) => ({
		creator: one(usersPgTable, {
			fields: [tagFoldersPgTable.creatorId],
			references: [usersPgTable.id],
			relationName: "tag_folders.creator_id:users.id",
		}),

		organization: one(organizationsPgTable, {
			fields: [tagFoldersPgTable.organizationId],
			references: [organizationsPgTable.id],
			relationName: "organizations.id:tag_folders.organization_id",
		}),

		parentFolder: one(tagFoldersPgTable, {
			fields: [tagFoldersPgTable.parentFolderId],
			references: [tagFoldersPgTable.id],
			relationName: "tag_folders.id:tag_folders.parent_folder_id",
		}),

		tagFoldersWhereParentFolder: many(tagFoldersPgTable, {
			relationName: "tag_folders.id:tag_folders.parent_folder_id",
		}),

		tagsWhereFolder: many(tagsPgTable, {
			relationName: "tag_folders.id:tags.folder_id",
		}),

		updater: one(usersPgTable, {
			fields: [tagFoldersPgTable.updaterId],
			references: [usersPgTable.id],
			relationName: "tag_folders.updater_id:users.id",
		}),
	}),
);
