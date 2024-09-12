import { type InferSelectModel, relations } from "drizzle-orm";
import {
	boolean,
	index,
	pgTable,
	text,
	timestamp,
	unique,
	uuid,
} from "drizzle-orm/pg-core";
import { fundraisingCampaignsPgTable } from "./fundraising_campaigns.js";
import { organizationsPgTable } from "./organizations.js";
import { usersPgTable } from "./users.js";

export const fundsPgTable = pgTable(
	"funds",
	{
		createdAt: timestamp("created_at", {}).notNull().defaultNow(),

		creatorId: uuid("creator_id").references(() => usersPgTable.id, {}),

		deletedAt: timestamp("deleted_at", {}),

		id: uuid("id").notNull().primaryKey().defaultRandom(),

		isArchived: boolean("is_archived").notNull().default(false),

		isDefault: boolean("is_default").notNull().default(false),

		isTaxDeductible: boolean("is_tax_deductibe").notNull().default(false),

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
		unique0: unique().on(self.name, self.organizationId),
	}),
);

export type FundPgType = InferSelectModel<typeof fundsPgTable>;

export const fundsPgTableRelations = relations(
	fundsPgTable,
	({ one, many }) => ({
		creator: one(usersPgTable, {
			fields: [fundsPgTable.creatorId],
			references: [usersPgTable.id],
			relationName: "funds.creator_id:users.id",
		}),

		fundraisingCampaignsWhereFund: many(fundraisingCampaignsPgTable, {
			relationName: "fundraising_campaigns.fund_id:funds.id",
		}),

		organization: one(organizationsPgTable, {
			fields: [fundsPgTable.organizationId],
			references: [organizationsPgTable.id],
			relationName: "funds.organization_id:organizations.id",
		}),

		updater: one(usersPgTable, {
			fields: [fundsPgTable.updaterId],
			references: [usersPgTable.id],
			relationName: "funds.updater_id:users.id",
		}),
	}),
);
