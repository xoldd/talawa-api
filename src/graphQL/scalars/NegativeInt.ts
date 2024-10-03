import { NegativeIntResolver } from "graphql-scalars";
import { builder } from "~/src/graphQL/schemaBuilder.js";

/**
 * More information at this link: {@link https://the-guild.dev/graphQL/scalars/docs/scalars/negative-int}
 */
builder.addScalarType("NegativeInt", NegativeIntResolver);

/**
 * `NegativeInt` scalar type for pothos schema.
 */
export type NegativeInt = {
	Input: number;
	Output: number;
};
