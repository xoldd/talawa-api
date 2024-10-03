import { EmailAddressResolver } from "graphql-scalars";
import { builder } from "~/src/graphQL/schemaBuilder.js";

/**
 * More information at this link: {@link https://the-guild.dev/graphQL/scalars/docs/scalars/email-address}
 */
builder.addScalarType("EmailAddress", EmailAddressResolver);

/**
 * `EmailAddress` scalar type for pothos schema.
 */
export type EmailAddress = {
	Input: string;
	Output: string;
};
