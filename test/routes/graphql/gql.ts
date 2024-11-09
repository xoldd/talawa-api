import { initGraphQLTada } from "gql.tada";
import type { ClientCustomScalars } from "~/src/graphql/scalars/index";
import type { introspection } from "./gql.tada";

export const gql = initGraphQLTada<{
	introspection: introspection;
	scalars: ClientCustomScalars;
}>();
