import { LongitudeResolver } from "graphql-scalars";
import { builder } from "~/src/graphql/builder.js";

/**
 * More information at this link: {@link https://the-guild.dev/graphql/scalars/docs/scalars/longitude}
 */
builder.addScalarType("Longitude", LongitudeResolver);

/**
 * `Longitude` scalar type for pothos schema.
 */
export type Longitude = {
	Input: number;
	Output: number;
};
