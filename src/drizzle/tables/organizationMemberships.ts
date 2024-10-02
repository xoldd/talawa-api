import { type InferSelectModel, relations } from "drizzle-orm";
import {
	boolean,
	index,
	pgTable,
	primaryKey,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import { organizationsPgTable } from "./organizations.js";
import { usersPgTable } from "./users.js";

export const organizationMembershipsPgTable = pgTable(
	"organization_memberships",
	{
		createdAt: timestamp("created_at", {}).notNull().defaultNow(),

		creatorId: uuid("creator_id").references(() => usersPgTable.id, {}),

		isAdministrator: boolean("is_administrator").notNull().default(false),

		isApproved: boolean("is_approved").notNull().default(false),

		isBlocked: boolean("is_blocked").notNull().default(false),

		reasonForBlock: text("reason_for_block"),

		memberId: uuid("member_id")
			.notNull()
			.references(() => usersPgTable.id, {}),

		organizationId: uuid("organization_id")
			.notNull()
			.references(() => organizationsPgTable.id, {}),

		updatedAt: timestamp("updated_at", {}),

		updaterId: uuid("updater_id").references(() => usersPgTable.id),
	},
	(self) => ({
		compositePrimaryKey: primaryKey({
			columns: [self.memberId, self.organizationId],
		}),
		index0: index().on(self.createdAt),
		index1: index().on(self.creatorId),
		index2: index().on(self.isAdministrator),
		index3: index().on(self.isApproved),
		index4: index().on(self.isBlocked),
		index5: index().on(self.memberId),
		index6: index().on(self.organizationId),
	}),
);

export type OrganizationMembershipPgType = InferSelectModel<
	typeof organizationMembershipsPgTable
>;

export const organizationMembershipsPgTableRelations = relations(
	organizationMembershipsPgTable,
	({ one }) => ({
		creator: one(usersPgTable, {
			fields: [organizationMembershipsPgTable.creatorId],
			references: [usersPgTable.id],
			relationName: "organization_memberships.creator_id:users.id",
		}),

		member: one(usersPgTable, {
			fields: [organizationMembershipsPgTable.memberId],
			references: [usersPgTable.id],
			relationName: "organization_memberships.member_id:users.id",
		}),

		organization: one(organizationsPgTable, {
			fields: [organizationMembershipsPgTable.organizationId],
			references: [organizationsPgTable.id],
			relationName:
				"organization_memberships.organization_id:organizations.id:",
		}),

		updater: one(usersPgTable, {
			fields: [organizationMembershipsPgTable.updaterId],
			references: [usersPgTable.id],
			relationName: "organization_memberships.updater_id:users.id",
		}),
	}),
);
