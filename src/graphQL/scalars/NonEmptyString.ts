import { NonEmptyStringResolver } from "graphql-scalars";
import { builder } from "~/src/graphQL/schemaBuilder.js";

/**
 * More information at this link: {@link https://the-guild.dev/graphQL/scalars/docs/scalars/non-empty-string}
 */
builder.addScalarType("NonEmptyString", NonEmptyStringResolver);

/**
 * `NonEmptyString` scalar type for pothos schema.
 */
export type NonEmptyString = {
	Input: number;
	Output: number;
};
