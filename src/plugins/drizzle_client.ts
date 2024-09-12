import { type PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
// import { migrate } from "drizzle-orm/postgres-js/migrator";
import fastifyPlugin from "fastify-plugin";
import postgres from "postgres";
import * as schema from "../drizzle/schema";

/**
 * This plugin handles integrating a drizzle client instance on a namespace `drizzleClient`
 * on a fastify instance.
 *
 * @example
 * import drizzlePlugin from "./plugins/drizzle";
 *
 * await fastify.register(drizzlePlugin, {});
 *
 * // Usage.
 * const user = await fastify.drizzleClient.query.usersTable.findFirst();
 */
export default fastifyPlugin(
	async (fastify) => {
		const sql = postgres({
			database: fastify.envConfig.API_POSTGRES_DATABASE,
			host: fastify.envConfig.API_POSTGRES_HOST,
			password: fastify.envConfig.API_POSTGRES_PASSWORD,
			port: fastify.envConfig.API_POSTGRES_PORT,
			ssl: fastify.envConfig.API_POSTGRES_SSL_MODE,
			user: fastify.envConfig.API_POSTGRES_USER,
		});

		try {
			fastify.log.info("Checking the connection to the postgres server.");
			await sql`select 1`;
			fastify.log.info("Successfully connected to the postgres server.");
		} catch (error) {
			throw new Error("Failed to connect to the postgres server", {
				cause: error,
			});
		}

		// Gracefully close the postgres connection when the fastify server is shutting down.
		fastify.addHook("onClose", async () => {
			try {
				fastify.log.info(
					"Closing all the connections in the postgres connection pool.",
				);
				await sql.end();
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

		const drizzleClient = drizzle(sql, {
			schema,
		});

		// try {
		// 	fastify.log.info(
		// 		"Running the drizzle migration files against the postgres database.",
		// 	);
		// 	await migrate(drizzleClient, {
		// 		migrationsFolder: "../../migrations",
		// 	});
		// 	fastify.log.info(
		// 		"Successfully ran the drizzle migration files against the postgres database.",
		// 	);
		// } catch (error) {
		// 	throw new Error(
		// 		"Failed to run the drizzle migration files against the postgres database.",
		// 		{
		// 			cause: error,
		// 		},
		// 	);
		// }

		fastify.decorate("drizzleClient", drizzleClient);
	},
	{
		encapsulate: false,
		name: "drizzleClient",
	},
);

declare module "fastify" {
	interface FastifyInstance {
		drizzleClient: PostgresJsDatabase<typeof schema>;
	}
}
