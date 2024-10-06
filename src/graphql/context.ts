import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import type { Client as MinioClient } from "minio";
import type * as drizzleSchema from "~/src/drizzle/schema.js";
import type { TalawaPubSub } from "./pubsub.js";

export type Message = {
	body: string;
	id: string;
};

/**
 * Type of the context object implicitly passed by mercurius to the graphql resolvers on each request at runtime.
 */
export type ImplicitMercuriusContext = {
	pubsub: TalawaPubSub;
};

/**
 * Type of the context object the is explicitly passed by us to the graphql resolvers on each request at runtime. This context must not contain transport protocol specific information as that would require implementing the graphql resolvers in a transport protocol dependent way.
 */
export type ExplicitGraphQLContext = {
	messages: Message[];
	drizzleClient: PostgresJsDatabase<typeof drizzleSchema>;
	minioClient: MinioClient;
};

/**
 * Type of the context object passed to the graphql resolvers on each request at runtime. All the transport protocol specific information should be dealt with within this function and this function must return a transport protocol agnostic context for usage in the graphql resolvers.
 */
export type GraphQLContext = ExplicitGraphQLContext & ImplicitMercuriusContext;
