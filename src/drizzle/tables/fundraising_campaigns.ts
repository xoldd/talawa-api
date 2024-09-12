import { type InferSelectModel, relations } from "drizzle-orm";
import {
	index,
	integer,
	pgTable,
	text,
	timestamp,
	unique,
	uuid,
} from "drizzle-orm/pg-core";
import { fundsPgTable } from "./funds.js";
import { pledgesPgTable } from "./pledges.js";
import { usersPgTable } from "./users.js";

export const fundraisingCampaignsPgTable = pgTable(
	"fundraising_campaigns",
	{
		createdAt: timestamp("created_at", {}).notNull().defaultNow(),

		creatorId: uuid("creator_id").references(() => usersPgTable.id, {}),

		deletedAt: timestamp("deleted_at", {}),

		endAt: timestamp("end_at", {}).notNull(),

		fundId: uuid("fund_id")
			.notNull()
			.references(() => fundsPgTable.id),

		goalAmount: integer("goal_amount").notNull(),

		id: uuid("id").notNull().primaryKey().defaultRandom(),

		name: text("name", {}).notNull(),

		startAt: timestamp("start_at", {}).notNull(),

		updatedAt: timestamp("updated_at", {}),

		updaterId: uuid("updater_id").references(() => usersPgTable.id, {}),
	},
	(self) => ({
		index0: index().on(self.createdAt),
		index1: index().on(self.creatorId),
		index2: index().on(self.endAt),
		index3: index().on(self.fundId),
		index4: index().on(self.name),
		index5: index().on(self.startAt),
		unique0: unique().on(self.fundId, self.name),
	}),
);

export type FundraisingCampaignPgType = InferSelectModel<
	typeof fundraisingCampaignsPgTable
>;

export const fundraisingCampaignsPgTableRelations = relations(
	fundraisingCampaignsPgTable,
	({ many, one }) => ({
		creator: one(usersPgTable, {
			fields: [fundraisingCampaignsPgTable.creatorId],
			references: [usersPgTable.id],
			relationName: "fundraising_campaigns.creator_id:users.id",
		}),

		fund: one(fundsPgTable, {
			fields: [fundraisingCampaignsPgTable.fundId],
			references: [fundsPgTable.id],
			relationName: "fundraising_campaigns.fund_id:funds.id",
		}),

		pledgesWhereFundraisingCampaign: many(pledgesPgTable, {
			relationName: "fundraising_campaigns.id:pledges.fundraising_campaign_id",
		}),

		updater: one(usersPgTable, {
			fields: [fundraisingCampaignsPgTable.updaterId],
			references: [usersPgTable.id],
			relationName: "fundraising_campaigns.updater_id:users.id",
		}),
	}),
);
