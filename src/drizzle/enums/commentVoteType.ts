import { pgEnum } from "drizzle-orm/pg-core";

export const commentVoteTypePgEnum = pgEnum("comment_vote_type", [
	"down_vote",
	"up_vote",
]);
