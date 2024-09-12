import { type InferSelectModel, relations } from "drizzle-orm";
import {
	index,
	integer,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	uuid,
} from "drizzle-orm/pg-core";
import { postAttachmentTypePgEnum } from "../enums/post_attachment_type.js";
import { postsPgTable } from "./posts.js";
import { usersPgTable } from "./users.js";

export const postAttachmentsPgTable = pgTable(
	"post_attachments",
	{
		createdAt: timestamp("created_at", {}).notNull().defaultNow(),

		creatorId: uuid("creator_id").references(() => usersPgTable.id, {}),

		deletedAt: timestamp("deleted_at", {}),

		position: integer("position").notNull(),

		postId: uuid("post_id")
			.notNull()
			.references(() => postsPgTable.id),

		type: postAttachmentTypePgEnum("type").notNull(),

		updatedAt: timestamp("updated_at", {}),

		updaterId: uuid("updater_id").references(() => usersPgTable.id, {}),

		uri: text("uri", {}).notNull(),
	},
	(self) => ({
		index0: index().on(self.createdAt),
		index1: index().on(self.creatorId),
		index2: index().on(self.postId),
		uniqueIndex0: uniqueIndex().on(self.position, self.postId),
	}),
);

export type PostAttachmentPgType = InferSelectModel<
	typeof postAttachmentsPgTable
>;

export const postAttachmentsPgTableRelations = relations(
	postAttachmentsPgTable,
	({ one }) => ({
		creator: one(usersPgTable, {
			fields: [postAttachmentsPgTable.creatorId],
			references: [usersPgTable.id],
			relationName: "[post_attachments.creator_id:users.id",
		}),

		post: one(postsPgTable, {
			fields: [postAttachmentsPgTable.postId],
			references: [postsPgTable.id],
			relationName: "post_attachments.post_id:posts.id",
		}),

		updater: one(usersPgTable, {
			fields: [postAttachmentsPgTable.updaterId],
			references: [usersPgTable.id],
			relationName: "[post_attachments.updater_id:users.id",
		}),
	}),
);
