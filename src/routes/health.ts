import type { FastifyPluginAsync } from "fastify";

/**
 * This fastify route plugin is used to initialize the graphql endpoint on the fastify server
 * and handles the configuration for it.
 */
export const route: FastifyPluginAsync = async (fastify) => {
	fastify.get("/health", async (_request, reply) =>
		reply.status(200).send({
			health: "ok",
		}),
	);
};

export default route;
