import { pgEnum } from "drizzle-orm/pg-core";

export const userNatalSexPgEnum = pgEnum("user_natal_sex", [
	"female",
	"male",
	"intersex",
]);
