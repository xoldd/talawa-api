import { builder } from "~/src/graphql/schemaBuilder.js";
import { MessageRef } from "../Message.js";

builder.queryField("message", (t) =>
	t.field({
		args: {
			id: t.arg.id({
				required: true,
			}),
		},
		resolve: async (parent, args, ctx) =>
			ctx.messages.find((value) => value.id === args.id),
		type: MessageRef,
	}),
);
