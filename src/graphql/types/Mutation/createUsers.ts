// import { CreateUserInput } from "~/src/graphql/inputs/CreateUserInput.js";
import { builder } from "~/src/graphql/builder.js";
import { User } from "~/src/graphql/types/User/User.js";

builder.mutationField("createUsers", (t) =>
	t.field({
		args: {
			// input: t.arg.listRef(CreateUserInput, {
			// 	required: true,
			// }),
		},
		resolve: async (parent, args, ctx) => {
			return [];
		},
		type: t.listRef(User),
	}),
);
