// import { dirname, join } from "node:path";
// import { fileURLToPath } from "node:url";
// import fastifyAutoload from "@fastify/autoload";
import fastifyCors from "@fastify/cors";
import fastifyHelmet from "@fastify/helmet";
import fastifyRateLimit from "@fastify/rate-limit";
// import fastifyStatic from "@fastify/static";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
// import { readFileSync } from "node:fs";
import Fastify from "fastify";
import type { EnvConfig } from "./envConfig.js";
import drizzleClientPlugin from "./plugins/drizzleClient.js";
import minioClientPlugin from "./plugins/minioClient.js";
import redisClientPlugin from "./plugins/redisClient.js";
// import nodemailerPlugin from "./plugins/nodemailer.js";
import graphqlRoute from "./routes/graphql.js";
import healthRoute from "./routes/health.js";

/**
 * This function is used to set up the fastify server.
 */
export const initializeFastify = async ({
	envConfig,
}: {
	envConfig: EnvConfig;
}) => {
	/**
	 * This is the root fastify instance. It could be considered as the root node of a directed acyclic graph(DAG) of fastify plugins.
	 */
	const fastify = Fastify({
		// Maximum size in bytes of the body of any request that the server will accept. More
		// information here:- {@link https://fastify.dev/docs/latest/Reference/Server/#bodylimit}
		//
		// This limit is defined on a global server context therefore it will be applied to all
		// requests to the server. This is not practical for all use cases and should instead be
		// applied on a per-route/per-module basis. For example, 50 megabytes might not be sufficient
		// for many static file transfers, similarly, 50 megabytes is too big for simple JSON requests.
		bodyLimit: 52428800,

		// // Start fastify server over the HTTP/2 protocol. More information at this link:- {@link https://fastify.dev/docs/latest/Reference/HTTP2/}
		// http2: true,

		// // Make the HTTP connection secure. Secure connection is neccessary for web browsers to
		// // work with the HTTP/2 protocol.
		// https: {
		//   // Fallback support for the clients still communicating over the HTTP/1 protocol.
		//   allowHTTP1: true,
		//   cert: readFileSync(join(import.meta.dirname, "../cert.pem")),
		//   key: readFileSync(join(import.meta.dirname, "../key.pem")),
		// },

		// For configuring the pino logger that comes integrated with fastify. More information at this link:-
		// {@link https://fastify.dev/docs/latest/Reference/Logging/}
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

	// THE FASTIFY PLUGIN LOAD ORDER MATTERS, PLUGINS MIGHT BE DEPENDENT ON OTHER PLUGINS ALREADY BEING REGISTERED. THEREFORE THE ORDER OF REGISTRATION MUST BE MAINTAINED UNLESS THE DEVELOPER KNOWS WHAT THEY'RE DOING.

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
		 * This field is set to `false` for graphiql to work.
		 */
		contentSecurityPolicy: false,
	});

	// TODO:- AUTHORIZATION FOR STATIC FILE ACCESS NEEDS TO BE IMPLEMENTED

	// // More information at this link:- {@link https://github.com/fastify/fastify-static}
	// fastify.register(fastifyStatic, {
	// 	prefix: "/images",
	// 	root: join(import.meta.dirname, "../images"),
	// });

	// fastify.register(fastifyStatic, {
	// 	// The reply decorator has already been registered by the the previous plugin registration.
	// 	decorateReply: false,
	// 	prefix: "/videos",
	// 	root: join(import.meta.dirname, "../videos"),
	// });

	// fastify.register(drizzleClientPlugin, {});

	// fastify.register(minioClientPlugin, {});

	// fastify.register(redisClientPlugin, {});

	fastify.register(graphqlRoute, {});

	fastify.register(healthRoute, {});

	// fastify.register(nodemailerPlugin, {});

	// // Registers the fastify route plugins.
	// fastify.register(fastifyAutoload, {
	// 	// Directory to look for fastify route plugins.
	// 	dir: join(import.meta.dirname, "./routes"),

	// 	// If set to 'true' it always use `await import` to load plugins or hooks.
	// 	forceESM: true,

	// 	// Only registers the default exports of route plugins from files that have their names
	// 	// ending with `route.ts`, `route.js`, `route.cjs` or `route.mjs`.
	// 	matchFilter: /^.*route(?:\.ts|\.js|\.cjs|\.mjs)$/,
	// });

	/**
	 * Makes sure that the fastify server is ready to start listening for requests.
	 */
	await fastify.ready();

	return fastify;
};

declare module "fastify" {
	interface FastifyInstance {
		envConfig: EnvConfig;
	}
}
