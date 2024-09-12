import { pgEnum } from "drizzle-orm/pg-core";

export const postVoteTypePgEnum = pgEnum("post_vote_type", [
	"down_vote",
	"up_vote",
]);
