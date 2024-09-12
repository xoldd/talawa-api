import { type InferSelectModel, relations } from "drizzle-orm";
import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { commentsPgTable } from "./comments.js";
import { organizationsPgTable } from "./organizations.js";
import { postAttachmentsPgTable } from "./post_attachments.js";
import { postVotesPgTable } from "./post_votes.js";
import { usersPgTable } from "./users.js";

export const postsPgTable = pgTable(
	"posts",
	{
		caption: text("caption").notNull(),

		createdAt: timestamp("created_at", {}).notNull().defaultNow(),

		creatorId: uuid("creator_id").references(() => usersPgTable.id, {}),

		deletedAt: timestamp("deleted_at", {}),

		id: uuid("id").notNull().primaryKey().defaultRandom(),

		organizationId: uuid("organization_id")
			.notNull()
			.references(() => organizationsPgTable.id, {}),

		pinnedAt: timestamp("pinned_at", {}),

		pinnerId: uuid("pinner_id").references(() => usersPgTable.id, {}),

		posterId: uuid("poster_id").references(() => usersPgTable.id, {}),

		updatedAt: timestamp("updated_at", {}),

		updaterId: uuid("updater_id").references(() => usersPgTable.id),
	},
	(self) => ({
		index0: index().on(self.createdAt),
		index1: index().on(self.creatorId),
		index2: index().on(self.organizationId),
		index3: index().on(self.pinnedAt),
		index4: index().on(self.posterId),
	}),
);

export type PostPgType = InferSelectModel<typeof postsPgTable>;

export const postsPgTableRelations = relations(
	postsPgTable,
	({ many, one }) => ({
		commentsWherePost: many(commentsPgTable, {
			relationName: "comments.post_id:posts.id",
		}),

		creator: one(usersPgTable, {
			fields: [postsPgTable.creatorId],
			references: [usersPgTable.id],
			relationName: "posts.creator_id:users.id",
		}),

		organization: one(organizationsPgTable, {
			fields: [postsPgTable.organizationId],
			references: [organizationsPgTable.id],
			relationName: "organizations.id:posts.organization_id",
		}),

		pinner: one(usersPgTable, {
			fields: [postsPgTable.pinnerId],
			references: [usersPgTable.id],
			relationName: "posts.pinner_id:users.id",
		}),

		poster: one(usersPgTable, {
			fields: [postsPgTable.posterId],
			references: [usersPgTable.id],
			relationName: "posts.poster_id:users.id",
		}),

		postAttachmentsWherePost: many(postAttachmentsPgTable, {
			relationName: "post_attachments.post_id:posts.id",
		}),

		postVotesWherePost: many(postVotesPgTable, {
			relationName: "post_votes.post_id:posts.id",
		}),

		updater: one(usersPgTable, {
			fields: [postsPgTable.updaterId],
			references: [usersPgTable.id],
			relationName: "posts.updater_id:users.id",
		}),
	}),
);
