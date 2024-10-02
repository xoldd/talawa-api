import { CurrencyResolver } from "graphql-scalars";
import { builder } from "~/src/graphql/schemaBuilder.js";

/**
 * More information at this link: {@link https://the-guild.dev/graphql/scalars/docs/scalars/currency}
 */
builder.addScalarType("Currency", CurrencyResolver);

/**
 * `Currency` scalar type for pothos schema.
 */
export type Currency = {
	Input: string;
	Output: string;
};
