import { builder } from "~/src/graphQL/schemaBuilder.js";

builder.unionType("s", {
	types: [
		builder.objectRef<{ body: string }>("Post"),
		builder.objectRef<{ message: string }>("Error"),
	],
	resolveType(parent, context, info, type) {},
});
