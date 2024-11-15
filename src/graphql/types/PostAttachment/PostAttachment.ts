import type { postAttachmentsTable } from "~/src/drizzle/tables/postAttachments";
import { builder } from "~/src/graphql/builder";
import { PostAttachmentType } from "~/src/graphql/enums/PostAttachmentType";

export type PostAttachment = typeof postAttachmentsTable.$inferSelect;

export const PostAttachment =
	builder.objectRef<PostAttachment>("PostAttachment");

PostAttachment.implement({
	description: "",
	fields: (t) => ({
		createdAt: t.expose("createdAt", {
			description: "Date time at the time the attachment was created.",
			type: "DateTime",
		}),
		type: t.expose("type", {
			description: "Type of the attachment.",
			type: PostAttachmentType,
		}),
		updatedAt: t.expose("updatedAt", {
			description: "Date time at the time the attachment was last updated.",
			type: "DateTime",
		}),
		uri: t.exposeString("uri", {
			description: "URI to the attachment.",
		}),
	}),
});
