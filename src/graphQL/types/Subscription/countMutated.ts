import { builder } from "~/src/graphQL/schemaBuilder.js";

builder.subscriptionField("countMutated", (t) =>
	t.int({
		subscribe: async (parent, args, ctx) =>
			await ctx.pubsub.subscribe("countMutated"),
		resolve: (count, args, ctx) => count,
	}),
);
