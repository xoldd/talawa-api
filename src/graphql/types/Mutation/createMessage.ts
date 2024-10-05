import { randomUUID } from "node:crypto";
import { builder } from "~/src/graphql/schemaBuilder.js";
import { MessageRef } from "~/src/graphql/types/Message.js";

builder.mutationField("createMessage", (t) =>
	t.field({
		args: {
			body: t.arg({
				required: true,
				type: "String",
			}),
		},
		resolve: async (parent, args, ctx) => {
			const message = {
				body: args.body,
				id: randomUUID(),
			};
			ctx.messages.push(message);
			return message;
		},
		type: MessageRef,
	}),
);
