import { type InferSelectModel, relations } from "drizzle-orm";
import {
	index,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	uuid,
} from "drizzle-orm/pg-core";
import { organizationsPgTable } from "./organizations.js";
import { tagAssignmentsPgTable } from "./tagAssignments.js";
import { tagFoldersPgTable } from "./tagFolders.js";
import { usersPgTable } from "./users.js";

export const tagsPgTable = pgTable(
	"tags",
	{
		createdAt: timestamp("created_at", {}).notNull().defaultNow(),

		creatorId: uuid("creator_id").references(() => usersPgTable.id, {}),

		deletedAt: timestamp("deleted_at", {}),

		folderId: uuid("folder_id").references(() => tagFoldersPgTable.id),

		id: uuid("id").notNull().primaryKey().defaultRandom(),

		name: text("name").notNull(),

		organizationId: uuid("organization_id")
			.notNull()
			.references(() => organizationsPgTable.id, {}),

		updatedAt: timestamp("updated_at", {}),

		updaterId: uuid("updater_id").references(() => usersPgTable.id),
	},
	(self) => ({
		index0: index().on(self.createdAt),
		index1: index().on(self.creatorId),
		index2: index().on(self.folderId),
		index3: index().on(self.name),
		index4: index().on(self.organizationId),
		uniqueIndex0: uniqueIndex().on(self.name, self.organizationId),
	}),
);

export type TagPgType = InferSelectModel<typeof tagsPgTable>;

export const tagsPgTableRelations = relations(tagsPgTable, ({ many, one }) => ({
	creator: one(usersPgTable, {
		fields: [tagsPgTable.creatorId],
		references: [usersPgTable.id],
		relationName: "tags.creator_id:users.id",
	}),

	folder: one(tagFoldersPgTable, {
		fields: [tagsPgTable.folderId],
		references: [tagFoldersPgTable.id],
		relationName: "tag_folders.id:tags.folder_id",
	}),

	organization: one(organizationsPgTable, {
		fields: [tagsPgTable.organizationId],
		references: [organizationsPgTable.id],
		relationName: "organizations.id:tags.organization_id",
	}),

	tagAssignmentsWhereTag: many(tagAssignmentsPgTable, {
		relationName: "tag_assignments.tag_id:tags.id",
	}),

	updater: one(usersPgTable, {
		fields: [tagsPgTable.updaterId],
		references: [usersPgTable.id],
		relationName: "tags.updater_id:users.id",
	}),
}));
