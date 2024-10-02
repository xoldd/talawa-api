import { NonNegativeFloatResolver } from "graphql-scalars";
import { builder } from "~/src/graphql/schemaBuilder.js";

/**
 * More information at this link: {@link https://the-guild.dev/graphql/scalars/docs/scalars/non-negative-float}
 */
builder.addScalarType("NonNegativeFloat", NonNegativeFloatResolver);

/**
 * `NonNegativeFloat` scalar type for pothos schema.
 */
export type NonNegativeFloat = {
	Input: number;
	Output: number;
};
