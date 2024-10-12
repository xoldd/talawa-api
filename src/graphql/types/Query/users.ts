import { resolveCursorConnection } from "@pothos/plugin-relay";
import { builder } from "~/src/graphql/builder.js";
import { User } from "../User/User.js";

builder.queryField("users", (t) =>
	t.connection(
		{
			description: "",
			resolve: async (parent, args, ctx) =>
				resolveCursorConnection(
					{
						args,
						toCursor: (value, nodes) => {},
					},
					(params) => {},
				),
			type: User,
		},
		{
			description: "",
			edgesField: {
				description: "",
			},
		},
		{
			description: "",
			nodeField: {
				description: "",
			},
		},
	),
);
