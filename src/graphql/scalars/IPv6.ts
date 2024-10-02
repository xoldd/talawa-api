import { IPv6Resolver } from "graphql-scalars";
import { builder } from "~/src/graphql/schemaBuilder.js";

/**
 * More information at this link: {@link https://the-guild.dev/graphql/scalars/docs/scalars/i-pv-6}
 */
builder.addScalarType("IPv6", IPv6Resolver);

/**
 * `IPv6` scalar type for pothos schema.
 */
export type Ipv6 = {
	Input: string;
	Output: string;
};
