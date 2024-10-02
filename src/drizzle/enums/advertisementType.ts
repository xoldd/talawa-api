import { pgEnum } from "drizzle-orm/pg-core";

export const advertisementTypePgEnum = pgEnum("advertisement_type", [
	"banner",
	"menu",
	"pop_up",
]);
