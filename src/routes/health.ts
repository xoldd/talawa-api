import type { FastifyPluginAsync } from "fastify";

/**
 * This fastify route plugin is used to expose a healthcheck endpoint for docker to make healthcheck requests against.
 */
export const route: FastifyPluginAsync = async (fastify) => {
	fastify.get("/health", async (_request, reply) =>
		reply.status(200).send({
			health: "ok",
		}),
	);
};

export default route;
