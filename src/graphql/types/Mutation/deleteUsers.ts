// import { DeleteUserInput } from "~/src/graphql/inputs/DeleteUserInput.js";
import { builder } from "~/src/graphql/builder.js";
import { User } from "~/src/graphql/types/User/User.js";

builder.mutationField("deleteUsers", (t) =>
	t.field({
		args: {
			// input: t.arg.listRef(DeleteUserInput, {
			// 	required: true,
			// }),
		},
		resolve: async (parent, args, ctx) => {
			return [];
		},
		type: t.listRef(User),
	}),
);
