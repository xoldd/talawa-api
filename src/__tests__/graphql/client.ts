import { initGraphQLTada } from "gql.tada";
import { createMercuriusTestClient } from "mercurius-integration-testing";
import type { ClientScalars } from "~/src/graphql/scalars/index.js";
import { fastify } from "../fastify.js";
import type { introspection } from "./gql.tada.js";

export const gql = initGraphQLTada<{
	introspection: introspection;
	scalars: ClientScalars;
}>();

export type { FragmentOf, ResultOf, VariablesOf } from "gql.tada";
export { readFragment } from "gql.tada";

export const mercuriusClient = createMercuriusTestClient(fastify, {
	url: "/graphql",
});
