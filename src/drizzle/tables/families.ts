import { type InferSelectModel, relations } from "drizzle-orm";
import {
	index,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	uuid,
} from "drizzle-orm/pg-core";
import { familyMembershipsPgTable } from "./familyMemberships.js";
import { organizationsPgTable } from "./organizations.js";
import { usersPgTable } from "./users.js";

export const familiesPgTable = pgTable(
	"families",
	{
		createdAt: timestamp("created_at", {}).notNull().defaultNow(),

		creatorId: uuid("creator_id").references(() => usersPgTable.id, {}),

		deletedAt: timestamp("deleted_at", {}),

		id: uuid("id").notNull().primaryKey().defaultRandom(),

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
		index3: index().on(self.organizationId),
		uniqueIndex0: uniqueIndex().on(self.name, self.organizationId),
	}),
);

export type FamilyPgType = InferSelectModel<typeof familiesPgTable>;

export const familiesPgTableRelations = relations(
	familiesPgTable,
	({ one, many }) => ({
		creator: one(usersPgTable, {
			fields: [familiesPgTable.creatorId],
			references: [usersPgTable.id],
			relationName: "families.creator_id:users.id",
		}),

		familyMembershipsWhereFamily: many(familyMembershipsPgTable, {
			relationName: "families.id:family_memberships.family_id",
		}),

		organization: one(organizationsPgTable, {
			fields: [familiesPgTable.organizationId],
			references: [organizationsPgTable.id],
			relationName: "families.organization_id:organizations.id",
		}),

		updater: one(usersPgTable, {
			fields: [familiesPgTable.updaterId],
			references: [usersPgTable.id],
			relationName: "families.updater_id:users.id",
		}),
	}),
);
