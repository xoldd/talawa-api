import { builder } from "~/src/graphql/builder.js";
import { CreateUserInput } from "~/src/graphql/inputs/CreateUserInput.js";
import { User } from "~/src/graphql/types/User/User.js";

builder.mutationField("createUser", (t) =>
	t.field({
		args: {
			input: t.arg({
				description: "",
				required: true,
				type: CreateUserInput,
			}),
		},
		resolve: async (parent, args, ctx) => {
			return {
				id: "",
			};
		},
		type: User,
	}),
);
