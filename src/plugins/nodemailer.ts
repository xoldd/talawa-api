// import fastifyPlugin from "fastify-plugin";
// import { type Transporter, createTransport } from "nodemailer";
// import type SMTPTransport from "nodemailer/lib/smtp-transport";

// /**
//  * This plugin handles integrating a nodemailer transporter instance on a namespace `mailer`
//  * on a fastify instance.
//  *
//  * @example
//  * import nodemailerPlugin from "./plugins/nodemailer";
//  *
//  * fastify.register(nodemailerPlugin, {});
//  *
//  * // Usage.
//  * fastify.nodemailer.sendMail({});
//  */
// export default fastifyPlugin(
// 	async (fastify) => {
// 		const transporter = createTransport(
// 			fastify.envConfig.IS_SMTP
// 				? {
// 						auth: {
// 							pass: fastify.envConfig.SMTP_PASSWORD,
// 							user: fastify.envConfig.SMTP_USERNAME,
// 						},
// 						host: fastify.envConfig.SMTP_HOST,
// 						port: fastify.envConfig.SMTP_PORT,
// 						secure: fastify.envConfig.IS_SMTP_SSL_TLS,
// 					}
// 				: {
// 						auth: {
// 							pass: fastify.envConfig.MAIL_PASSWORD,
// 							user: fastify.envConfig.MAIL_USERNAME,
// 						},

// 						// TODO:- This should probably be configurable using an environment variable.
// 						service: "gmail",
// 					},
// 			{
// 				from: fastify.envConfig.IS_SMTP
// 					? fastify.envConfig.SMTP_USERNAME
// 					: // TODO:- This should probably be configurable using an environment variable
// 						// or it should just be mandatory to provide the `SMTP_USERNAME` environement
// 						// variable
// 						"Talawa<>noreply@gmail.com",
// 			},
// 		);

// 		// Gracefully close the nodemailer transporter instance when the fastify server is shutting down.
// 		fastify.addHook("onClose", async () => {
// 			try {
// 				fastify.log.info(
// 					"Closing all the connections in the nodemailer transporter connection pool.",
// 				);
// 				transporter.close();
// 				fastify.log.info(
// 					"Successfully closed all the connections in the nodemailer transporter connection pool.",
// 				);
// 			} catch (error) {
// 				fastify.log.error(
// 					{ error },
// 					"Something went wrong while trying to close all the connections in the nodemailer transporter connection pool.",
// 				);
// 			}
// 		});

// 		// Register the nodemailer transporter on the namespace `mailer` on the fastify instance.
// 		fastify.decorate("nodemailer", transporter);
// 	},
// 	{
// 		name: "nodemailer",
// 	},
// );

// export type Nodemailer = Transporter<SMTPTransport.SentMessageInfo>;

// declare module "fastify" {
// 	interface FastifyInstance {
// 		nodemailer: Nodemailer;
// 	}
// }
