// import { DeleteUserInput } from "~/src/graphql/inputs/DeleteUserInput.js";
import { builder } from "~/src/graphql/builder.js";
import { User } from "~/src/graphql/types/User/User.js";

builder.mutationField("deleteUser", (t) =>
	t.field({
		args: {
			// input: t.arg({
			// 	description: "",
			// 	required: true,
			// 	type: DeleteUserInput,
			// }),
		},
		resolve: async (parent, args, ctx) => {
			return {};
		},
		type: User,
	}),
);
