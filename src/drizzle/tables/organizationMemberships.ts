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
import { organizationMembershipRole } from "../enums";
import { organizationsTable } from "./organizations";
import { usersTable } from "./users";

export const organizationMembershipsTable = pgTable(
	"organization_memberships",
	{
		createdAt: timestamp("created_at", {
			mode: "date",
			precision: 3,
			withTimezone: true,
		})
			.notNull()
			.defaultNow(),

		creatorId: uuid("creator_id").references(() => usersTable.id, {}),

		isApproved: boolean("is_approved").notNull().default(false),

		isBlocked: boolean("is_blocked").notNull().default(false),

		memberId: uuid("member_id")
			.notNull()
			.references(() => usersTable.id, {}),

		organizationId: uuid("organization_id")
			.notNull()
			.references(() => organizationsTable.id, {}),

		reasonForBlock: text("reason_for_block"),

		/**
		 * Role assigned to the member.
		 */
		role: text("role", {
			enum: organizationMembershipRole.options,
		})
			.notNull()
			.default("base"),

		updatedAt: timestamp("updated_at", {
			mode: "date",
			precision: 3,
			withTimezone: true,
		}),

		updaterId: uuid("updater_id").references(() => usersTable.id),
	},
	(self) => ({
		compositePrimaryKey: primaryKey({
			columns: [self.memberId, self.organizationId],
		}),
		index0: index().on(self.createdAt),
		index1: index().on(self.creatorId),
		index3: index().on(self.isApproved),
		index4: index().on(self.isBlocked),
		index5: index().on(self.memberId),
		index6: index().on(self.organizationId),
	}),
);

export type OrganizationMembershipPgType = InferSelectModel<
	typeof organizationMembershipsTable
>;

export const organizationMembershipsTableRelations = relations(
	organizationMembershipsTable,
	({ one }) => ({
		creator: one(usersTable, {
			fields: [organizationMembershipsTable.creatorId],
			references: [usersTable.id],
			relationName: "organization_memberships.creator_id:users.id",
		}),

		member: one(usersTable, {
			fields: [organizationMembershipsTable.memberId],
			references: [usersTable.id],
			relationName: "organization_memberships.member_id:users.id",
		}),

		organization: one(organizationsTable, {
			fields: [organizationMembershipsTable.organizationId],
			references: [organizationsTable.id],
			relationName: "organization_memberships.organization_id:organizations.id",
		}),

		updater: one(usersTable, {
			fields: [organizationMembershipsTable.updaterId],
			references: [usersTable.id],
			relationName: "organization_memberships.updater_id:users.id",
		}),
	}),
);
