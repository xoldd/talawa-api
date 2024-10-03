import { type Static, Type } from "@sinclair/typebox";
import envSchema from "env-schema";
import { initGraphQLTada } from "gql.tada";
// import { createMercuriusTestClient } from "mercurius-integration-testing";
import { getEnvConfig } from "~/src/envConfig.js";
// import { initServer } from "~/src/initServer.js";
import type { introspection } from "./gql.tada.js";

const overrideEnvConfigSchema = Type.Object({
	API_MINIO_TEST_END_POINT: Type.String(),
	API_POSTGRES_TEST_HOST: Type.String(),
	API_REDIS_TEST_HOST: Type.String(),
});

const overrideEnvConfig = envSchema<Static<typeof overrideEnvConfigSchema>>({
	dotenv: true,
	schema: overrideEnvConfigSchema,
});

export const envConfig = getEnvConfig();

/**
 * Here we're overriding the default values of environment variables required by talawa api with custom values that are suitable for testing.
 */
/**
 * This makes the fastify test instance connect to the minio test server.
 */
envConfig.API_MINIO_END_POINT = overrideEnvConfig.API_MINIO_TEST_END_POINT;
/**
 * This makes the fastify test instance connect to the postgres test database.
 */
envConfig.API_POSTGRES_HOST = overrideEnvConfig.API_POSTGRES_TEST_HOST;
/**
 * This makes the fastify test instance connect to redis test database.
 */
envConfig.API_REDIS_HOST = overrideEnvConfig.API_REDIS_TEST_HOST;

// export const fastify = await initServer({
// 	envConfig,
// });

// export const mercuriusTestClient = createMercuriusTestClient(fastify);

export const graphql = initGraphQLTada<{
	introspection: introspection;
}>();

export type { FragmentOf, ResultOf, VariablesOf } from "gql.tada";
export { readFragment } from "gql.tada";
