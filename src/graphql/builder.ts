import SchemaBuilder from "@pothos/core";
import complexityPlugin from "@pothos/plugin-complexity";
import relayPlugin from "@pothos/plugin-relay";
import type { GraphQLContext } from "~/src/graphql/context";
import type { CustomScalars } from "./scalars/index";

/**
 * This is the pothos schema builder used for talawa api's code first graphql implementation.
 */
export const builder = new SchemaBuilder<{
	Context: GraphQLContext;
	Scalars: CustomScalars;
}>({
	complexity: {},
	plugins: [complexityPlugin, relayPlugin],
	relay: {},
});
