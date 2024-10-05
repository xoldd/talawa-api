import { initGraphQLTada } from "gql.tada";
import { createMercuriusTestClient } from "mercurius-integration-testing";
import { fastify } from "../fastify.js";
import type { introspection } from "./gql.tada.js";

export const gql = initGraphQLTada<{
	introspection: introspection;
	scalars: {
		CountryCode: string;
		Currency: string;
		Date: string;
		DateTime: string;
		Duration: string;
		EmailAddress: string;
		HexColorCode: string;
		IP: string;
		IPv4: string;
		IPv6: string;
		JSONObject: string;
		Latitude: number;
		Longitude: number;
		NegativeFloat: number;
		NegativeInt: number;
		NonEmptyString: string;
		NonNegativeFloat: number;
		NonNegativeInt: number;
		NonPostitiveFloat: number;
		NonPositiveInt: number;
		PhoneNumber: string;
		PositiveFloat: number;
		PositiveInt: number;
		Time: string;
		Timestamp: string;
		TimeZone: string;
		URL: string;
		UTCOffset: string;
	};
}>();

export type { FragmentOf, ResultOf, VariablesOf } from "gql.tada";
export { readFragment } from "gql.tada";

export const mercuriusClient = createMercuriusTestClient(fastify, {
	url: "/graphql",
});
