import { type InferSelectModel, relations } from "drizzle-orm";
import {
	index,
	pgTable,
	primaryKey,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import { tagsPgTable } from "./tags.js";
import { usersPgTable } from "./users.js";

export const tagAssignmentsPgTable = pgTable(
	"tag_assignments",
	{
		assigneeId: uuid("assignee_id")
			.notNull()
			.references(() => usersPgTable.id, {}),

		createdAt: timestamp("created_at", {}).notNull().defaultNow(),

		creatorId: uuid("creator_id").references(() => usersPgTable.id, {}),

		deletedAt: timestamp("deleted_at", {}),

		tagId: uuid("tag_id").references(() => tagsPgTable.id),

		updatedAt: timestamp("updated_at", {}),

		updaterId: uuid("updater_id").references(() => usersPgTable.id),
	},
	(self) => ({
		compositePrimaryKey: primaryKey({
			columns: [self.assigneeId, self.tagId],
		}),
		index0: index().on(self.assigneeId),
		index1: index().on(self.createdAt),
		index2: index().on(self.creatorId),
		index3: index().on(self.tagId),
	}),
);

export type TagAssignmentPgType = InferSelectModel<
	typeof tagAssignmentsPgTable
>;

export const tagAssignmentsPgTableRelations = relations(
	tagAssignmentsPgTable,
	({ one }) => ({
		assignee: one(usersPgTable, {
			fields: [tagAssignmentsPgTable.assigneeId],
			references: [usersPgTable.id],
			relationName: "tag_assignments.assignee_id:users.id",
		}),

		creator: one(usersPgTable, {
			fields: [tagAssignmentsPgTable.creatorId],
			references: [usersPgTable.id],
			relationName: "tag_assignments.creator_id:users.id",
		}),

		tag: one(tagsPgTable, {
			fields: [tagAssignmentsPgTable.tagId],
			references: [tagsPgTable.id],
			relationName: "tag_assignments.tag_id:tags.id",
		}),

		updater: one(usersPgTable, {
			fields: [tagAssignmentsPgTable.updaterId],
			references: [usersPgTable.id],
			relationName: "tag_assignments.updater_id:users.id",
		}),
	}),
);
