import fastifyRedis from "@fastify/redis";
import fastifyPlugin from "fastify-plugin";

/**
 * This plugin handles integrating a redis client instance on a namespace `redisClient`
 * on a fastify instance.
 *
 * @example
 * import redisPlugin from "./plugins/redis";
 *
 * await fastify.register(redisPlugin, {});
 *
 * // Usage.
 * const message = await fastify.redis.ping();
 */
export default fastifyPlugin(
	async (fastify) => {
		await fastify.register(fastifyRedis, {
			host: fastify.envConfig.API_REDIS_HOST,
			port: fastify.envConfig.API_REDIS_PORT,
		});

		try {
			fastify.log.info("Checking the connection to the redis server.");
			await fastify.redis.ping();
			fastify.log.info("Successfully connected to the redis server.");
		} catch (error) {
			throw new Error("Failed to connect to the redis server", {
				cause: error,
			});
		}
	},
	{
		encapsulate: false,
		name: "redis",
	},
);
