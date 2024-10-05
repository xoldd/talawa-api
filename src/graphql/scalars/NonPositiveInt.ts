import { NonPositiveIntResolver } from "graphql-scalars";
import { builder } from "~/src/graphql/schemaBuilder.js";

/**
 * More information at this link: {@link https://the-guild.dev/graphql/scalars/docs/scalars/non-positive-int}
 */
builder.addScalarType("NonPositiveInt", NonPositiveIntResolver);

/**
 * `NonPositiveInt` scalar type for pothos schema.
 */
export type NonPositiveInt = {
	Input: number;
	Output: number;
};
