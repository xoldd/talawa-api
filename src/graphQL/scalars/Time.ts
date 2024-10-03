import { TimeResolver } from "graphql-scalars";
import { builder } from "~/src/graphQL/schemaBuilder.js";

/**
 * More information at this link: {@link https://the-guild.dev/graphQL/scalars/docs/scalars/time}
 */
builder.addScalarType("Time", TimeResolver);

/**
 * `Time` scalar type for pothos schema.
 */
export type Time = {
	Input: Date;
	Output: Date;
};
