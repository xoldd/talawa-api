import { type InferSelectModel, relations } from "drizzle-orm";
import {
	index,
	pgTable,
	primaryKey,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import { postVoteTypePgEnum } from "../enums/post_vote_type.js";
import { postsPgTable } from "./posts.js";
import { usersPgTable } from "./users.js";

export const postVotesPgTable = pgTable(
	"post_votes",
	{
		createdAt: timestamp("created_at", {}).notNull().defaultNow(),

		creatorId: uuid("creator_id").references(() => usersPgTable.id, {}),

		postId: uuid("post_id")
			.notNull()
			.references(() => postsPgTable.id, {}),

		updatedAt: timestamp("updated_at", {}),

		updaterId: uuid("updated_id").references(() => usersPgTable.id),

		type: postVoteTypePgEnum("type").notNull(),

		voterId: uuid("voter_id").references(() => usersPgTable.id),
	},
	(self) => ({
		compositePrimaryKey: primaryKey({
			columns: [self.postId, self.voterId],
		}),
		index0: index().on(self.createdAt),
		index1: index().on(self.creatorId),
		index2: index().on(self.postId),
		index3: index().on(self.type),
		index4: index().on(self.voterId),
	}),
);

export type PostVotePgType = InferSelectModel<typeof postVotesPgTable>;

export const postVotesPgTableRelations = relations(
	postVotesPgTable,
	({ one }) => ({
		creator: one(usersPgTable, {
			fields: [postVotesPgTable.creatorId],
			references: [usersPgTable.id],
			relationName: "post_votes.creator_id:users.id",
		}),

		post: one(postsPgTable, {
			fields: [postVotesPgTable.postId],
			references: [postsPgTable.id],
			relationName: "post_votes.post_id:posts.id",
		}),

		updater: one(usersPgTable, {
			fields: [postVotesPgTable.updaterId],
			references: [usersPgTable.id],
			relationName: "post_votes.updater_id:users.id",
		}),

		voter: one(usersPgTable, {
			fields: [postVotesPgTable.voterId],
			references: [usersPgTable.id],
			relationName: "post_votes.voter_id:users.id",
		}),
	}),
);
