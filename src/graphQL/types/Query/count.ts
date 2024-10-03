import { builder } from "~/src/graphQL/schemaBuilder.js";

builder.queryField("count", (t) =>
	t.int({
		resolve: async (_parent, _args, ctx) => ctx.count.value,
	}),
);
