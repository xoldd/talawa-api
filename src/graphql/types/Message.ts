import type { Message } from "../createContext.js";
import { builder } from "../schemaBuilder.js";

export const MessageRef = builder.objectRef<Message>("Message").implement({
	fields: (t) => ({
		body: t.exposeString("body", {
			nullable: false,
		}),
		id: t.exposeID("id", {
			nullable: false,
		}),
	}),
});
