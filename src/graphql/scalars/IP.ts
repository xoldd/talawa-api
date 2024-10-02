import { IPResolver } from "graphql-scalars";
import { builder } from "~/src/graphql/schemaBuilder.js";

/**
 * More information at this link: {@link https://the-guild.dev/graphql/scalars/docs/scalars/ip}
 */
builder.addScalarType("IP", IPResolver);

/**
 * `IP` scalar type for pothos schema.
 */
export type IP = {
	Input: string;
	Output: string;
};
