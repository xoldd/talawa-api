import { HexColorCodeResolver } from "graphql-scalars";
import { builder } from "~/src/graphql/builder.js";

/**
 * More information at this link: {@link https://the-guild.dev/graphql/scalars/docs/scalars/hex-color-code}
 */
builder.addScalarType("HexColorCode", HexColorCodeResolver);

/**
 * `HexColorCode` scalar type for pothos schema.
 */
export type HexColorCode = {
	Input: string;
	Output: string;
};
