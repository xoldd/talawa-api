import SchemaBuilder from "@pothos/core";
import ComplexityPlugin from "@pothos/plugin-complexity";
import RelayPlugin from "@pothos/plugin-relay";
import WithInputPlugin from "@pothos/plugin-with-input";
import ZodPlugin from "@pothos/plugin-zod";

export const builder = new SchemaBuilder<{
	Scalars: {
		PositiveInt: {
			Input: number;
			Output: number;
		};
	};
}>({
	complexity: {},
	plugins: [ComplexityPlugin, RelayPlugin, WithInputPlugin, ZodPlugin],
	relay: {},
	withInput: {},
	zod: {},
});
