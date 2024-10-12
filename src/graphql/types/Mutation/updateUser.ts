// import {UpdateUserInput} from "~/src/graphql/inputs/UpdateUserInput.js"
import { builder } from "~/src/graphql/builder.js";
import { User } from "~/src/graphql/types/User/User.js";

builder.mutationField("updateUser", (t) =>
	t.field({
		args: {
			// input: t.arg({
			// 	description: "",
			// 	required: true,
			// 	type: UpdateUserInput,
			// }),
		},
		resolve: async (parent, args, ctx) => {
			return {};
		},
		type: User,
	}),
);
