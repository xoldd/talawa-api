import type { FastifyPluginAsync } from "fastify";
import graphQLRoute from "./graphql.route.js";
import healthRoute from "./health.route.js";

/**
 * This fastify route plugin is used to initialize the graphql endpoint on the fastify server
 * and handles the configuration for it.
 */
export const route: FastifyPluginAsync = async (fastify) => {
	fastify.register(healthRoute);
	fastify.register(graphQLRoute);
};

export default route;
