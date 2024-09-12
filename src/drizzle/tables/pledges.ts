import { type InferSelectModel, relations } from "drizzle-orm";
import {
	boolean,
	index,
	integer,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import { fundraisingCampaignsPgTable } from "./fundraising_campaigns.js";
import { usersPgTable } from "./users.js";

export const pledgesPgTable = pgTable(
	"pledges",
	{
		amount: integer("amount").notNull(),

		createdAt: timestamp("created_at", {}).notNull().defaultNow(),

		creatorId: uuid("creator_id").references(() => usersPgTable.id, {}),

		deletedAt: timestamp("deleted_at", {}),

		endAt: timestamp("end_at", {}).notNull(),

		fundraisingCampaignId: uuid("fundraising_campaign_id")
			.notNull()
			.references(() => fundraisingCampaignsPgTable.id),

		id: uuid("id").notNull().primaryKey().defaultRandom(),

		isIncludeFamily: boolean("is_include_family").notNull().default(false),

		notes: text("notes"),

		pledgerId: uuid("pledger_id").references(() => usersPgTable.id),

		startAt: timestamp("start_at", {}).notNull(),

		updatedAt: timestamp("updated_at", {}),

		updaterId: uuid("updater_id").references(() => usersPgTable.id, {}),
	},
	(self) => ({
		index0: index().on(self.createdAt),
		index1: index().on(self.creatorId),
		index2: index().on(self.endAt),
		index3: index().on(self.fundraisingCampaignId),
		index4: index().on(self.pledgerId),
		index5: index().on(self.startAt),
	}),
);

export type PledgePgType = InferSelectModel<typeof pledgesPgTable>;

export const pledgesPgTableRelations = relations(pledgesPgTable, ({ one }) => ({
	creator: one(usersPgTable, {
		fields: [pledgesPgTable.creatorId],
		references: [usersPgTable.id],
		relationName: "pledges.creator_id:users.id",
	}),

	fundraisingCampaign: one(fundraisingCampaignsPgTable, {
		fields: [pledgesPgTable.fundraisingCampaignId],
		references: [fundraisingCampaignsPgTable.id],
		relationName: "fundraising_campaigns.id:pledges.fundraising_campaign_id",
	}),

	pledger: one(usersPgTable, {
		fields: [pledgesPgTable.pledgerId],
		references: [usersPgTable.id],
		relationName: "pledges.pledger_id:users.id",
	}),

	updater: one(usersPgTable, {
		fields: [pledgesPgTable.updaterId],
		references: [usersPgTable.id],
		relationName: "pledges.updater_id:users.id",
	}),
}));
