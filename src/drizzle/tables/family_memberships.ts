import { type InferSelectModel, relations } from "drizzle-orm";
import {
	index,
	pgTable,
	primaryKey,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import { familyMembershipRolePgEnum } from "../enums/family_membership_role.js";
import { familiesPgTable } from "./families.js";
import { usersPgTable } from "./users.js";

export const familyMembershipsPgTable = pgTable(
	"family_memberships",
	{
		createdAt: timestamp("created_at", {}).notNull().defaultNow(),

		creatorId: uuid("creator_id").references(() => usersPgTable.id, {}),

		deletedAt: timestamp("deleted_at", {}),

		familyId: uuid("family_id")
			.notNull()
			.references(() => familiesPgTable.id),

		memberId: uuid("member_id").references(() => usersPgTable.id),

		role: familyMembershipRolePgEnum("role").notNull(),

		updatedAt: timestamp("updated_at", {}),

		updaterId: uuid("updater_id").references(() => usersPgTable.id, {}),
	},
	(self) => ({
		compositePrimaryKey: primaryKey({
			columns: [self.familyId, self.memberId],
		}),
		index0: index().on(self.createdAt),
		index1: index().on(self.creatorId),
		index2: index().on(self.familyId),
		index3: index().on(self.memberId),
	}),
);

export type FamilyMembershipPgType = InferSelectModel<
	typeof familyMembershipsPgTable
>;

export const familyMembershipsPgTableRelations = relations(
	familyMembershipsPgTable,
	({ one }) => ({
		creator: one(usersPgTable, {
			fields: [familyMembershipsPgTable.creatorId],
			references: [usersPgTable.id],
			relationName: "family_memberships.creator_id:users.id",
		}),

		family: one(familiesPgTable, {
			fields: [familyMembershipsPgTable.familyId],
			references: [familiesPgTable.id],
			relationName: "families.id:family_memberships.family_id",
		}),

		member: one(usersPgTable, {
			fields: [familyMembershipsPgTable.memberId],
			references: [usersPgTable.id],
			relationName: "family_memberships.member_id:users.id",
		}),

		updater: one(usersPgTable, {
			fields: [familyMembershipsPgTable.updaterId],
			references: [usersPgTable.id],
			relationName: "family_memberships.updater_id:users.id",
		}),
	}),
);
