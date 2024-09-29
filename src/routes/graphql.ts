// import fastifyWebsocket from "@fastify/websocket";
// import { makeHandler } from "graphql-ws/lib/use/@fastify/websocket";
// import { createRedisEventTarget } from "@graphql-yoga/redis-event-target";
import { EnvelopArmor } from "@escape.tech/graphql-armor";
import type { FastifyPluginAsync } from "fastify";
import { createPubSub, createYoga } from "graphql-yoga";
import {
	type GraphQLContext,
	createContext,
} from "~/src/graphql/createContext.js";
import type { TalawaPubSubPublishArgsByKey } from "~/src/graphql/pubSub.js";
import { schema } from "~/src/graphql/schema.js";

/**
 * This fastify route plugin is used to initialize the graphql endpoint on the fastify server
 * and handles the configuration for it.
 */
export const route: FastifyPluginAsync = async (fastify) => {
	/**
	 * This module handles many issues related to graphQL security. More info can be found
	 * here:- {@link https://escape.tech/graphql-armor/}. It has default configurations for
	 * all the plugins it provides. More info can be found here:- {@link https://escape.tech/graphql-armor/docs/category/plugins}.
	 * Many plugins from this package might not be needed if persisted queries are being used
	 * for the communication between the graphQL clients and the server. More info can be found
	 * here:- {@link https://the-guild.dev/graphql/yoga-server/docs/features/persisted-operations}
	 */
	const graphQLArmor = new EnvelopArmor({
		blockFieldSuggestion: {
			/**
			 * Having field suggestions in development environment is safe.
			 */
			enabled: fastify.envConfig.API_ENVIRONMENT === "production",
		},
	});

	const pubSub = createPubSub<TalawaPubSubPublishArgsByKey>({
		// eventTarget: createRedisEventTarget({
		// 	publishClient: fastify.redis,
		// 	subscribeClient: fastify.redis,
		// }),
	});

	/**
	 * This is the global instance of the graphQL yoga server that has the same lifetime as the
	 * fastify server.
	 */
	const yogaServer = createYoga<Record<never, never>, GraphQLContext>({
		/**
		 * Anything requiring a lifetime longer than a single graphQL request should not be defined in this function's scope because this function is evaluated on each graphQL request.
		 */
		context: (initialContext) =>
			createContext({
				...initialContext,
				envConfig: fastify.envConfig,
				log: fastify.log,
				pubSub,
			}),
		/**
		 * Configurtion for the graphiql web-based IDE.
		 */
		graphiql: fastify.envConfig.API_ENVIRONMENT !== "production",
		// graphiql:
		// 	envConfig.API_ENVIRONMENT === "production"
		// 		? false
		// 		: {
		// 				subscriptionsProtocol: "WS",
		// 			},
		/**
		 * Configuring the multipart file request processing. More information here:-
		 * {@link https://the-guild.dev/graphql/yoga-server/docs/features/file-uploads#configuring-multipart-request-processing-only-for-nodejs}
		 */
		/**
		 * GraphQL yoga has a built-in logger but it isn't supposed to be used in production.
		 * Also, for uniformity across the logs the logger provided by the fastify server is
		 * used.
		 */
		logging: {
			debug: (...args) => {
				for (const arg of args) {
					fastify.log.debug(arg);
				}
			},
			info: (...args) => {
				for (const arg of args) {
					fastify.log.info(arg);
				}
			},
			warn: (...args) => {
				for (const arg of args) {
					fastify.log.warn(arg);
				}
			},
			error: (...args) => {
				for (const arg of args) {
					fastify.log.error(arg);
				}
			},
		},
		plugins: [...graphQLArmor.protect().plugins],
		schema,
	});

	/**
	 * This enables Websocket protocol on this route.
	 */
	// fastify.register(fastifyWebsocket, {});

	/**
	 * This makes fastify ignore and forward requests with `multipart/form-data` bodies to the graphQL server. More information here: {@link https://the-guild.dev/graphql/yoga-server/docs/integrations/integration-with-fastify#add-dummy-content-type-parser-for-file-uploads}
	 */
	fastify.addContentTypeParser(
		"multipart/form-data",
		{},
		(_request, _payload, done) => done(null),
	);

	/**
	 * The incoming HTTP request is passed to the graphQL server and the response is handled
	 * using fastify's reply API. More information about the reply API here:-
	 * {@link https://www.fastify.io/docs/latest/Reply/}
	 */
	fastify.route({
		handler: async (request, reply) => {
			/**
			 * Anything requiring a lifetime longer than a single graphQL request should not be
			 * initialized in this function's scope.
			 */
			/**
			 * This is a WHATWG Fetch spec compliant Response object returned from the graphQL
			 * server. More information here:- {@link https://fetch.spec.whatwg.org/#responses}
			 */
			const response = await yogaServer.handleNodeRequestAndResponse(
				request,
				reply,
			);
			response.headers.forEach((value, key) => {
				reply.header(key, value);
			});
			reply.status(response.status);
			reply.send(response.body);
			return reply;
		},
		/**
		 * GraphQL servers only operate over HTTP methods GET and POST. The OPTIONS method is
		 * required for preflight requests.
		 */
		method: ["GET", "OPTIONS", "POST"],
		/**
		 * Annotating the endpoint at which the graphQL server will be served on.
		 */
		url: "/graphql",
		// /**
		//  * Handler for graphql requests that are made over the Websocket protocol.
		//  */
		// wsHandler: makeHandler({
		// 	schema,
		// }),
	});
};

export default route;
