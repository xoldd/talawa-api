import { builder } from "~/src/graphql/builder.js";

export const User = builder.objectRef<{
	id: string;
}>("User");

User.implement({
	fields: (t) => ({
		id: t.exposeID("id", {
			description: "",
		}),
	}),
});

// builder.node(User, {
// 	fields: (t) => ({
// 		id: t.globalID({
// 			resolve: async (parent, args, ctx) => {},
// 		}),
// 	}),
// 	id: {
// 		description: "Global id of the user.",
// 		resolve: (parent) => parent.id,
// 	},
// 	loadOne: async (id, ctx) => {},
// 	loadMany: async (ids, ctx) => {},
// 	name: "User",
// });
