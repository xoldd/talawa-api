import type { FastifyPluginAsync } from "fastify";
import { Client as MinioClient } from "minio";

/**
 * Integrates a minio client instance on a namespace `minioClient` on the global fastify instance.
 *
 * @example
 * import minioClientPlugin from "~src/plugins/minioClient.js";
 *
 * fastify.register(minioClientPlugin, {});
 * const buckets = await fastify.minioClient.listBuckets();
 */
export const minioClientPlugin: FastifyPluginAsync = async (fastify) => {
	const minioClient = new MinioClient({
		accessKey: fastify.envConfig.API_MINIO_ACCESS_KEY,
		endPoint: fastify.envConfig.API_MINIO_END_POINT,
		port: fastify.envConfig.API_MINIO_PORT,
		secretKey: fastify.envConfig.API_MINIO_SECRET_KEY,
		useSSL: fastify.envConfig.API_MINIO_USE_SSL,
	});

	try {
		fastify.log.info("Checking the connection to the minio server.");
		await minioClient.listBuckets();
		fastify.log.info("Successfully connected to the minio server.");
	} catch (error) {
		throw new Error("Failed to connect to the minio server", {
			cause: error,
		});
	}

	fastify.decorate("minioClient", minioClient);
};

export default minioClientPlugin;
