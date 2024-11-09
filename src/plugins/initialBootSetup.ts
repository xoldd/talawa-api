// import { hash } from "@node-rs/argon2";
// import type { FastifyPluginAsync } from "fastify";
// import fastifyPlugin from "fastify-plugin";
// import { User } from "../../models";
// import { AppUserProfile } from "../../models/AppUserProfile";

// // TODO:- Will be replaced with a different implementation in the future.

// /**
//  * This plugin handles tasks or checks that have to be performed at the intial startup
//  * of this application.
//  *
//  * @example
//  * import initialBootSetupPlugin from "./plugins/initialBootSetup";
//  *
//  * fastify.register(initialBootSetupPlugin, {});
//  */
// const plugin: FastifyPluginAsync = async (fastify) => {
// 	const lastResortSuperAdminExists = await User.exists({
// 		email: fastify.envConfig.LAST_RESORT_SUPERADMIN_EMAIL,
// 	});

// 	// If the database doesn't contain at least one superadmin user, we create a superadmin
// 	// user using the credentials provided for the last resort superadmin at the application
// 	// startup time.
// 	if (lastResortSuperAdminExists === null) {
// 		const hashedPassword = await hash(
// 			fastify.envConfig.LAST_RESORT_SUPERADMIN_PASSWORD,
// 		);

// 		const user = await User.create({
// 			email: fastify.envConfig.LAST_RESORT_SUPERADMIN_EMAIL,
// 			firstName: "first_name",
// 			lastName: "last_name",
// 			password: hashedPassword,
// 		});

// 		const appUserProfile = await AppUserProfile.create({
// 			appLanguageCode: "en",
// 			isSuperAdmin: true,
// 			userId: user._id,
// 		});

// 		await User.updateOne(
// 			{
// 				_id: user._id,
// 			},
// 			{
// 				appUserProfileId: appUserProfile._id,
// 			},
// 		);
// 	}
// };

// export default fastifyPlugin(plugin, {
// 	name: "initialBootSetup",
// });
