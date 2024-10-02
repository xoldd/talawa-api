import { builder } from "~/src/graphql/schemaBuilder.js";

builder.mutationType({
	fields: (t) => ({
		mutateCount: t.int({
			args: {
				toMutateBy: t.arg({
					required: true,
					type: "Int",
				}),
			},
			resolve: async (parent, args, ctx) => {
				ctx.count.value += args.toMutateBy;
				ctx.pubsub.publish({
					payload: ctx.count.value,
					topic: "countMutated",
				});
				return ctx.count.value;
			},
		}),
	}),
});
