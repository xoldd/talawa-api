import { builder } from "~/src/graphql/schemaBuilder.js";
import { MessageRef } from "~/src/graphql/types/Message.js";

builder.subscriptionField("messageUpdated", (t) =>
	t.field({
		args: {
			id: t.arg.id({
				required: true,
			}),
		},
		subscribe: async (parent, args, ctx) =>
			await ctx.pubsub.subscribe(`messageUpdated:${args.id}`),
		resolve: (message, args, ctx) => message,
		type: MessageRef,
	}),
);
