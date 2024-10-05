import { type Static, Type } from "@sinclair/typebox";
import envSchema from "env-schema";
import { envSchemaAjv, getEnvConfig } from "~/src/envConfig.js";
import { initializeFastify } from "~/src/initializeFastify.js";

const overrideEnvConfigSchema = Type.Object({
	API_MINIO_TEST_END_POINT: Type.String(),
	API_POSTGRES_TEST_HOST: Type.String(),
	API_REDIS_TEST_HOST: Type.String(),
});

const overrideEnvConfig = envSchema<Static<typeof overrideEnvConfigSchema>>({
	ajv: envSchemaAjv,
	dotenv: true,
	schema: overrideEnvConfigSchema,
});

export const fastify = await initializeFastify({
	envConfig: {
		...getEnvConfig(),
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
