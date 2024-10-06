import fastifyPlugin from "fastify-plugin";
import { graphql } from "./graphql.js";
import { health } from "./health.js";

/**
 * This fastify route plugin is used to initialize the graphql endpoint on the fastify server
 * and handles the configuration for it.
 */
export const routes = fastifyPlugin(async (fastify) => {
	fastify.register(health, {});
	fastify.register(graphql, {});
});

export default routes;
