import { pgEnum } from "drizzle-orm/pg-core";

export const recurrenceTypePgEnum = pgEnum("recurrence_type", [
	"daily",
	"monthly",
	"weekly",
	"yearly",
]);
