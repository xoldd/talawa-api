import type { FastifyPluginAsync } from "fastify";

/**
 * This fastify route plugin is used to initialize the graphql endpoint on the fastify server
 * and handles the configuration for it.
 */
export const healthcheck: FastifyPluginAsync = async (fastify) => {
	fastify.get("/healthcheck", async (_request, reply) =>
		reply.status(200).send({
			health: "ok",
		}),
	);
};

export default healthcheck;
