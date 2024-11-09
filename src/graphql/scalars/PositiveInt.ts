import { PositiveIntResolver } from "graphql-scalars";
import { builder } from "~/src/graphql/builder";

/**
 * More information at this link: {@link https://the-guild.dev/graphql/scalars/docs/scalars/positive-int}
 */
builder.addScalarType("PositiveInt", PositiveIntResolver);

/**
 * `PositiveInt` scalar type for pothos schema.
 */
export type PositiveInt = {
	Input: number;
	Output: number;
};
