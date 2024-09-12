import { EnvelopArmor } from "@escape.tech/graphql-armor";
import { useDisableIntrospection } from "@graphql-yoga/plugin-disable-introspection";
import {
	type YogaLogger,
	type YogaServerInstance,
	createYoga,
} from "graphql-yoga";
// import { makeHandler } from "graphql-ws/lib/use/@fastify/websocket";
import type { EnvConfig } from "../env_config_schema.js";
import { type GraphQLUserContext, createContext } from "./createContext.js";
import { pubSub } from "./pubSub.js";
import { schema } from "./schema/index.js";
// import { createFetch } from "@whatwg-node/fetch";

/**
 * Type of the initial context passed to the graphQL server by the fastify request handler.
 */
export type GraphQLServerContext = {
	apiRootUrl: string;
};

/**
 * Type of fields required by the first argument of the `createGraphQLHTTPServer` function.
 */
export type CreateGraphQLHTTPServerArgs = {
	envConfig: EnvConfig;
	log: YogaLogger;
};

/**
 * This function is used to create an instance of the graphQL yoga server that will be used
 * to handle all the graphQL requests.
 */
export const createGraphQLYogaServer = ({
	envConfig,
	log,
}: CreateGraphQLHTTPServerArgs): YogaServerInstance<
	GraphQLServerContext,
	GraphQLUserContext
> => {
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
			enabled: envConfig.API_ENVIRONMENT === "production",
		},
	});

	return createYoga<GraphQLServerContext, GraphQLUserContext>({
		context: (initialContext) => {
			/**
			 * Anything requiring a lifetime longer than a single graphQL request should not be
			 * defined in this function's scope.
			 */

			return createContext({
				...initialContext,
				envConfig,
				/**
				 * The publish/subscribe bus must have a global lifetime so it is not initialized
				 * inside this function's scope.
				 */
				pubSub,
			});
		},

		/**
		 * Configurtion for the graphiql web-based IDE.
		 */
		graphiql: envConfig.API_ENVIRONMENT !== "production",
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
		// fetchAPI: createFetch({
		//   formDataLimits: {},
		// }),

		/**
		 * GraphQL yoga has a built-in logger but it isn't supposed to be used in production.
		 * Also, for uniformity across the logs the logger provided by the fastify server is
		 * used.
		 */
		logging: {
			debug: (...args) => {
				for (const arg of args) {
					log.debug(arg);
				}
			},
			info: (...args) => {
				for (const arg of args) {
					log.info(arg);
				}
			},
			warn: (...args) => {
				for (const arg of args) {
					log.warn(arg);
				}
			},
			error: (...args) => {
				for (const arg of args) {
					log.error(arg);
				}
			},
		},
		plugins: [
			...graphQLArmor.protect().plugins,
			/**
			 * https://the-guild.dev/graphql/yoga-server/docs/features/introspection
			 */
			useDisableIntrospection(),
		],
		schema,
	});
};

/**
 * This function is used to create an instance of the graphql-ws handler that will be used
 * to handle all the graphQL requests that are made over the websockets protocol.
 */
// export const createGraphQLWSServer = () => {
//   return makeHandler({
//     schema,
//   });
// };
