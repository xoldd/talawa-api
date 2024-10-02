import { type InferSelectModel, relations } from "drizzle-orm";
import { index, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { eventAttendeeRegistrationInviteStatusPgEnum } from "../enums/eventAttendeeRegistrationInviteStatus.js";
import { eventsPgTable } from "./events.js";
import { usersPgTable } from "./users.js";

export const eventAttendancesPgTable = pgTable(
	"event_attendances",
	{
		attendeeId: uuid("attendee_id").references(() => usersPgTable.id),

		checkInAt: timestamp("check_in_at"),

		checkOutAt: timestamp("check_out_at"),

		createdAt: timestamp("created_at", {}).notNull().defaultNow(),

		creatorId: uuid("creator_id").references(() => usersPgTable.id, {}),

		deletedAt: timestamp("deleted_at", {}),

		eventId: uuid("event_id")
			.notNull()
			.references(() => eventsPgTable.id),

		inviteStatus: eventAttendeeRegistrationInviteStatusPgEnum("invite_status"),

		updatedAt: timestamp("updated_at", {}),

		updaterId: uuid("updater_id").references(() => usersPgTable.id),
	},
	(self) => ({
		index0: index().on(self.attendeeId),
		index1: index().on(self.checkInAt),
		index2: index().on(self.checkOutAt),
		index3: index().on(self.createdAt),
		index4: index().on(self.creatorId),
		index5: index().on(self.eventId),
		index6: index().on(self.inviteStatus),
	}),
);

export type EventAttendancePgType = InferSelectModel<
	typeof eventAttendancesPgTable
>;

export const eventAttendancesPgTableRelations = relations(
	eventAttendancesPgTable,
	({ one }) => ({
		attendee: one(usersPgTable, {
			fields: [eventAttendancesPgTable.attendeeId],
			references: [usersPgTable.id],
			relationName: "event_attendances.attendee_id:users.id",
		}),

		creator: one(usersPgTable, {
			fields: [eventAttendancesPgTable.creatorId],
			references: [usersPgTable.id],
			relationName: "event_attendances.creator_id:users.id",
		}),

		event: one(eventsPgTable, {
			fields: [eventAttendancesPgTable.eventId],
			references: [eventsPgTable.id],
			relationName: "event_attendances.event_id:events.id",
		}),

		updater: one(usersPgTable, {
			fields: [eventAttendancesPgTable.updaterId],
			references: [usersPgTable.id],
			relationName: "event_attendances.updater_id:users.id",
		}),
	}),
);
