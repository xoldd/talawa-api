import { builder } from "~/src/graphql/schemaBuilder.js";

builder.subscriptionType({
	fields: (t) => ({
		countMutated: t.int({
			subscribe: async (parent, args, ctx) =>
				await ctx.pubsub.subscribe("countMutated"),
			resolve: (count, args, ctx) => count,
		}),
	}),
});
