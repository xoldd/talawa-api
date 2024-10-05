import { NonNegativeIntResolver } from "graphql-scalars";
import { builder } from "~/src/graphql/schemaBuilder.js";

/**
 * More information at this link: {@link https://the-guild.dev/graphql/scalars/docs/scalars/non-negative-int}
 */
builder.addScalarType("NonNegativeInt", NonNegativeIntResolver);

/**
 * `NonNegativeInt` scalar type for pothos schema.
 */
export type NonNegativeInt = {
	Input: number;
	Output: number;
};
