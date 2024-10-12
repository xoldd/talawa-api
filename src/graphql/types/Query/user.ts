import { builder } from "~/src/graphql/builder.js";
import { User } from "../User/User.js";

builder.queryField("user", (t) =>
	// t.field({
	// 	args: {
	// 		id: t.arg.globalID({}),
	// 	},
	// 	resolve: async (parent, args, ctx) => {
	// 		return {};
	// 	},
	// 	type: User,
	// }),
	t.field({
		args: {
			lat: t.arg({
				type: "Latitude",
				required: true,
			}),
		},
		resolve: async (parent, args, ctx) => {
			console.log(args.lat);
			console.log(typeof args.lat);
			return args.lat;
		},
		type: "Latitude",
	}),
);
