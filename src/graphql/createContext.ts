import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import type { FastifyBaseLogger, FastifyReply, FastifyRequest } from "fastify";
import type { Client as MinioClient } from "minio";
import type * as drizzleSchema from "~/src/drizzle/schema.js";
// import type { PubSub, YogaInitialContext, YogaLogger } from "graphql-yoga";
import type { EnvConfig } from "~/src/envConfig.js";
import type { TalawaPubSub } from "./pubsub.js";
// import type { TalawaPubSubPublishArgsByKey } from "./pubSub.js";

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

export type Message = {
	body: string;
	id: string;
};

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

/**
 * Type of the context object the is explicitly passed by us to the graphql resolvers on each request at runtime. This context must not contain transport protocol specific information as that would require implementing the graphql resolvers in a transport protocol dependent way.
 */
type CreateContextResult = {
	messages: Message[];
	drizzleClient: PostgresJsDatabase<typeof drizzleSchema>;
	minioClient: MinioClient;
};

/**
 * Type of the context object implicitly passed by mercurius to the graphql resolvers on each request at runtime.
 */
type ImplicitMercuriusContext = {
	pubsub: TalawaPubSub;
};

/**
 * Type of the context object passed to the graphql resolvers on each request at runtime. All the transport protocol specific information should be dealt with within this function and this function must return a transport protocol agnostic context for usage in the graphql resolvers.
 */
export type GraphQLContext = CreateContextResult & ImplicitMercuriusContext;

export const createContext = async ({
	drizzleClient,
	messages,
	minioClient,
}: InitialContext): Promise<CreateContextResult> => {
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
