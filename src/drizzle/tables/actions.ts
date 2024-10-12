import { type InferSelectModel, relations } from "drizzle-orm";
import {
	boolean,
	index,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import { actionCategoriesTable } from "./actionCategories.js";
import { eventsTable } from "./events.js";
import { organizationsTable } from "./organizations.js";
import { usersTable } from "./users.js";

export const actionsTable = pgTable(
	"actions",
	{
		assignedAt: timestamp("assigned_at", {
			mode: "date",
		})
			.notNull()
			.defaultNow(),

		assigneeId: uuid("actor_id").references(() => usersTable.id),

		categoryId: uuid("category_id").references(() => actionCategoriesTable.id),

		completionAt: timestamp("completion_at", {
			mode: "date",
		}).notNull(),

		createdAt: timestamp("created_at", {
			mode: "date",
		})
			.notNull()
			.defaultNow(),

		creatorId: uuid("creator_id").references(() => usersTable.id, {}),

		deletedAt: timestamp("deleted_at", {
			mode: "date",
		}),

		eventId: uuid("event_id").references(() => eventsTable.id),

		id: uuid("id").notNull().primaryKey().defaultRandom(),

		isCompleted: boolean("is_completed").notNull().default(false),

		organizationId: uuid("organization_id")
			.notNull()
			.references(() => organizationsTable.id),

		postCompletionNotes: text("post_completion_notes"),

		preCompletionNotes: text("pre_completion_notes"),

		updatedAt: timestamp("updated_at", {
			mode: "date",
		}),

		updaterId: uuid("updater_id").references(() => usersTable.id, {}),
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

export type ActionPgType = InferSelectModel<typeof actionsTable>;

export const actionsTableRelations = relations(actionsTable, ({ one }) => ({
	assignee: one(usersTable, {
		fields: [actionsTable.assigneeId],
		references: [usersTable.id],
		relationName: "actions.assignee_id:users.id",
	}),

	category: one(actionCategoriesTable, {
		fields: [actionsTable.categoryId],
		references: [actionCategoriesTable.id],
		relationName: "action_categories.id:actions.category_id",
	}),

	creator: one(usersTable, {
		fields: [actionsTable.creatorId],
		references: [usersTable.id],
		relationName: "actions.creator_id:users.id",
	}),

	event: one(eventsTable, {
		fields: [actionsTable.eventId],
		references: [eventsTable.id],
		relationName: "actions.event_id:events.id",
	}),

	organization: one(organizationsTable, {
		fields: [actionsTable.organizationId],
		references: [organizationsTable.id],
		relationName: "actions.organization_id:organizations.id",
	}),

	updater: one(usersTable, {
		fields: [actionsTable.updaterId],
		references: [usersTable.id],
		relationName: "actions.updater_id:users.id",
	}),
}));
