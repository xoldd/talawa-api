import { type InferSelectModel, relations } from "drizzle-orm";
import {
	type AnyPgColumn,
	index,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import { commentVotesPgTable } from "./comment_votes.js";
import { postsPgTable } from "./posts.js";
import { usersPgTable } from "./users.js";

export const commentsPgTable = pgTable(
	"comments",
	{
		body: text("body").notNull(),

		commenterId: uuid("commenter_id").references(() => usersPgTable.id, {}),

		createdAt: timestamp("created_at", {}).notNull().defaultNow(),

		creatorId: uuid("creator_id").references(() => usersPgTable.id, {}),

		deletedAt: timestamp("deleted_at", {}),

		id: uuid("id").notNull().primaryKey().defaultRandom(),

		parentCommentId: uuid("parent_comment_id").references(
			(): AnyPgColumn => commentsPgTable.id,
			{},
		),

		pinnedAt: timestamp("pinned_at", {}),

		pinnerId: uuid("pinner_id").references(() => usersPgTable.id, {}),

		postId: uuid("post_id")
			.notNull()
			.references(() => postsPgTable.id, {}),

		updatedAt: timestamp("updated_at", {}),

		updaterId: uuid("updater_id").references(() => usersPgTable.id),
	},
	(self) => ({
		index0: index().on(self.commenterId),
		index1: index().on(self.createdAt),
		index2: index().on(self.creatorId),
		index3: index().on(self.parentCommentId),
		index4: index().on(self.pinnedAt),
		index5: index().on(self.postId),
	}),
);

export type CommentPgType = InferSelectModel<typeof commentsPgTable>;

export const commentsPgTableRelations = relations(
	commentsPgTable,
	({ many, one }) => ({
		childCommentsWhereParentComment: many(commentsPgTable, {
			relationName: "comments.id:comments.parent_comment_id",
		}),

		commenter: one(usersPgTable, {
			fields: [commentsPgTable.commenterId],
			references: [usersPgTable.id],
			relationName: "comments.commenter_id:users.id",
		}),

		commentVotesWhereComment: many(commentVotesPgTable, {
			relationName: "comment_votes.comment_id:comments.id",
		}),

		creator: one(usersPgTable, {
			fields: [commentsPgTable.creatorId],
			references: [usersPgTable.id],
			relationName: "comments.creator_id:users.id",
		}),

		parentComment: one(commentsPgTable, {
			fields: [commentsPgTable.parentCommentId],
			references: [commentsPgTable.id],
			relationName: "comments.id:comments.parent_comment_id",
		}),

		pinner: one(usersPgTable, {
			fields: [commentsPgTable.pinnerId],
			references: [usersPgTable.id],
			relationName: "comments.pinner_id:users.id",
		}),

		post: one(postsPgTable, {
			fields: [commentsPgTable.postId],
			references: [postsPgTable.id],
			relationName: "comments.post_id:posts.id",
		}),

		updater: one(usersPgTable, {
			fields: [commentsPgTable.updaterId],
			references: [usersPgTable.id],
			relationName: "comments.updater_id:users.id",
		}),
	}),
);
