import { pgEnum } from "drizzle-orm/pg-core";

export const agendaItemTypePgEnum = pgEnum("agenda_item_type", [
	"general",
	"note",
	"scripture",
	"song",
]);
