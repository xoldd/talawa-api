import { CountryCodeResolver } from "graphql-scalars";
import { builder } from "~/src/graphql/schemaBuilder.js";

/**
 * More information at this link: {@link https://the-guild.dev/graphql/scalars/docs/scalars/country-code}
 */
builder.addScalarType("CountryCode", CountryCodeResolver);

/**
 * `CountryCode` scalar type for pothos schema.
 */
export type CountryCode = {
	Input: string;
	Output: string;
};
