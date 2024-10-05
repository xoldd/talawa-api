import { builder } from "~/src/graphql/schemaBuilder.js";
import { MessageRef } from "../Message.js";

builder.queryField("messages", (t) =>
	t.field({
		resolve: async (_parent, _args, ctx) => ctx.messages,
		type: t.listRef(MessageRef),
	}),
);
