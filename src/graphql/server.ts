import type { YogaLogger } from "graphql-yoga";
import type { TalawaPubSub } from "./pubSub.js";

/**
 * Type of the initial context passed to the graphQL server by the fastify request handler.
 */
export type GraphQLServerContext = {
	apiRootUrl: string;
};
