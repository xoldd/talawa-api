import type { FastifyPluginAsync } from "fastify";
import graphqlRoute from "./graphql.js";
import healthRoute from "./health.js";

/**
 * This fastify route plugin is used to initialize the graphql endpoint on the fastify server
 * and handles the configuration for it.
 */
export const route: FastifyPluginAsync = async (fastify) => {
	fastify.register(healthRoute);
	fastify.register(graphqlRoute);
};

export default route;
