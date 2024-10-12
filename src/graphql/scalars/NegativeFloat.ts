import { NegativeFloatResolver } from "graphql-scalars";
import { builder } from "~/src/graphql/builder.js";

/**
 * More information at this link: {@link https://the-guild.dev/graphql/scalars/docs/scalars/negative-float}
 */
builder.addScalarType("NegativeFloat", NegativeFloatResolver);

/**
 * `NegativeFloat` scalar type for pothos schema.
 */
export type NegativeFloat = {
	Input: number;
	Output: number;
};
