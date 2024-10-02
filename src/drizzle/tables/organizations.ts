import { type InferSelectModel, relations } from "drizzle-orm";
import {
	boolean,
	index,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import { iso3166Alpha2CountryCodePgEnum } from "../enums/iso3166Alpha2CountryCode.js";
import { actionCategoriesPgTable } from "./actionCategories.js";
import { actionsPgTable } from "./actions.js";
import { advertisementsPgTable } from "./advertisements.js";
import { familiesPgTable } from "./families.js";
import { fundsPgTable } from "./funds.js";
import { organizationMembershipsPgTable } from "./organizationMemberships.js";
import { postsPgTable } from "./posts.js";
import { tagFoldersPgTable } from "./tagFolders.js";
import { tagsPgTable } from "./tags.js";
import { usersPgTable } from "./users.js";
import { venuesPgTable } from "./venues.js";

export const organizationsPgTable = pgTable(
	"organizations",
	{
		addressLine1: text("address_line_1"),

		addressLine2: text("address_line_2"),

		avatarURI: text("avatar_uri"),

		city: text("city"),

		countryCode: iso3166Alpha2CountryCodePgEnum("country_code"),

		createdAt: timestamp("created_at", {}).notNull().defaultNow(),

		creatorId: uuid("creator_id").references(() => usersPgTable.id, {}),

		description: text("description"),

		id: uuid("id").notNull().primaryKey().defaultRandom(),

		isPrivate: boolean("is_private").notNull().default(false),

		isVisible: boolean("is_visible").notNull().default(true),

		name: text("name", {}).notNull().unique(),

		postalCode: text("postal_code"),

		state: text("state"),

		updatedAt: timestamp("updated_at", {}),

		updaterId: uuid("updater_id").references(() => usersPgTable.id),
	},
	(self) => ({
		index0: index().on(self.createdAt),
		index1: index().on(self.creatorId),
		index2: index().on(self.name),
	}),
);

export type OrganizationPgType = InferSelectModel<typeof organizationsPgTable>;

export const organizationsPgTableRelations = relations(
	organizationsPgTable,
	({ one, many }) => ({
		actionsWhereOrganization: many(actionsPgTable, {
			relationName: "actions.organization_id:organizations.id",
		}),
		actionCategoriesWhereOrganization: many(actionCategoriesPgTable, {
			relationName: "action_categories.organization_id:organizations.id",
		}),

		advertisementsWhereOrganization: many(advertisementsPgTable, {
			relationName: "advertisements.organization_id:organizations.id",
		}),

		creator: one(usersPgTable, {
			fields: [organizationsPgTable.creatorId],
			references: [usersPgTable.id],
			relationName: "organizations.creator_id:users.id",
		}),

		familiesWhereOrganization: many(familiesPgTable, {
			relationName: "families.organization_id:organizations.id",
		}),

		fundsWhereOrganization: many(fundsPgTable, {
			relationName: "funds.organization_id:organizations.id",
		}),

		organziationMembershipsWhereOrganization: many(
			organizationMembershipsPgTable,
			{
				relationName:
					"organizations.id:organization_memberships.organization_id",
			},
		),

		postsWhereOrganization: many(postsPgTable, {
			relationName: "organizations.id:posts.organization_id",
		}),

		tagFoldersWhereOrganization: many(tagFoldersPgTable, {
			relationName: "organizations.id:tag_folders.organization_id",
		}),

		tagsWhereOrganization: many(tagsPgTable, {
			relationName: "organizations.id:tags.organization_id",
		}),

		updater: one(usersPgTable, {
			fields: [organizationsPgTable.updaterId],
			references: [usersPgTable.id],
			relationName: "organizations.updater_id:users.id",
		}),

		venuesWhereOrganization: many(venuesPgTable, {
			relationName: "organizations.id:venues.organization_id",
		}),
	}),
);
