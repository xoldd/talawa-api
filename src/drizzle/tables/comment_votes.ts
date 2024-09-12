import { type InferSelectModel, relations } from "drizzle-orm";
import {
	index,
	pgTable,
	primaryKey,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import { commentVoteTypePgEnum } from "../enums/comment_vote_type.js";
import { commentsPgTable } from "./comments.js";
import { usersPgTable } from "./users.js";

export const commentVotesPgTable = pgTable(
	"comment_votes",
	{
		commentId: uuid("comment_id")
			.notNull()
			.references(() => commentsPgTable.id, {}),

		createdAt: timestamp("created_at", {}).notNull().defaultNow(),

		creatorId: uuid("creator_id").references(() => usersPgTable.id, {}),

		type: commentVoteTypePgEnum("type").notNull(),

		updatedAt: timestamp("updated_at", {}),

		updaterId: uuid("updated_id").references(() => usersPgTable.id),

		voterId: uuid("voter_id").references(() => usersPgTable.id),
	},
	(self) => ({
		compositePrimaryKey: primaryKey({
			columns: [self.commentId, self.voterId],
		}),
		index0: index().on(self.commentId),
		index1: index().on(self.createdAt),
		index2: index().on(self.creatorId),
		index3: index().on(self.type),
		index4: index().on(self.voterId),
	}),
);

export type CommentVotePgType = InferSelectModel<typeof commentVotesPgTable>;

export const commentVotesPgTableRelations = relations(
	commentVotesPgTable,
	({ one }) => ({
		comment: one(commentsPgTable, {
			fields: [commentVotesPgTable.commentId],
			references: [commentsPgTable.id],
			relationName: "comment_votes.comment_id:comments.id",
		}),

		creator: one(usersPgTable, {
			fields: [commentVotesPgTable.creatorId],
			references: [usersPgTable.id],
			relationName: "comment_votes.creator_id:users.id",
		}),

		updater: one(usersPgTable, {
			fields: [commentVotesPgTable.updaterId],
			references: [usersPgTable.id],
			relationName: "comment_votes.updater_id:users.id",
		}),

		voter: one(usersPgTable, {
			fields: [commentVotesPgTable.voterId],
			references: [usersPgTable.id],
			relationName: "comment_votes.voter_id:users.id",
		}),
	}),
);
