import { pgEnum } from "drizzle-orm/pg-core";

export const venueAttachmentTypePgEnum = pgEnum("venue_attachment_type", [
	"image",
	"video",
]);
