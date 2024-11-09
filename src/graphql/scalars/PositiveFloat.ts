import { PositiveFloatResolver } from "graphql-scalars";
import { builder } from "~/src/graphql/builder";

/**
 * More information at this link: {@link https://the-guild.dev/graphql/scalars/docs/scalars/positive-float}
 */
builder.addScalarType("PositiveFloat", PositiveFloatResolver);

/**
 * `PositiveFloat` scalar type for pothos schema.
 */
export type PositiveFloat = {
	Input: number;
	Output: number;
};
