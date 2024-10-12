import { builder } from "~/src/graphql/builder.js";
import { UpdateUserInput } from "~/src/graphql/inputs/UpdateUserInput.js";
import { User } from "~/src/graphql/types/User/User.js";

builder.mutationField("updateUsers", (t) =>
	t.field({
		args: {
			// input: t.arg.listRef(UpdateUserInput, {
			// 	required: true,
			// }),
		},
		resolve: async (parent, args, ctx) => {
			return [];
		},
		type: t.listRef(User),
	}),
);
