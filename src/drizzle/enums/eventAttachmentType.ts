import { pgEnum } from "drizzle-orm/pg-core";

export const eventAttachmentTypePgEnum = pgEnum("event_attachment_type", [
	"image",
	"video",
]);
