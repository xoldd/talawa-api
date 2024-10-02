import { pgEnum } from "drizzle-orm/pg-core";

export const postAttachmentTypePgEnum = pgEnum("post_attachment_type", [
	"image",
	"video",
]);
