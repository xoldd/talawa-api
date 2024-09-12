import { pgEnum } from "drizzle-orm/pg-core";

export const advertisementAttachmentTypePgEnum = pgEnum(
	"advertisement_attachment_type",
	["image", "video"],
);
