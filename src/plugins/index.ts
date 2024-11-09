import fastifyPlugin from "fastify-plugin";
import drizzleClient from "./drizzleClient";
import minioClient from "./minioClient";

export const plugins = fastifyPlugin(async (fastify) => {
	fastify.register(drizzleClient);
	// fastify.register(minioClient);
});

export default plugins;
