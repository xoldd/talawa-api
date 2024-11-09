import { JSONObjectResolver } from "graphql-scalars";
import { builder } from "~/src/graphql/builder";

/**
 * More information at this link: {@link https://the-guild.dev/graphql/scalars/docs/scalars/json}
 */
builder.addScalarType("JSONObject", JSONObjectResolver);

/**
 * `JSONObject` scalar type for pothos schema.
 */
export type JSONObject = {
	Input: Record<string, unknown>;
	Output: Record<string, unknown>;
};
