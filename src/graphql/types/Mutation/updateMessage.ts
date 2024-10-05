import { builder } from "~/src/graphql/schemaBuilder.js";
import { MessageRef } from "~/src/graphql/types/Message.js";

builder.mutationField("updateMessage", (t) =>
	t.field({
		args: {
			body: t.arg.string({
				required: true,
			}),
			id: t.arg.id({
				required: true,
			}),
		},
		resolve: async (parent, args, ctx) => {
			const message = ctx.messages.find((value) => value.id === args.id);
			if (!message) {
				throw new Error("Message not found");
			}
			message.body = args.body;
			ctx.pubsub.publish({
				payload: message,
				topic: `messageUpdated:${message.id}`,
			});
			return message;
		},
		type: MessageRef,
	}),
);
