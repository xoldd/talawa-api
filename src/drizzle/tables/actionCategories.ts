import { type InferSelectModel, relations } from "drizzle-orm";
import {
	boolean,
	index,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	uuid,
} from "drizzle-orm/pg-core";
import { actionsPgTable } from "./actions.js";
import { organizationsPgTable } from "./organizations.js";
import { usersPgTable } from "./users.js";

export const actionCategoriesPgTable = pgTable(
	"action_categories",
	{
		createdAt: timestamp("created_at", {}).notNull().defaultNow(),

		creatorId: uuid("creator_id").references(() => usersPgTable.id, {}),

		deletedAt: timestamp("deleted_at", {}),

		description: text("description"),

		id: uuid("id").notNull().primaryKey().defaultRandom(),

		isDisabled: boolean("is_disabled").notNull().default(false),

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
		uniqueIndex0: uniqueIndex().on(self.name, self.organizationId),
	}),
);

export type ActionCategoryPgType = InferSelectModel<
	typeof actionCategoriesPgTable
>;

export const actionCategoriesPgTableRelations = relations(
	actionCategoriesPgTable,
	({ many, one }) => ({
		actionsWhereCategory: many(actionsPgTable, {
			relationName: "action_categories.id:actions.category_id",
		}),

		creator: one(usersPgTable, {
			fields: [actionCategoriesPgTable.creatorId],
			references: [usersPgTable.id],
			relationName: "action_categories.creator_id:users.id",
		}),

		organization: one(organizationsPgTable, {
			fields: [actionCategoriesPgTable.organizationId],
			references: [organizationsPgTable.id],
			relationName: "action_categories.organization_id:organizations.id",
		}),

		updater: one(usersPgTable, {
			fields: [actionCategoriesPgTable.updaterId],
			references: [usersPgTable.id],
			relationName: "action_categories.updater_id:users.id",
		}),
	}),
);
