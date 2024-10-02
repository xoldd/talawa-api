import { pgEnum } from "drizzle-orm/pg-core";

export const userMaritalStatusPgEnum = pgEnum("user_marital_status", [
	"divorced",
	"engaged",
	"married",
	"seperated",
	"single",
	"widowed",
]);
