// import { readFileSync } from "node:fs";
import {
	//  dirname,
	join,
} from "node:path";
// import { fileURLToPath } from "node:url";
import fastifyAutoload from "@fastify/autoload";
import fastifyCors from "@fastify/cors";
import fastifyHelmet from "@fastify/helmet";
import fastifyRateLimit from "@fastify/rate-limit";
import fastifyRedis from "@fastify/redis";
// import fastifyStatic from "@fastify/static";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { type PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import envSchema from "env-schema";
import Fastify from "fastify";
import type { Client as MinioClient } from "minio";
import postgres from "postgres";
import type * as drizzleSchema from "./drizzle/schema.js";
import { type EnvConfig, envConfigSchema, envSchemaAjv } from "./envSchema.js";
import routes from "./routes/index.js";

/**
 * Currently fastify provides typescript integration through the usage of ambient typescript declarations where the type of global fastify instance is extended with our custom types. This approach is not sustainable for implementing scoped and encapsulated business logic which is meant to be the main advantage of fastify plugins. The fastify team is aware of this problem and is currently looking for a more elegant approach for typescript integration. More information can be found at this link: {@link https://github.com/fastify/fastify/issues/5061}
 */
declare module "fastify" {
	interface FastifyInstance {
		drizzleClient: PostgresJsDatabase<typeof drizzleSchema>;
		envConfig: EnvConfig;
		minioClient: MinioClient;
	}
}

/**
 * This function is used to set up the fastify server.
 */
export const initializeFastify = async (options?: {
	envConfig?: Partial<EnvConfig>;
}) => {
	const envConfig = envSchema<EnvConfig>({
		ajv: envSchemaAjv,
		dotenv: true,
		schema: envConfigSchema,
	});

	Object.assign(envConfig, options?.envConfig);

	/**
	 * This is the root fastify instance. It could be considered as the root node of a directed acyclic graph(DAG) of fastify plugins.
	 */
	const fastify = Fastify({
		/**
		 * Maximum size in bytes of the body of any request that the server will accept. More information here:- {@link https://fastify.dev/docs/latest/Reference/Server/#bodylimit}.This limit is defined on a global server context therefore it will be applied to all requests to the server. This is not practical for all use cases and should instead be applied on a per-route/per-module basis. For example, 50 megabytes might not be sufficient for many static file transfers, similarly, 50 megabytes is too big for simple JSON requests.
		 */
		bodyLimit: 52428800,

		// /**
		//  * Start fastify server over the HTTP/2 protocol. More information at this link:- {@link https://fastify.dev/docs/latest/Reference/HTTP2/}
		//  */
		// http2: true,

		// /**
		//  * Make the HTTP connection secure. Secure connection is neccessary for web browsers to work with the `HTTP/2` protocol.
		//  */
		// https: {
		//   // Fallback support for the clients still communicating over the HTTP/1 protocol.
		//   allowHTTP1: true,
		//   cert: readFileSync(join(import.meta.dirname, "../cert.pem")),
		//   key: readFileSync(join(import.meta.dirname, "../key.pem")),
		// },

		/**
		 * For configuring the pino logger that comes integrated with fastify. More information at this link: {@link https://fastify.dev/docs/latest/Reference/Logging/}
		 */
		logger: {
			level: envConfig.API_LOG_LEVEL,
			transport:
				envConfig.API_ENVIRONMENT !== "production"
					? {
							target: "pino-pretty",
						}
					: undefined,
		},
	}).withTypeProvider<TypeBoxTypeProvider>();

	fastify.decorate("envConfig", envConfig);

	/**
	 * THE FASTIFY PLUGIN LOAD ORDER MATTERS, PLUGINS MIGHT BE DEPENDENT ON OTHER PLUGINS ALREADY BEING REGISTERED. THEREFORE THE ORDER OF REGISTRATION MUST BE MAINTAINED UNLESS THE DEVELOPER KNOWS WHAT THEY'RE DOING.
	 */

	/**
	 * More information at this link:- {@link https://github.com/fastify/fastify-rate-limit}
	 */
	fastify.register(fastifyRateLimit, {});

	/**
	 * More information at this link:- {@link https://github.com/fastify/fastify-cors}
	 */
	fastify.register(fastifyCors, {});

	/**
	 * More information at this link:- {@link https://github.com/fastify/fastify-helmet}
	 */
	fastify.register(fastifyHelmet, {
		/**
		 * This field needs to be `false` for mercurius graphiql web client to work.
		 */
		contentSecurityPolicy: false,
	});

	// TODO:- AUTHORIZATION FOR STATIC FILE ACCESS NEEDS TO BE IMPLEMENTED

	/**
	 * More information at this link: {@link https://github.com/fastify/fastify-static}
	 */
	// fastify.register(fastifyStatic, {
	// 	prefix: "/images",
	// 	root: join(import.meta.dirname, "../images"),
	// });

	// fastify.register(fastifyStatic, {
	// 	/**
	// 	 * The reply decorator has already been registered by the the previous plugin registration.
	// 	 */
	// 	decorateReply: false,
	// 	prefix: "/videos",
	// 	root: join(import.meta.dirname, "../videos"),
	// });

	// /**
	//  * Integrates a drizzle client instance on a namespace `drizzleClient` on the global fastify instance.
	//  *
	//  * @example
	//  * const user = await fastify.drizzleClient.query.usersTable.findFirst();
	//  */
	// fastify.register(async (fastify) => {
	// 	const sql = postgres({
	// 		database: fastify.envConfig.API_POSTGRES_DATABASE,
	// 		host: fastify.envConfig.API_POSTGRES_HOST,
	// 		password: fastify.envConfig.API_POSTGRES_PASSWORD,
	// 		port: fastify.envConfig.API_POSTGRES_PORT,
	// 		ssl: fastify.envConfig.API_POSTGRES_SSL_MODE,
	// 		user: fastify.envConfig.API_POSTGRES_USER,
	// 	});

	// 	try {
	// 		fastify.log.info("Checking the connection to the postgres server.");
	// 		await sql`select 1`;
	// 		fastify.log.info("Successfully connected to the postgres server.");
	// 	} catch (error) {
	// 		throw new Error("Failed to connect to the postgres server", {
	// 			cause: error,
	// 		});
	// 	}

	// 	/**
	// 	 * Gracefully close the postgres connection when the fastify server is shutting down.
	// 	 */
	// 	fastify.addHook("onClose", async () => {
	// 		try {
	// 			fastify.log.info(
	// 				"Closing all the connections in the postgres connection pool.",
	// 			);
	// 			await sql.end();
	// 			fastify.log.info(
	// 				"Successfully closed all the connections in the postgres connection pool.",
	// 			);
	// 		} catch (error) {
	// 			fastify.log.error(
	// 				{ error },
	// 				"Something went wrong while trying to close all the connections in the postgres connection pool.",
	// 			);
	// 		}
	// 	});

	// 	const drizzleClient = drizzle(sql, {
	// 		schema: drizzleSchema,
	// 	});

	// 	// try {
	// 	// 	fastify.log.info(
	// 	// 		"Running the drizzle migration files against the postgres database.",
	// 	// 	);
	// 	// 	await migrate(drizzleClient, {
	// 	// 		migrationsFolder: "../../migrations",
	// 	// 	});
	// 	// 	fastify.log.info(
	// 	// 		"Successfully ran the drizzle migration files against the postgres database.",
	// 	// 	);
	// 	// } catch (error) {
	// 	// 	throw new Error(
	// 	// 		"Failed to run the drizzle migration files against the postgres database.",
	// 	// 		{
	// 	// 			cause: error,
	// 	// 		},
	// 	// 	);
	// 	// }

	// 	fastify.decorate("drizzleClient", drizzleClient);
	// });

	// /**
	//  * Integrates a minio client instance on a namespace `minioClient` on the global fastify instance.
	//  *
	//  * @example
	//  * const buckets = await fastify.minioClient.listBuckets();
	//  */
	// fastify.register(async (fastify) => {
	// 	const minioClient = new MinioClient({
	// 		accessKey: fastify.envConfig.API_MINIO_ACCESS_KEY,
	// 		endPoint: fastify.envConfig.API_MINIO_END_POINT,
	// 		port: fastify.envConfig.API_MINIO_PORT,
	// 		secretKey: fastify.envConfig.API_MINIO_SECRET_KEY,
	// 		useSSL: fastify.envConfig.API_MINIO_USE_SSL,
	// 	});

	// 	try {
	// 		fastify.log.info("Checking the connection to the minio server.");
	// 		await minioClient.listBuckets();
	// 		fastify.log.info("Successfully connected to the minio server.");
	// 	} catch (error) {
	// 		throw new Error("Failed to connect to the minio server", {
	// 			cause: error,
	// 		});
	// 	}

	// 	fastify.decorate("minioClient", minioClient);
	// });

	// /**
	//  * Integrates a redis client instance on a namespace `redisClient` on the global fastify instance.
	//  *
	//  * @example
	//  * const message = await fastify.redis.ping();
	//  */
	// fastify.register(async (fastify) => {
	// 	await fastify.register(fastifyRedis, {
	// 		host: fastify.envConfig.API_REDIS_HOST,
	// 		port: fastify.envConfig.API_REDIS_PORT,
	// 	});

	// 	try {
	// 		fastify.log.info("Checking the connection to the redis server.");
	// 		await fastify.redis.ping();
	// 		fastify.log.info("Successfully connected to the redis server.");
	// 	} catch (error) {
	// 		throw new Error("Failed to connect to the redis server", {
	// 			cause: error,
	// 		});
	// 	}
	// });

	fastify.register(routes, {});

	// /**
	//  * Makes sure that the fastify server is ready to start listening for requests.
	//  */
	// await fastify.ready();

	return fastify;
};
