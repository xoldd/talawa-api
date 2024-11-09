import { sql } from "drizzle-orm";
import { type PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import fastifyPlugin from "fastify-plugin";
import * as drizzleSchema from "~/src/drizzle/schema";

declare module "fastify" {
	interface FastifyInstance {
		drizzleClient: PostgresJsDatabase<typeof drizzleSchema>;
	}
}

/**
 * Integrates a drizzle client instance on a namespace `drizzleClient` on the global fastify instance.
 *
 * @example
 * import drizzleClientPlugin from "~src/plugins/drizzleClient";
 *
 * fastify.register(drizzleClientPlugin, {});
 * const user = await fastify.drizzleClient.query.usersTable.findFirst();
 */
export const drizzleClient = fastifyPlugin(async (fastify) => {
	// /**
	//  * More information at this link: {@link https://orm.drizzle.team/docs/goodies#logging}
	//  */
	// class DrizzlePinoLogger implements Logger {
	// 	logQuery(query: string, params: unknown[]): void {
	// 		fastify.log.info(query, params);
	// 	}
	// }

	const drizzleClient = drizzle({
		connection: {
			database: fastify.envConfig.API_POSTGRES_DATABASE,
			host: fastify.envConfig.API_POSTGRES_HOST,
			password: fastify.envConfig.API_POSTGRES_PASSWORD,
			port: fastify.envConfig.API_POSTGRES_PORT,
			ssl: fastify.envConfig.API_POSTGRES_SSL_MODE,
			user: fastify.envConfig.API_POSTGRES_USER,
		},
		// logger: new DrizzlePinoLogger(),
		schema: drizzleSchema,
	});

	try {
		fastify.log.info("Checking the connection to the postgres server.");
		await drizzleClient.execute(sql`select 1`);
		fastify.log.info("Successfully connected to the postgres server.");
	} catch (error) {
		throw new Error("Failed to connect to the postgres server", {
			cause: error,
		});
	}

	/**
	 * Gracefully close the postgres connection when the fastify server is shutting down.
	 */
	fastify.addHook("onClose", async () => {
		try {
			fastify.log.info(
				"Closing all the connections in the postgres connection pool.",
			);
			await drizzleClient.$client.end();
			fastify.log.info(
				"Successfully closed all the connections in the postgres connection pool.",
			);
		} catch (error) {
			fastify.log.error(
				{ error },
				"Something went wrong while trying to close all the connections in the postgres connection pool.",
			);
		}
	});

	if (fastify.envConfig.API_IS_APPLY_DRIZZLE_MIGRATIONS) {
		try {
			fastify.log.info(
				"Applying the drizzle migration files to the postgres database.",
			);
			await migrate(drizzleClient, {
				migrationsFolder: `${import.meta.dirname}/../../drizzle_migrations`,
			});
			fastify.log.info(
				"Successfully applied the drizzle migrations to the postgres database.",
			);
		} catch (error) {
			throw new Error(
				"Failed to apply the drizzle migrations to the postgres database.",
				{
					cause: error,
				},
			);
		}
	}

	fastify.decorate("drizzleClient", drizzleClient);
});

export default drizzleClient;
