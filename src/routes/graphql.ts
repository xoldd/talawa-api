// import fastifyWebsocket from "@fastify/websocket";
// import { makeHandler } from "graphql-ws/lib/use/@fastify/websocket";
// import { createRedisEventTarget } from "@graphql-yoga/redis-event-target";
// import { EnvelopArmor } from "@escape.tech/graphql-armor";
// import type { TalawaPubSubPublishArgsByKey } from "~/src/graphql/pubSub.js";
// import { createPubSub, createYoga, type PubSub, type YogaInitialContext, type YogaLogger } from "graphql-yoga";
// import type { TalawaPubSubPublishArgsByKey } from "~/src/graphql/pubSub.js";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import type { FastifyBaseLogger, FastifyReply, FastifyRequest } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { mercurius } from "mercurius";
import type { Client as MinioClient } from "minio";
import type * as drizzleSchema from "~/src/drizzle/schema.js";
import type { EnvConfig } from "~/src/envSchema.js";
import type { ExplicitGraphQLContext, Message } from "~/src/graphql/context.js";
import { schema } from "~/src/graphql/schema.js";

/**
 * Type of the initial context argument provided to the createContext function by the graphql server.
 */
type InitialContext = {
	drizzleClient: PostgresJsDatabase<typeof drizzleSchema>;
	envConfig: EnvConfig;
	log: FastifyBaseLogger;
	messages: Message[];
	minioClient: MinioClient;
	request: FastifyRequest;
} & (
	| {
			isSubscription: false;
			reply: FastifyReply;
	  }
	| {
			isSubscription: true;
			socket: WebSocket;
	  }
);

export const createContext = async ({
	drizzleClient,
	messages,
	minioClient,
}: InitialContext): Promise<ExplicitGraphQLContext> => {
	// /**
	//  * As this function is traversed, this object will be mutated accordingly.
	//  */
	// const authContext: CurrentClientAuthContext = {
	// 	expired: undefined,
	// 	isAuth: false,
	// 	userId: undefined,
	// };

	// const authorizationHeader = request.headers.get("Authorization");

	// if (authorizationHeader !== null) {
	// 	const token = authorizationHeader.split(" ")[1];

	// 	if (token !== undefined && token !== "") {
	// 		try {
	// 			const decodedToken = verify(
	// 				token,
	// 				envConfig.ACCESS_TOKEN_SECRET,
	// 			) as InterfaceJwtTokenPayload;

	// 			authContext.expired = false;
	// 			authContext.userId = decodedToken.userId;
	// 		} catch (error) {
	// 			if (error instanceof TokenExpiredError) {
	// 				authContext.expired = true;
	// 			}
	// 		}
	// 	}
	// }

	// return {
	// 	// ...authContext,
	// 	// pubSub,
	// };

	return {
		drizzleClient,
		messages,
		minioClient,
	};
};

/**
 * This fastify route plugin is used to initialize the graphql endpoint on the fastify server
 * and handles the configuration for it.
 */
export const graphql = fastifyPlugin(async (fastify) => {
	const messages: Message[] = [];

	fastify.register(mercurius, {
		context: (request, reply) =>
			createContext({
				drizzleClient: fastify.drizzleClient,
				envConfig: fastify.envConfig,
				isSubscription: false,
				log: fastify.log,
				messages,
				minioClient: fastify.minioClient,
				request,
				reply,
			}),
		graphiql: {
			enabled: fastify.envConfig.API_ENVIRONMENT !== "production",
		},
		path: "/graphql",
		schema,
		subscription: {
			context: async (socket, request) =>
				await createContext({
					drizzleClient: fastify.drizzleClient,
					envConfig: fastify.envConfig,
					isSubscription: true,
					log: fastify.log,
					messages,
					minioClient: fastify.minioClient,
					request,
					socket,
				}),
			/**
			 * Intervals in milli seconds to wait before sending the `GQL_CONNECTION_KEEP_ALIVE` message to the client to check if the connection is alive. This helps detect disconnected subscription clients and prevent unnecessary data transfer.
			 */
			keepAlive: 1000 * 30,
			// onConnect: (data) => {
			// 	console.log("===========onConnect==============");
			// 	console.log(data);
			// 	console.log("===========onConnect==============");
			// },
			// onDisconnect: async (context) => {
			// 	console.log("===========onDisconnect==============");
			// 	console.log(context);
			// 	console.log("===========onDisconnect==============");
			// },
			verifyClient: (info, next) => {
				next(true);
			},
		},
	});
}, {});

export default graphql;

// /**
//  * Type of authentication context of a client making a request to the graphql server.
//  *
//  * @privateRemarks This type has unintuitive fields and will be changed in the future.
//  */
// export type CurrentClientAuthContext = {
// 	expired: boolean | undefined;
// 	isAuth: false;
// 	userId: string | undefined;
// };

// /**
//  * Type of the initial context argument provided to the createContext function by the
//  * graphql server.
//  */
// type InitialContext = YogaInitialContext & {
// 	envConfig: EnvConfig;
// 	log: YogaLogger;
// 	pubSub: PubSub<TalawaPubSubPublishArgsByKey>;
// };

// type Count = {
// 	value: number;
// };

// /**
//  * Type of the context passed to the graphql resolvers on each request.
//  */
// export type GraphQLContext = {
// 	pubsub: MercuriusPubSub;
// 	pubSub: PubSub<TalawaPubSubPublishArgsByKey>;
// };
// // } & CurrentClientAuthContext;

// /**
//  * This function is responsible for creating a new graphql context that is scoped to each
//  * instance of a graphql request that a client makes to the graphql server. The context
//  * returned from this function is passed as the third argument to the graphql resolvers.
//  * This function should be designed carefully as to not let the HTTP framework specific
//  * details permeate into the graphql resolvers. This avoids coupling the graphql layer
//  * with the HTTP framework that is being used to serve the graphql server. It should also
//  * be made sure that the context returned from this function is not mutable because it is
//  * a piece of shared state between all the graphql resolvers and could introduce weird,
//  * hard to detect bugs and anomalies at runtime. More information about the graphql context
//  * can be found here:- {@link https://the-guild.dev/graphql/yoga-server/docs/features/context#extending-the-initial-context}
//  */
// export const createContext = async ({
// 	envConfig,
// 	log,
// 	params,
// 	pubSub,
// 	// request,
// 	// reply,
// 	waitUntil,
// }: InitialContext): Promise<GraphQLContext> => {
// 	// /**
// 	//  * As this function is traversed, this object will be mutated accordingly.
// 	//  */
// 	// const authContext: CurrentClientAuthContext = {
// 	// 	expired: undefined,
// 	// 	isAuth: false,
// 	// 	userId: undefined,
// 	// };

// 	// const authorizationHeader = request.headers.get("Authorization");

// 	// if (authorizationHeader !== null) {
// 	// 	const token = authorizationHeader.split(" ")[1];

// 	// 	if (token !== undefined && token !== "") {
// 	// 		try {
// 	// 			const decodedToken = verify(
// 	// 				token,
// 	// 				envConfig.ACCESS_TOKEN_SECRET,
// 	// 			) as InterfaceJwtTokenPayload;

// 	// 			authContext.expired = false;
// 	// 			authContext.userId = decodedToken.userId;
// 	// 		} catch (error) {
// 	// 			if (error instanceof TokenExpiredError) {
// 	// 				authContext.expired = true;
// 	// 			}
// 	// 		}
// 	// 	}
// 	// }

// 	return {
// 		// ...authContext,
// 		pubSub,
// 	};
// };

// /**
//  * This fastify route plugin is used to initialize the graphql endpoint on the fastify server
//  * and handles the configuration for it.
//  */
// export const graphql = fastifyPlugin(async (fastify) => {
// 	/**
// 	 * This module handles many issues related to graphql security. More info can be found
// 	 * here:- {@link https://escape.tech/graphql-armor/}. It has default configurations for
// 	 * all the plugins it provides. More info can be found here:- {@link https://escape.tech/graphql-armor/docs/category/plugins}.
// 	 * Many plugins from this package might not be needed if persisted queries are being used
// 	 * for the communication between the graphql clients and the server. More info can be found
// 	 * here:- {@link https://the-guild.dev/graphql/yoga-server/docs/features/persisted-operations}
// 	 */
// 	const graphqlArmor = new EnvelopArmor({
// 		blockFieldSuggestion: {
// 			/**
// 			 * Having field suggestions in development environment is safe.
// 			 */
// 			enabled: fastify.envConfig.API_ENVIRONMENT === "production",
// 		},
// 	});

// 	const pubSub = createPubSub<TalawaPubSubPublishArgsByKey>({
// 		// eventTarget: createRedisEventTarget({
// 		// 	publishClient: fastify.redis,
// 		// 	subscribeClient: fastify.redis,
// 		// }),
// 	});

// 	/**
// 	 * This is the global instance of the graphql yoga server that has the same lifetime as the
// 	 * fastify server.
// 	 */
// 	const yogaServer = createYoga<Record<never, never>, GraphQLContext>({
// 		/**
// 		 * Anything requiring a lifetime longer than a single graphql request should not be defined in this function's scope because this function is evaluated on each graphql request.
// 		 */
// 		context: (initialContext) =>
// 			createContext({
// 				...initialContext,
// 				envConfig: fastify.envConfig,
// 				log: fastify.log,
// 				pubSub,
// 			}),
// 		/**
// 		 * Configurtion for the graphiql web-based IDE.
// 		 */
// 		graphiql: fastify.envConfig.API_ENVIRONMENT !== "production",
// 		// graphiql:
// 		// 	envConfig.API_ENVIRONMENT === "production"
// 		// 		? false
// 		// 		: {
// 		// 				subscriptionsProtocol: "WS",
// 		// 			},
// 		/**
// 		 * Configuring the multipart file request processing. More information here:-
// 		 * {@link https://the-guild.dev/graphql/yoga-server/docs/features/file-uploads#configuring-multipart-request-processing-only-for-nodejs}
// 		 */
// 		/**
// 		 * GraphQL yoga has a built-in logger but it isn't supposed to be used in production.
// 		 * Also, for uniformity across the logs the logger provided by the fastify server is
// 		 * used.
// 		 */
// 		logging: {
// 			debug: (...args) => {
// 				for (const arg of args) {
// 					fastify.log.debug(arg);
// 				}
// 			},
// 			info: (...args) => {
// 				for (const arg of args) {
// 					fastify.log.info(arg);
// 				}
// 			},
// 			warn: (...args) => {
// 				for (const arg of args) {
// 					fastify.log.warn(arg);
// 				}
// 			},
// 			error: (...args) => {
// 				for (const arg of args) {
// 					fastify.log.error(arg);
// 				}
// 			},
// 		},
// 		plugins: [...graphqlArmor.protect().plugins],
// 		schema,
// 	});

// 	/**
// 	 * This enables Websocket protocol on this route.
// 	 */
// 	// fastify.register(fastifyWebsocket, {});

// 	/**
// 	 * This makes fastify ignore and forward requests with `multipart/form-data` bodies to the graphql server. More information here: {@link https://the-guild.dev/graphql/yoga-server/docs/integrations/integration-with-fastify#add-dummy-content-type-parser-for-file-uploads}
// 	 */
// 	fastify.addContentTypeParser(
// 		"multipart/form-data",
// 		{},
// 		(_request, _payload, done) => done(null),
// 	);

// 	/**
// 	 * The incoming HTTP request is passed to the graphql server and the response is handled
// 	 * using fastify's reply API. More information about the reply API here:-
// 	 * {@link https://www.fastify.io/docs/latest/Reply/}
// 	 */
// 	fastify.route({
// 		handler: async (request, reply) => {
// 			/**
// 			 * Anything requiring a lifetime longer than a single graphql request should not be
// 			 * initialized in this function's scope.
// 			 */
// 			/**
// 			 * This is a WHATWG Fetch spec compliant Response object returned from the graphql
// 			 * server. More information here:- {@link https://fetch.spec.whatwg.org/#responses}
// 			 */
// 			const response = await yogaServer.handleNodeRequestAndResponse(
// 				request,
// 				reply,
// 			);
// 			response.headers.forEach((value, key) => {
// 				reply.header(key, value);
// 			});
// 			reply.status(response.status);
// 			reply.send(response.body);
// 			return reply;
// 		},
// 		/**
// 		 * GraphQL servers only operate over HTTP methods GET and POST. The OPTIONS method is
// 		 * required for preflight requests.
// 		 */
// 		method: ["GET", "OPTIONS", "POST"],
// 		/**
// 		 * Annotating the endpoint at which the graphql server will be served on.
// 		 */
// 		url: "/graphql",
// 		// /**
// 		//  * Handler for graphql requests that are made over the Websocket protocol.
// 		//  */
// 		// wsHandler: makeHandler({
// 		// 	schema,
// 		// }),
// 	});
// });
