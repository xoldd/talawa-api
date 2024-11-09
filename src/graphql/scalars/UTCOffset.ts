import { UtcOffsetResolver } from "graphql-scalars";
import { builder } from "~/src/graphql/builder";

/**
 * More information at this link: {@link https://the-guild.dev/graphql/scalars/docs/scalars/utc-offset}
 */
builder.addScalarType("UTCOffset", UtcOffsetResolver);

/**
 * `UTCOffset` scalar type for pothos schema.
 */
export type UTCOffset = {
	Input: string;
	Output: string;
};
