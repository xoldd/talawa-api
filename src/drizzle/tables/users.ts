import { type InferSelectModel, relations } from "drizzle-orm";
import type { AnyPgColumn } from "drizzle-orm/pg-core";
import {
	boolean,
	date,
	index,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import { iso3166Alpha2CountryCodePgEnum } from "../enums/iso_3166_alpha_2_country_code.js";
import { userEducationGradePgEnum } from "../enums/user_education_grade.js";
import { userEmploymentStatusPgEnum } from "../enums/user_employment_status.js";
import { userMaritalStatusPgEnum } from "../enums/user_marital_status.js";
import { userNatalSexPgEnum } from "../enums/user_natal_sex.js";
import { actionCategoriesPgTable } from "./action_categories.js";
import { actionsPgTable } from "./actions.js";
import { advertisementAttachmentsPgTable } from "./advertisement_attachments.js";
import { advertisementsPgTable } from "./advertisements.js";
import { agendaSectionsPgTable } from "./agenda_sections.js";
import { commentVotesPgTable } from "./comment_votes.js";
import { commentsPgTable } from "./comments.js";
import { eventAttachmentsPgTable } from "./event_attachments.js";
import { eventsPgTable } from "./events.js";
import { familiesPgTable } from "./families.js";
import { familyMembershipsPgTable } from "./family_memberships.js";
import { fundraisingCampaignsPgTable } from "./fundraising_campaigns.js";
import { fundsPgTable } from "./funds.js";
import { organizationMembershipsPgTable } from "./organization_memberships.js";
import { organizationsPgTable } from "./organizations.js";
import { pledgesPgTable } from "./pledges.js";
import { postAttachmentsPgTable } from "./post_attachments.js";
import { postVotesPgTable } from "./post_votes.js";
import { postsPgTable } from "./posts.js";
import { tagAssignmentsPgTable } from "./tag_assignments.js";
import { tagFoldersPgTable } from "./tag_folders.js";
import { tagsPgTable } from "./tags.js";
import { venueAttachmentsPgTable } from "./venue_attachments.js";
import { venueBookingsPgTable } from "./venue_bookings.js";
import { venuesPgTable } from "./venues.js";
import { volunteerGroupAssignmentsPgTable } from "./volunteer_group_assignments.js";
import { volunteerGroupsPgTable } from "./volunteer_groups.js";

export const usersPgTable = pgTable(
	"user",
	{
		addressLine1: text("address_line_1"),

		addressLine2: text("address_line_2"),

		avatarUri: text("avatar_uri"),

		birthDate: date("birth_date"),

		city: text("city"),

		countryCode: iso3166Alpha2CountryCodePgEnum("country_code"),

		createdAt: timestamp("created_at", {}).notNull().defaultNow(),

		creatorId: uuid("creator_id").references(
			(): AnyPgColumn => usersPgTable.id,
		),

		description: text("description"),

		educationGrade: userEducationGradePgEnum("education_grade"),

		email: text("email").notNull().unique(),

		employmentStatus: userEmploymentStatusPgEnum("employment_status"),

		firstName: text("first_name"),

		home_phone_number: text("home_phone_number"),

		id: uuid("id").notNull().primaryKey().defaultRandom(),

		isAdminstrator: boolean("is_administrator").notNull().default(false),

		isEmailVerified: boolean("is_email_verified").notNull().default(false),

		lastName: text("last_name"),

		maritalStatus: userMaritalStatusPgEnum("marital_status"),

		mobilePhoneNumber: text("mobile_phone_number"),

		name: text("name").unique(),

		natalSex: userNatalSexPgEnum("natal_sex"),

		passwordHash: text("password_hash"),

		postalCode: text("postal_code"),

		state: text("state"),

		updatedAt: timestamp("updated_at", {}),

		updaterId: uuid("updater_id").references(
			(): AnyPgColumn => usersPgTable.id,
		),

		workPhoneNumber: text("work_phone_number"),
	},
	(self) => ({
		index0: index().on(self.createdAt),
		index1: index().on(self.name),
	}),
);

export type UserPgType = InferSelectModel<typeof usersPgTable>;

export const usersPgTableRelations = relations(usersPgTable, ({ many }) => ({
	actionsWhereAssignee: many(actionsPgTable, {
		relationName: "actions.assignee_id:users.id",
	}),

	actionsWhereCreator: many(actionsPgTable, {
		relationName: "actions.creator_id:users.id",
	}),

	actionsWhereUpdater: many(actionsPgTable, {
		relationName: "actions.updater_id:users.id",
	}),

	actionCategoriesWhereCreator: many(actionCategoriesPgTable, {
		relationName: "action_categories.creator_id:users.id",
	}),

	actionCategoriesWhereUpdater: many(actionCategoriesPgTable, {
		relationName: "action_categories.updater_id:users.id",
	}),

	advertisementAttachmentsWhereCreator: many(advertisementAttachmentsPgTable, {
		relationName: "advertisement_attachments.creator_id:users.id",
	}),

	advertisementAttachmentsWhereUpdater: many(advertisementAttachmentsPgTable, {
		relationName: "advertisement_attachments.updater_id:users.id",
	}),

	advertisementsWhereCreator: many(advertisementsPgTable, {
		relationName: "advertisements.creator_id:users.id",
	}),

	advertisementsWhereUpdater: many(advertisementsPgTable, {
		relationName: "advertisements.updater_id:users.id",
	}),

	agendaSectionsWhereCreator: many(agendaSectionsPgTable, {
		relationName: "agenda_sections.creator_id:users.id",
	}),

	agendaSectionsWhereUpdater: many(agendaSectionsPgTable, {
		relationName: "agenda_sections.updater_id:users.id",
	}),

	commentsWhereCommenter: many(commentsPgTable, {
		relationName: "comments.commenter_id:users.id",
	}),

	commentsWhereCreator: many(commentsPgTable, {
		relationName: "comments.creator_id:users.id",
	}),

	commentsWherePinner: many(commentsPgTable, {
		relationName: "comments.pinner_id:users.id",
	}),

	commentsWhereUpdater: many(commentsPgTable, {
		relationName: "comments.updater_id:users.id",
	}),

	commentVotesWhereCreator: many(commentVotesPgTable, {
		relationName: "comment_votes.creator_id:users.id",
	}),

	commentVotesWhereUpdater: many(commentVotesPgTable, {
		relationName: "comment_votes.updater_id:users.id",
	}),

	commentVotesWhereVoter: many(commentVotesPgTable, {
		relationName: "comment_votes.voter_id:users.id",
	}),

	eventsWhereCreator: many(eventsPgTable, {
		relationName: "events.creator_id:users.id",
	}),

	eventsWhereUpdater: many(eventsPgTable, {
		relationName: "events.updater_id:users.id",
	}),

	eventAttachmentsWhereCreator: many(eventAttachmentsPgTable, {
		relationName: "event_attachments.creator_id:users.id",
	}),

	eventAttachmentsWhereUpdater: many(eventAttachmentsPgTable, {
		relationName: "event_attachments.updater_id:users.id",
	}),

	familiesWhereCreator: many(familiesPgTable, {
		relationName: "families.creator_id:users.id",
	}),

	familiesWhereUpdater: many(familiesPgTable, {
		relationName: "families.updater_id:users.id",
	}),

	familyMembershipsWhereCreator: many(familyMembershipsPgTable, {
		relationName: "family_memberships.creator_id:users.id",
	}),

	familyMembershipsWhereMember: many(familyMembershipsPgTable, {
		relationName: "family_memberships.member_id:users.id",
	}),

	familyMembershipsWhereUpdater: many(familyMembershipsPgTable, {
		relationName: "family_memberships.updater_id:users.id",
	}),

	fundraisingCampaignsWhereCreator: many(fundraisingCampaignsPgTable, {
		relationName: "fundraising_campaigns.creator_id:users.id",
	}),

	fundraisingCampaignsWhereUpdater: many(fundraisingCampaignsPgTable, {
		relationName: "fundraising_campaigns.updater_id:users.id",
	}),

	fundsWhereCreator: many(fundsPgTable, {
		relationName: "funds.creator_id:users.id",
	}),

	fundsWhereUpdater: many(fundsPgTable, {
		relationName: "funds.updater_id:users.id",
	}),

	organizationsWhereCreator: many(organizationsPgTable, {
		relationName: "organizations.creator_id:users.id",
	}),

	organizationsWhereUpdater: many(organizationsPgTable, {
		relationName: "organizations.updater_id:users.id",
	}),

	organizationMembershipsWhereCreator: many(organizationMembershipsPgTable, {
		relationName: "organization_memberships.creator_id:users.id",
	}),

	organizationMembershipsWhereMember: many(organizationMembershipsPgTable, {
		relationName: "organization_memberships.member_id:users.id",
	}),

	organizationMembershipsWhereUpdator: many(organizationMembershipsPgTable, {
		relationName: "organization_memberships.updater_id:users.id",
	}),

	pledgesWhereCreator: many(pledgesPgTable, {
		relationName: "pledges.creator_id:users.id",
	}),

	pledgesWherePledger: many(pledgesPgTable, {
		relationName: "pledges.pledger_id:users.id",
	}),

	pledgesWhereUpdater: many(pledgesPgTable, {
		relationName: "pledges.updater_id:users.id",
	}),

	postsWhereCreator: many(postsPgTable, {
		relationName: "posts.creator_id:users.id",
	}),

	postsWherePinner: many(postsPgTable, {
		relationName: "posts.pinner_id:users.id",
	}),

	postsWherePoster: many(postsPgTable, {
		relationName: "posts.poster_id:users.id",
	}),

	postsWhereUpdater: many(postsPgTable, {
		relationName: "posts.updater_id:users.id",
	}),

	postAttachmentsWhereCreator: many(postAttachmentsPgTable, {
		relationName: "post_attachments.creator_id:users.id",
	}),

	postAttachmentsWhereUpdater: many(postAttachmentsPgTable, {
		relationName: "post_attachments.updater_id:users.id",
	}),

	postVotesWhereCreator: many(postVotesPgTable, {
		relationName: "post_votes.creator_id:users.id",
	}),

	postVotesWhereUpdater: many(postVotesPgTable, {
		relationName: "post_votes.updater_id:users.id",
	}),

	postVotesWhereVoter: many(postVotesPgTable, {
		relationName: "post_votes.voter_id:users.id",
	}),

	tagsWhereCreator: many(tagsPgTable, {
		relationName: "tags.creator_id:users.id",
	}),

	tagsWhereUpdater: many(tagsPgTable, {
		relationName: "tags.updater_id:users.id",
	}),

	tagAssignmentsWhereAssignee: many(tagAssignmentsPgTable, {
		relationName: "tag_assignments.assignee_id:tags.id",
	}),

	tagAssignmentsWhereCreator: many(tagAssignmentsPgTable, {
		relationName: "tag_assignments.creator_id:users.id",
	}),

	tagAssignmentsWhereUpdater: many(tagAssignmentsPgTable, {
		relationName: "tag_assignments.updater_id:users.id",
	}),

	tagFoldersWhereCreator: many(tagFoldersPgTable, {
		relationName: "tag_folders.creator_id:users.id",
	}),

	tagFoldersWhereUpdater: many(tagFoldersPgTable, {
		relationName: "tag_folders.updater_id:users.id",
	}),

	venuesWhereCreator: many(venuesPgTable, {
		relationName: "users.id:venues.creator_id",
	}),

	venuesWhereUpdater: many(venuesPgTable, {
		relationName: "users.id:venues.updater_id",
	}),

	venueAttachmentsWhereCreator: many(venueAttachmentsPgTable, {
		relationName: "users.id:venue_attachments.creator_id",
	}),

	venueAttachmentsWhereUpdater: many(venueAttachmentsPgTable, {
		relationName: "users.id:venue_attachments.updater_id",
	}),

	venueBookingsWhereCreator: many(venueBookingsPgTable, {
		relationName: "users.id:venue_bookings.creator_id",
	}),

	venueBookingsWhereUpdater: many(venueBookingsPgTable, {
		relationName: "users.id:venue_bookings.updater_id",
	}),

	volunteerGroupsWhereCreator: many(volunteerGroupsPgTable, {
		relationName: "users.id:volunteer_groups.creator_id",
	}),

	volunteerGroupsWhereLeader: many(volunteerGroupsPgTable, {
		relationName: "users.id:volunteer_groups.leader_id",
	}),

	volunteerGroupsWhereUpdater: many(volunteerGroupsPgTable, {
		relationName: "users.id:volunteer_groups.updater_id",
	}),

	volunteerGroupAssignmentsWhereAssignee: many(
		volunteerGroupAssignmentsPgTable,
		{
			relationName: "users.id:volunteer_group_assignments.assignee_id",
		},
	),

	volunteerGroupAssignmentsWhereCreator: many(
		volunteerGroupAssignmentsPgTable,
		{
			relationName: "users.id:volunteer_group_assignments.creator_id",
		},
	),

	volunteerGroupAssignmentsWhereUpdater: many(
		volunteerGroupAssignmentsPgTable,
		{
			relationName: "users.id:volunteer_group_assignments.updater_id",
		},
	),
}));
