import { NonPositiveFloatResolver } from "graphql-scalars";
import { builder } from "~/src/graphQL/schemaBuilder.js";

/**
 * More information at this link: {@link https://the-guild.dev/graphQL/scalars/docs/scalars/non-positive-float}
 */
builder.addScalarType("NonPositiveFloat", NonPositiveFloatResolver);

/**
 * `NonPositiveFloat` scalar type for pothos schema.
 */
export type NonPositiveFloat = {
	Input: number;
	Output: number;
};
