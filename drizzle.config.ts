/**
 * More information at this link: {@link https://orm.drizzle.team/kit-docs/config-reference}
 */
import type { Static } from "@sinclair/typebox";
import { defineConfig } from "drizzle-kit";
import { envSchema } from "env-schema";
import { postgresClientEnvConfigSchema } from "./src/envConfigSchema.js";

const envConfig = envSchema<Static<typeof postgresClientEnvConfigSchema>>({
	dotenv: true,
	schema: postgresClientEnvConfigSchema,
});

export default defineConfig({
	dbCredentials: {
		database: envConfig.API_POSTGRES_DATABASE,
		password: envConfig.API_POSTGRES_PASSWORD,
		host: envConfig.API_POSTGRES_HOST,
		port: envConfig.API_POSTGRES_PORT,
		user: envConfig.API_POSTGRES_USER,
		ssl: envConfig.API_POSTGRES_SSL_MODE,
	},
	dialect: "postgresql",
	migrations: {
		prefix: "timestamp",
	},
	out: "./drizzle_migrations",
	schema: "./src/drizzle/schema.ts",
	strict: true,
	verbose: true,
});
