import { format } from "node:url";
import type { FastifyPluginAsync } from "fastify";
// import fastifyWebsocket from "@fastify/websocket";
import {
	createGraphQLYogaServer,
	//  createGraphQLWSServer
} from "../graphql/server";

/**
 * This fastify route plugin is used to initialize the graphql endpoint on the fastify server
 * and handles the configuration for it.
 */
export const route: FastifyPluginAsync = async (fastify) => {
	/**
	 * This is the global instance of the graphQL yoga server that has the same lifetime as the
	 * fastify server.
	 */
	const yogaServer = createGraphQLYogaServer({
		envConfig: fastify.envConfig,
		log: fastify.log,
	});

	/**
	 * This enables websockets on this route.
	 */
	// fastify.register(fastifyWebsocket, {});

	/**
	 * This makes fastify ignore and forward requests with `multipart/form-data` bodies to the
	 * graphQL server. More infor here:- {@link https://the-guild.dev/graphql/yoga-server/docs/integrations/integration-with-fastify#add-dummy-content-type-parser-for-file-uploads}
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
				{
					/**
					 * The is the object corresponding to the `GraphQLServerContext` type, the fields
					 * passed here are merged with the field corresponding to the `YogaInitialContext`
					 * type and end up as the `intialContext` argument to the `createContext` function
					 * used in the definition of the `createGraphQLHTTPServer` function.
					 */
					apiRootUrl: format({
						host: request.hostname,
						protocol: request.protocol,
					}),
				},
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
		/**
		 * Handler for graphql requests that are made over the websockets protocol.
		 */
		// wsHandler: createGraphQLWSServer(),
	});
};

export default route;
