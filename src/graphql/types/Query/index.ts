import { builder } from "~/src/graphql/schemaBuilder.js";

builder.queryType({
	fields: (t) => ({
		count: t.int({
			resolve: (_parent, _args, ctx) => ctx.count.value,
		}),
	}),
});
