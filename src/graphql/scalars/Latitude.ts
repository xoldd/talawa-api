import { LatitudeResolver } from "graphql-scalars";
import { builder } from "~/src/graphql/schemaBuilder.js";

/**
 * More information at this link: {@link https://the-guild.dev/graphql/scalars/docs/scalars/latitude}
 */
builder.addScalarType("Latitude", LatitudeResolver);

/**
 * `Latitude` scalar type for pothos schema.
 */
export type Latitude = {
	Input: number;
	Output: number;
};
