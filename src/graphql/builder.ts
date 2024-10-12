import SchemaBuilder from "@pothos/core";
import complexityPlugin from "@pothos/plugin-complexity";
import relayPlugin from "@pothos/plugin-relay";
import withInputPlugin from "@pothos/plugin-with-input";
import zodPlugin from "@pothos/plugin-zod";
import type { GraphQLContext } from "~/src/graphql/context.js";
import { createTalawaGraphQLError } from "~/src/utilities/talawaGraphQLError.js";
import type { Scalars } from "./scalars/index.js";

/**
 * This is the pothos schema builder used for talawa api's code first graphql implementation.
 */
export const builder = new SchemaBuilder<{
	Context: GraphQLContext;
	Scalars: Scalars;
}>({
	complexity: {},
	plugins: [complexityPlugin, relayPlugin, withInputPlugin, zodPlugin],
	relay: {},
	withInput: {},
	zod: {
		validationError: (error, args, ctx, info) => {
			return createTalawaGraphQLError("Invalid arguments provided.", {
				extensions: {
					code: "invalid_arguments",
					issues: error.issues.map((issue) => ({
						argumentPath: issue.path,
						message: issue.message,
					})),
				},
			});
		},
	},
});
