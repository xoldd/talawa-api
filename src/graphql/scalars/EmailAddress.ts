import { EmailAddressResolver } from "graphql-scalars";
import { builder } from "~/src/graphql/builder.js";

/**
 * More information at this link: {@link https://the-guild.dev/graphql/scalars/docs/scalars/email-address}
 */
builder.addScalarType("EmailAddress", EmailAddressResolver);

/**
 * `EmailAddress` scalar type for pothos schema.
 */
export type EmailAddress = {
	Input: string;
	Output: string;
};
