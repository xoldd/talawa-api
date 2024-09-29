import closeWithGrace from "close-with-grace";
import { getEnvConfig } from "./envConfig.js";
import { initializeFastify } from "./initializeFastify.js";

const fastify = await initializeFastify({
	envConfig: getEnvConfig(),
});

/**
 * Makes sure that the server exits gracefully without pending tasks and memory leaks.
 */
closeWithGrace(async ({ err, signal }) => {
	if (err !== undefined) {
		fastify.log.info(
			{
				err,
			},
			"Error encountered, gracefully shutting down the server.",
		);
	} else if (signal !== undefined) {
		fastify.log.info(
			`Signal '${signal}' received, gracefully shutting down the server.`,
		);
	} else {
		fastify.log.info("Gracefully shutting down the server.");
	}

	await fastify.close();
});

/**
 * Starts the server.
 */
fastify.listen(
	{
		host: fastify.envConfig.API_HOST,
		port: fastify.envConfig.API_PORT,
	},
	(error) => {
		if (error) {
			fastify.log.error(
				{ error },
				"Error encountered while starting the server.",
			);
			process.exit(1);
		}
	},
);
