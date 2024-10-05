import { DurationResolver } from "graphql-scalars";
import { builder } from "~/src/graphql/schemaBuilder.js";

/**
 * More information at this link: {@link https://the-guild.dev/graphql/scalars/docs/scalars/duration}
 */
builder.addScalarType("Duration", DurationResolver);

/**
 * `Duration` scalar type for pothos schema.
 */
export type Duration = {
	Input: string;
	Output: string;
};
