import { type InferSelectModel, relations } from "drizzle-orm";
import {
	index,
	pgTable,
	primaryKey,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import { volunteerGroupAssignmentInviteStatusPgEnum } from "../enums/volunteer_group_assignment_invite_status.js";
import { usersPgTable } from "./users.js";
import { volunteerGroupsPgTable } from "./volunteer_groups.js";

export const volunteerGroupAssignmentsPgTable = pgTable(
	"volunteer_group_assignments",
	{
		assigneeId: uuid("assignee_id")
			.notNull()
			.references(() => usersPgTable.id, {}),

		createdAt: timestamp("created_at", {}).notNull().defaultNow(),

		creatorId: uuid("creator_id").references(() => usersPgTable.id, {}),

		deletedAt: timestamp("deleted_at", {}),

		groupId: uuid("group_id")
			.notNull()
			.references(() => volunteerGroupsPgTable.id, {}),

		inviteStatus: volunteerGroupAssignmentInviteStatusPgEnum("invite_status"),

		updatedAt: timestamp("updated_at", {}),

		updaterId: uuid("updater_id").references(() => usersPgTable.id),
	},
	(self) => ({
		compositePrimaryKey: primaryKey({
			columns: [self.assigneeId, self.groupId],
		}),
		index0: index().on(self.createdAt),
		index1: index().on(self.creatorId),
		index2: index().on(self.groupId),
	}),
);

export type VolunteerGroupAssignmentPgType = InferSelectModel<
	typeof volunteerGroupAssignmentsPgTable
>;

export const volunteerGroupAssignmentsPgTableRelations = relations(
	volunteerGroupAssignmentsPgTable,
	({ one }) => ({
		assignee: one(usersPgTable, {
			fields: [volunteerGroupAssignmentsPgTable.assigneeId],
			references: [usersPgTable.id],
			relationName: "users.id:volunteer_group_assignments.assignee_id",
		}),

		creator: one(usersPgTable, {
			fields: [volunteerGroupAssignmentsPgTable.creatorId],
			references: [usersPgTable.id],
			relationName: "users.id:volunteer_group_assignments.creator_id",
		}),

		group: one(volunteerGroupsPgTable, {
			fields: [volunteerGroupAssignmentsPgTable.groupId],
			references: [volunteerGroupsPgTable.id],
			relationName: "volunteer_group_assignments.group_id:volunteer_groups.id",
		}),

		updater: one(usersPgTable, {
			fields: [volunteerGroupAssignmentsPgTable.updaterId],
			references: [usersPgTable.id],
			relationName: "users.id:volunteer_group_assignments.updater_id",
		}),
	}),
);
