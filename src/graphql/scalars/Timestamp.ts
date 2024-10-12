import { TimestampResolver } from "graphql-scalars";
import { builder } from "~/src/graphql/builder.js";

/**
 * More information at this link: {@link https://the-guild.dev/graphql/scalars/docs/scalars/timestamp}
 */
builder.addScalarType("Timestamp", TimestampResolver);

/**
 * `Timestamp` scalar type for pothos schema.
 */
export type Timestamp = {
	Input: string;
	Output: string;
};
