import { type Static, Type } from "@sinclair/typebox";
import envSchema from "env-schema";
import { initializeFastify } from "~/src/createServer.js";
import { envConfigSchema, envSchemaAjv } from "~/src/envConfigSchema.js";

const overrideEnvConfigSchema = Type.Object({
	API_MINIO_TEST_END_POINT: envConfigSchema.properties.API_MINIO_END_POINT,
	API_POSTGRES_TEST_HOST: envConfigSchema.properties.API_POSTGRES_HOST,
	API_REDIS_TEST_HOST: envConfigSchema.properties.API_REDIS_HOST,
});

const overrideEnvConfig = envSchema<Static<typeof overrideEnvConfigSchema>>({
	ajv: envSchemaAjv,
	dotenv: true,
	schema: overrideEnvConfigSchema,
});

export const fastify = await initializeFastify({
	envConfig: {
		/**
		 * This makes the fastify test instance connect to the minio test server.
		 */
		API_MINIO_END_POINT: overrideEnvConfig.API_MINIO_TEST_END_POINT,
		/**
		 * This makes the fastify test instance connect to the postgres test database.
		 */
		API_POSTGRES_HOST: overrideEnvConfig.API_POSTGRES_TEST_HOST,
		/**
		 * This makes the fastify test instance connect to redis test database.
		 */
		API_REDIS_HOST: overrideEnvConfig.API_REDIS_TEST_HOST,
	},
});
