import SchemaBuilder from "@pothos/core";
// import ComplexityPlugin from "@pothos/plugin-complexity";
// import RelayPlugin from "@pothos/plugin-relay";
// import WithInputPlugin from "@pothos/plugin-with-input";
// import ZodPlugin from "@pothos/plugin-zod";
import type { GraphQLContext } from "~/src/graphql/createContext.js";
import type { Scalars } from "./scalars/index.js";

/**
 * This is the pothos schema builder used for talawa api's code first graphql implementation.
 */
export const builder = new SchemaBuilder<{
	Context: GraphQLContext;
	Scalars: Scalars;
}>({
	// complexity: {},
	// plugins: [ComplexityPlugin, RelayPlugin, WithInputPlugin, ZodPlugin],
	// relay: {},
	// withInput: {},
	// zod: {},
});
