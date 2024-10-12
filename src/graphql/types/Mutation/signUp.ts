import { builder } from "~/src/graphql/builder.js";
import { User } from "~/src/graphql/types/User/User.js";

builder.mutationField("signUp", (t) =>
	t.field({
		args: {},
		resolve: async (parent, args, ctx) => {
			return {};
		},
		type: User,
	}),
);
