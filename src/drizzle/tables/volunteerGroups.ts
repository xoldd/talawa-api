import { type InferSelectModel, relations } from "drizzle-orm";
import {
	index,
	integer,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	uuid,
} from "drizzle-orm/pg-core";
import { eventsPgTable } from "./events.js";
import { usersPgTable } from "./users.js";
import { volunteerGroupAssignmentsPgTable } from "./volunteerGroupAssignments.js";

export const volunteerGroupsPgTable = pgTable(
	"volunteer_groups",
	{
		createdAt: timestamp("created_at", {}).notNull().defaultNow(),

		creatorId: uuid("creator_id").references(() => usersPgTable.id, {}),

		deletedAt: timestamp("deleted_at", {}),

		eventId: uuid("event_id")
			.notNull()
			.references(() => eventsPgTable.id, {}),

		id: uuid("id").notNull().primaryKey().defaultRandom(),

		leaderId: uuid("leader_id").references(() => usersPgTable.id),

		maxVolunteerCount: integer("max_volunteer_count").notNull(),

		name: text("name").notNull(),

		updatedAt: timestamp("updated_at", {}),

		updaterId: uuid("updater_id").references(() => usersPgTable.id),
	},
	(self) => ({
		index0: index().on(self.createdAt),
		index1: index().on(self.creatorId),
		index2: index().on(self.eventId),
		index3: index().on(self.leaderId),
		index4: index().on(self.name),
		uniqueIndex0: uniqueIndex().on(self.eventId, self.name),
	}),
);

export type VolunteerGroupPgType = InferSelectModel<
	typeof volunteerGroupsPgTable
>;

export const volunteerGroupsPgTableRelations = relations(
	volunteerGroupsPgTable,
	({ many, one }) => ({
		creator: one(usersPgTable, {
			fields: [volunteerGroupsPgTable.creatorId],
			references: [usersPgTable.id],
			relationName: "users.id:volunteer_groups.creator_id",
		}),

		event: one(eventsPgTable, {
			fields: [volunteerGroupsPgTable.eventId],
			references: [eventsPgTable.id],
			relationName: "events.id:volunteer_groups.event_id",
		}),

		leader: one(usersPgTable, {
			fields: [volunteerGroupsPgTable.leaderId],
			references: [usersPgTable.id],
			relationName: "users.id:volunteer_groups.leader_id",
		}),

		volunteerGroupAssignmentsWhereGroup: many(
			volunteerGroupAssignmentsPgTable,
			{
				relationName:
					"volunteer_group_assignments.group_id:volunteer_groups.id",
			},
		),

		updater: one(usersPgTable, {
			fields: [volunteerGroupsPgTable.updaterId],
			references: [usersPgTable.id],
			relationName: "users.id:volunteer_groups.updater_id",
		}),
	}),
);
