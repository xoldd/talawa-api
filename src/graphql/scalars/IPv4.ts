import { IPv4Resolver } from "graphql-scalars";
import { builder } from "~/src/graphql/schemaBuilder.js";

/**
 * More information at this link: {@link https://the-guild.dev/graphql/scalars/docs/scalars/i-pv-4}
 */
builder.addScalarType("IPv4", IPv4Resolver);

/**
 * `IPv4` scalar type for pothos schema.
 */
export type IPv4 = {
	Input: string;
	Output: string;
};
