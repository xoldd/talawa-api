import { type Logger, sql } from "drizzle-orm";
import { drizzle, migrate } from "drizzle-orm/connect";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import fastifyPlugin from "fastify-plugin";
import * as drizzleSchema from "../drizzle/schema.js";

declare module "fastify" {
	interface FastifyInstance {
		drizzleClient: PostgresJsDatabase<typeof drizzleSchema>;
	}
}

/**
 * Integrates a drizzle client instance on a namespace `drizzleClient` on the global fastify instance.
 *
 * @example
 *
 * import
 *
 * fastify.register()
 * const user = await fastify.drizzleClient.query.usersTable.findFirst();
 */
export const plugins = fastifyPlugin(
	async (fastify) => {
		// /**
		//  * More information at this link: {@link https://orm.drizzle.team/docs/goodies#logging}
		//  */
		// class DrizzlePinoLogger implements Logger {
		// 	logQuery(query: string, params: unknown[]): void {
		// 		fastify.log.info(query, params);
		// 	}
		// }

		const drizzleClient = await drizzle("postgres-js", {
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

		try {
			fastify.log.info(
				"Running the drizzle migration files against the postgres database.",
			);
			await migrate(drizzleClient, {
				migrationsFolder: "../../migrations",
			});
			fastify.log.info(
				"Successfully ran the drizzle migration files against the postgres database.",
			);
		} catch (error) {
			throw new Error(
				"Failed to run the drizzle migration files against the postgres database.",
				{
					cause: error,
				},
			);
		}

		fastify.decorate("drizzleClient", drizzleClient);
	},
	{
		name: "plugins",
	},
);

export default plugins;
