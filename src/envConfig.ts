import { type Static, Type } from "@sinclair/typebox";
import ajvFormats from "ajv-formats";
import envSchema from "env-schema";

/**
 * THIS FILE CONTAINS JSON SCHEMA DEFINITIONS FOR ALL ENVIRONMENT VARIABLES PASSED TO THE EXECUTION CONTEXT OF TALAWA API FOR CONFIGURING IT.
 */

/**
 * JSON schema of a record of minio client environment variables accessible to the talawa api at runtime.
 */
export const minioClientEnvConfigSchema = Type.Object({
	/**
	 * More information can be found at: {@link https://github.com/minio/minio-js?tab=readme-ov-file#initialize-minio-client}
	 */
	API_MINIO_ACCESS_KEY: Type.String(),
	/**
	 * More information can be found at: {@link https://github.com/minio/minio-js?tab=readme-ov-file#initialize-minio-client}
	 */
	API_MINIO_END_POINT: Type.String(),
	/**
	 * More information can be found at: {@link https://github.com/minio/minio-js?tab=readme-ov-file#initialize-minio-client}
	 */
	API_MINIO_PORT: Type.Number(),
	/**
	 * More information can be found at: {@link https://github.com/minio/minio-js?tab=readme-ov-file#initialize-minio-client}
	 */
	API_MINIO_SECRET_KEY: Type.String(),
	/**
	 * More information can be found at: {@link https://github.com/minio/minio-js?tab=readme-ov-file#initialize-minio-client}
	 */
	API_MINIO_USE_SSL: Type.Boolean(),
});

/**
 * Type of the object containing parsed minio client configuration environment variables.
 */
export type MinioClientEnvConfig = Static<typeof minioClientEnvConfigSchema>;

/**
 * JSON schema of a record of postgres client environment variables accessible to the talawa api at runtime.
 */
export const postgresClientEnvConfigSchema = Type.Object({
	/**
	 * More information at this link: {@link https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNECT-DBNAME}
	 */
	API_POSTGRES_DATABASE: Type.String(),
	/**
	 * More information at this link: {@link https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNECT-HOST}
	 */
	API_POSTGRES_HOST: Type.String(),
	/**
	 * More information at this link: {@link https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNECT-PASSWORD}
	 */
	API_POSTGRES_PASSWORD: Type.String(),
	/**
	 * More information at this link: {@link https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNECT-PORT}
	 */
	API_POSTGRES_PORT: Type.Number(),
	/**
	 * More information at this link: {@link https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNECT-SSLMODE}
	 */
	API_POSTGRES_SSL_MODE: Type.Union([
		Type.Enum(
			{
				allow: "allow",
				prefer: "prefer",
				require: "require",
				verify_full: "verify-full",
			},
			{
				default: "prefer",
			},
		),
		Type.Boolean(),
	]),
	/**
	 * More information at this link: {@link https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNECT-USER}
	 */
	API_POSTGRES_USER: Type.String(),
});

/**
 * Type of the object containing parsed postgres client configuration environment variables.
 */
export type PostgresClientEnvConfig = Static<
	typeof postgresClientEnvConfigSchema
>;

/**
 * JSON schema of a record of redis client environment variables accessible to the talawa api at runtime.
 */
export const redisClientEnvConfigSchema = Type.Object({
	/**
	 * More information at this link: {@link https://github.com/redis/ioredis?tab=readme-ov-file#connect-to-redis}
	 */
	API_REDIS_HOST: Type.String(),
	/**
	 * More information at this link: {@link https://github.com/redis/ioredis?tab=readme-ov-file#connect-to-redis}
	 */
	API_REDIS_PORT: Type.Number(),
});

/**
 * Type of the object containing parsed redis client configuration environment variables.
 */
export type RedisClientEnvConfig = Static<typeof redisClientEnvConfigSchema>;

/**
 * JSON schema of a record of environment variables accessible to the talawa api at runtime.
 */
export const envConfigSchema = Type.Composite([
	minioClientEnvConfigSchema,
	postgresClientEnvConfigSchema,
	redisClientEnvConfigSchema,
	Type.Object({
		// /**
		//  * Used for signing access tokens used for authentication flows.
		//  */
		// ACCESS_TOKEN_SECRET: Type.String(),
		/**
		 * Used for providing the environment in which talawa api should run on.
		 */
		API_ENVIRONMENT: Type.Enum(
			{
				development: "non_production",
				production: "production",
			},
			{
				default: "production",
			},
		),
		/**
		 * Used for providing the host of the domain on which talawa api will run.
		 */
		API_HOST: Type.String({
			default: "127.0.0.1",
		}),
		/**
		 * Used for providing the log level for the logger used in talawa api.
		 *
		 * @privateRemarks
		 * Log levels should only be changed when the developers know what they're doing. Otherwise
		 * the default log level should be used.
		 */
		API_LOG_LEVEL: Type.Enum(
			{
				debug: "debug",
				error: "error",
				fatal: "fatal",
				info: "info",
				trace: "trace",
				warn: "warn",
			},
			{
				default: "info",
			},
		),
		/**
		 * Used for providing the port of the domain on which the server will run.
		 */
		API_PORT: Type.Number({
			default: 8080,
		}),
		// /**
		//  * Used for providing the information whether an SMTP server is being used for mailing
		//  * functionality.
		//  */
		// IS_SMTP: Type.Boolean({
		// 	default: false,
		// }),
		// /**
		//  * Used for providing the information whether the SMTP server is to be communicated over
		//  * a secure connection.
		//  */
		// IS_SMTP_SSL_TLS: Type.Boolean({
		// 	default: false,
		// }),
		// /**
		//  * Used for providing an email that would designnate and ensure the existence of at least
		//  * one super-admin in the talawa api whenever it is started.
		//  */
		// LAST_RESORT_SUPERADMIN_EMAIL: Type.String({
		// 	format: "email",
		// }),
		// /**
		//  * Used for providing the password for authenticating the last resort super-admin.
		//  */
		// LAST_RESORT_SUPERADMIN_PASSWORD: Type.String({
		// 	format: "email",
		// }),
		// /**
		//  * Used for providing the password for authenticating to a mail provider.
		//  */
		// MAIL_PASSWORD: Type.Optional(Type.String()),
		// /**
		//  * Used for providing the username for authenticating to a mail provider.
		//  */
		// MAIL_USERNAME: Type.Optional(Type.String()),
		// /**
		//  * Used for verifying client recaptcha response tokens and also for secure communication
		//  * between the server and google's recaptcha service.
		//  */
		// RECAPTCHA_SECRET_KEY: Type.Optional(Type.String()),
		// /**
		//  * Used for signing refresh tokens used for authentication flows.
		//  */
		// REFRESH_TOKEN_SECRET: Type.String(),
		// /**
		//  * Used for providing the host of the domain on which the SMTP server is running.
		//  */
		// SMTP_HOST: Type.Optional(Type.String()),
		// /**
		//  * Used for providing the password for authenticating to the SMTP server.
		//  */
		// SMTP_PASSWORD: Type.Optional(Type.String()),
		// /**
		//  * Used for providing the port of the domain on which the SMTP server is running.
		//  */
		// SMTP_PORT: Type.Number({
		// 	default: 465,
		// }),
		// /**
		//  * Used for providing the username for authenticating to the SMTP server.
		//  */
		// SMTP_USERNAME: Type.Optional(Type.String()),
	}),
]);

/**
 * Type of the object containing parsed configuration environment variables.
 */
export type EnvConfig = Static<typeof envConfigSchema>;

export const getEnvConfig = (): EnvConfig => {
	return envSchema<EnvConfig>({
		ajv: {
			customOptions: (ajv) => {
				ajvFormats(ajv, {
					formats: ["email", "uri"],
				});
				return ajv;
			},
		},
		schema: envConfigSchema,
	});
};
