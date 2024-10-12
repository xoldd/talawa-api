import fastifyPlugin from "fastify-plugin";
import { graphql } from "./graphql.js";
import { healthcheck } from "./healthcheck.js";

/**
 * This fastify route plugin is used to initialize the graphql endpoint on the fastify server
 * and handles the configuration for it.
 */
export const routes = fastifyPlugin(async (fastify) => {
	fastify.register(healthcheck, {});
	fastify.register(graphql, {});
});

export default routes;
