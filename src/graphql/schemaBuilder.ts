import SchemaBuilder from "@pothos/core";
// import ComplexityPlugin from "@pothos/plugin-complexity";
// import RelayPlugin from "@pothos/plugin-relay";
// import WithInputPlugin from "@pothos/plugin-with-input";
// import ZodPlugin from "@pothos/plugin-zod";
import type { GraphQLContext } from "~/src/graphql/createContext.js";

export const builder = new SchemaBuilder<{
	Context: GraphQLContext;
	// Scalars: {
	// 	PositiveInt: {
	// 		Input: number;
	// 		Output: number;
	// 	};
	// };
}>({
	// complexity: {},
	// plugins: [ComplexityPlugin, RelayPlugin, WithInputPlugin, ZodPlugin],
	// relay: {},
	// withInput: {},
	// zod: {},
});
