import { type InferSelectModel, relations } from "drizzle-orm";
import {
	boolean,
	index,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import { actionCategoriesPgTable } from "./action_categories.js";
import { eventsPgTable } from "./events.js";
import { organizationsPgTable } from "./organizations.js";
import { usersPgTable } from "./users.js";

export const actionsPgTable = pgTable(
	"actions",
	{
		assignedAt: timestamp("assigned_at").notNull().defaultNow(),

		assigneeId: uuid("actor_id").references(() => usersPgTable.id),

		categoryId: uuid("category_id").references(
			() => actionCategoriesPgTable.id,
		),

		completionAt: timestamp("completion_at").notNull(),

		createdAt: timestamp("created_at", {}).notNull().defaultNow(),

		creatorId: uuid("creator_id").references(() => usersPgTable.id, {}),

		deletedAt: timestamp("deleted_at", {}),

		eventId: uuid("event_id").references(() => eventsPgTable.id),

		id: uuid("id").notNull().primaryKey().defaultRandom(),

		isCompleted: boolean("is_completed").notNull().default(false),

		organizationId: uuid("organization_id")
			.notNull()
			.references(() => organizationsPgTable.id),

		postCompletionNotes: text("post_completion_notes"),

		preCompletionNotes: text("pre_completion_notes"),

		updatedAt: timestamp("updated_at", {}),

		updaterId: uuid("updater_id").references(() => usersPgTable.id, {}),
	},
	(self) => ({
		index0: index().on(self.assignedAt),
		index1: index().on(self.assigneeId),
		index2: index().on(self.categoryId),
		index3: index().on(self.completionAt),
		index4: index().on(self.createdAt),
		index5: index().on(self.creatorId),
		index6: index().on(self.eventId),
		index7: index().on(self.isCompleted),
		index8: index().on(self.organizationId),
	}),
);

export type ActionPgType = InferSelectModel<typeof actionsPgTable>;

export const actionsPgTableRelations = relations(actionsPgTable, ({ one }) => ({
	assignee: one(usersPgTable, {
		fields: [actionsPgTable.assigneeId],
		references: [usersPgTable.id],
		relationName: "actions.assignee_id:users.id",
	}),

	category: one(actionCategoriesPgTable, {
		fields: [actionsPgTable.categoryId],
		references: [actionCategoriesPgTable.id],
		relationName: "action_categories.id:actions.category_id",
	}),

	creator: one(usersPgTable, {
		fields: [actionsPgTable.creatorId],
		references: [usersPgTable.id],
		relationName: "actions.creator_id:users.id",
	}),

	event: one(eventsPgTable, {
		fields: [actionsPgTable.eventId],
		references: [eventsPgTable.id],
		relationName: "actions.event_id:events.id",
	}),

	organization: one(organizationsPgTable, {
		fields: [actionsPgTable.organizationId],
		references: [organizationsPgTable.id],
		relationName: "actions.organization_id:organizations.id",
	}),

	updater: one(usersPgTable, {
		fields: [actionsPgTable.updaterId],
		references: [usersPgTable.id],
		relationName: "actions.updater_id:users.id",
	}),
}));
