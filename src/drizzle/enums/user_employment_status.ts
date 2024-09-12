import { pgEnum } from "drizzle-orm/pg-core";

export const userEmploymentStatusPgEnum = pgEnum("user_employment_status", [
	"full_time",
	"part_time",
	"unemployed",
]);
