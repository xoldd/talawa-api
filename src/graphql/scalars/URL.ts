import { URLResolver } from "graphql-scalars";
import { builder } from "~/src/graphql/builder.js";

/**
 * More information at this link: {@link https://the-guild.dev/graphql/scalars/docs/scalars/url}
 */
builder.addScalarType("URL", URLResolver);

/**
 * `URL` scalar type for pothos schema.
 */
export type _URL = {
	Input: URL;
	Output: URL;
};
