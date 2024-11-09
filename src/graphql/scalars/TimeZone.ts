import { TimeZoneResolver } from "graphql-scalars";
import { builder } from "~/src/graphql/builder";

/**
 * More information at this link: {@link https://the-guild.dev/graphql/scalars/docs/scalars/time-zone}
 */
builder.addScalarType("TimeZone", TimeZoneResolver);

/**
 * `TimeZone` scalar type for pothos schema.
 */
export type TimeZone = {
	Input: string;
	Output: string;
};
