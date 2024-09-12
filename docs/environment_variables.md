# About

Talawa api primarily makes use of environment variables to configure the application behavior for different scenarios and use cases. By default most workflows are configured to parse and read environment variables defined in the `.env` file located at the root directory of this project.

Listed below are all the environment variables utilized by different workflows within talawa api.

> Environment variables should be explicitly provided to the container that they're being used for. This is because with changes in implicit environment variables docker cannot know exactly which compose container services should be rebuilt to reflect those changes. There are two ways of doing that, the first way is explicitly typing out each of those environment variables in the `environment` field of the compose container service and the second way is to create separate environment variable files for storing environment variables for each compose container service.

# Talawa api(standalone)

These environment variables are utilized by the talawa api's node.js server itself. As such they  

At runtime, talawa api requires certain environment variables to be defined in its execution context. Some of these environment variables must be provided by you and some are optional to be provided because they might be using a default value or their requirement is dependent on the environment in which talawa api is running.

## API_DEBUGGER_HOST

This environment variable is used to configure the host ip that can access the host port on which talawa api debugger listens to at runtime. More information can be found at [this](https://developer.mozilla.org/en-US/docs/Web/API/URL/host) link.

## API_DEBUGGER_PORT

This environment variable is used to configure the host port on which talawa api debugger listens to at runtime. More information can be found at [this](https://developer.mozilla.org/en-US/docs/Web/API/URL/port) link.

When talawa api debugger is run within a container environment this variable must be assigned a value of `0.0.0.0` for the host system to have access to the port talawa api debugger listens on within the container at runtime.

## API_HOST

This environment variable is used to configure the host ip that can access the host port on which talawa api listens to at runtime. More information can be found at [this](https://developer.mozilla.org/en-US/docs/Web/API/URL/host) link.

When talawa api is run within a container environment this variable must be assigned a value of `0.0.0.0` for the host system to have access to the port talawa api listens on within the container at runtime.

## API_LOG_LEVEL

This environment variable is used to configure the [log level](https://github.com/pinojs/pino/blob/main/docs/api.md#logger-level) for talawa api's [pino.js](https://github.com/pinojs/pino) logger. Possible values are `debug`, `error`, `fatal`, `info`, `trace` and `warn`. More information can be found at [this](https://github.com/pinojs/pino/blob/main/docs/api.md#logger-level) link.

## API_MINIO_ACCESS_KEY

This environment variable is used to configure the access key to the minio server for talawa api's minio client to connect with. More information can be found at [this](https://min.io/docs/minio/linux/developers/javascript/API.html#constructor) link.

## API_MINIO_END_POINT

This environment variable is used to configure the host ip of the minio server for talawa api's minio client to connect with. More information can be found at [this](https://min.io/docs/minio/linux/developers/javascript/API.html#constructor) link.

## API_MINIO_PORT

This environment variable is used to configure the host port of the minio server for talawa api's minio client to connect with. More information can be found at [this](https://min.io/docs/minio/linux/developers/javascript/API.html#constructor) link.


## API_MINIO_SECRET_KEY

This environment variable is used to configure the secret key to the minio server for talawa api's minio client to connect with. More information can be found at [this](https://min.io/docs/minio/linux/developers/javascript/API.html#constructor) link.

## API_MINIO_USE_SSL

This environment variable is used to configure the ssl mode on the connection between minio server and talawa api's minio client. More information can be found at [this](https://min.io/docs/minio/linux/developers/javascript/API.html#constructor) link.

## API_ENVIRONMENT

This environment variable is used to configure the runtime environment for talawa api. Possible values are `production` and `non_production`.

## API_PORT

This environment variable is used to configure the host port on which talawa api listens to at runtime. More information can be found at [this](https://developer.mozilla.org/en-US/docs/Web/API/URL/port) link.

## API_POSTGRES_DATABASE

This environment variable is used to configure the name of the postgres database for talawa api's postgres client to connect with. More information can be found at [this](https://github.com/porsager/postgres?tab=readme-ov-file#environmental-variables) link.

## API_POSTGRES_HOST

This environment variable is used to configure the host ip of the postgres server for talawa api's postgres client to connect with. More information can be found at [this](https://github.com/porsager/postgres?tab=readme-ov-file#environmental-variables) link.

## API_POSTGRES_PASSWORD

This environment variable is used to configure the password of the postgres user on the postgres server for talawa api's postgres client to authenticate with. More information can be found at [this](https://github.com/porsager/postgres?tab=readme-ov-file#environmental-variables) link.

## API_POSTGRES_PORT

This environment variable is used to configure the host port of the postgres server for talawa api's postgres client to connect with. More information can be found at [this](https://github.com/porsager/postgres?tab=readme-ov-file#environmental-variables) link.

## API_POSTGRES_SSL_MODE

This environment variable is used to configure the ssl/tls mode of the connection between the postgres server and talawa api's postgres client. More information can be found at [this](https://github.com/porsager/postgres?tab=readme-ov-file#environmental-variables) link.

## API_POSTGRES_USER

This environment variable is used to configure the name of the postgres user on the postgres server for talawa api's postgres client to authenticate with. More information can be found at [this](https://github.com/porsager/postgres?tab=readme-ov-file#environmental-variables) link.

## API_REDIS_HOST

This environment variable is used to configure the host ip of the redis server for talawa api's redis client to connect with. More information can be found at [this](https://github.com/porsager/postgres?tab=readme-ov-file#environmental-variables) link.

## API_REDIS_PORT

This environment variable is used to configure the host port of the redis server for talawa api's redis client to connect with. More information can be found at [this](https://github.com/porsager/postgres?tab=readme-ov-file#environmental-variables) link.

# Talawa api(container)

The `compose.yaml` file located at the root directory of this project contains configuration for starting the talawa api node.js server as a container service named `api`. Listed below are the environment variables accepted by this container service.

## API_DEBUGGER_MAPPED_HOST_IP

This environment variable is used to configure the host ip that can access the host port mapped with the container service port on which talawa api debugger listens to at runtime. More information can be found at [this](https://docs.docker.com/engine/network/#published-ports) link.

## API_DEBUGGER_MAPPED_PORT

This environment variable is used to configure the host port to map with the container service port on which talawa api debugger listens to at runtime. More information can be found at [this](https://docs.docker.com/engine/network/#published-ports) link.

## API_GID

This environment variable is used to configure the value of group id of the group assigned to the default non-root `talawa` user within the talawa api container. More information can be found at [this](https://www.docker.com/blog/understanding-the-docker-user-instruction/) link.

## API_MAPPED_HOST_IP

This environment variable is used to configure the host ip that can access the host port mapped with the container service port on which talawa api listens to at runtime. More information can be found at [this](https://docs.docker.com/engine/network/#published-ports) link.

## API_MAPPED_PORT

This environment variable is used to configure the host port to map with the container service port on which talawa api listens to at runtime. More information can be found at [this](https://docs.docker.com/engine/network/#published-ports) link.

## API_UID

This environment variable is used to configure the value of user id of the default non-root user `talawa` within the talawa api container. More information can be found at [this](https://www.docker.com/blog/understanding-the-docker-user-instruction/) link.

# Caddy(container)

## CADDY_HTTP_MAPPED_PORT

This environment variable is used to configure the host port to map with the container service port on which caddy listens to at runtime for http requests. More information can be found at [this](https://docs.docker.com/engine/network/#published-ports) link.

## CADDY_HTTPS_MAPPED_PORT

This environment variable is used to configure the host port to map with the container service port on which caddy listens to at runtime for https requests. More information can be found at [this](https://docs.docker.com/engine/network/#published-ports) link.

## CADDY_HTTP3_MAPPED_PORT

This environment variable is used to configure the host port to map with the container service port on which caddy listens to at runtime for http/3 requests. More information can be found at [this](https://docs.docker.com/engine/network/#published-ports) link.

## CADDY_TALAWA_API_DOMAIN_NAME

This environment variable is used to configure the domain name provided by a dns provider that is assigned to the public ip address of the machine on which talawa api runs. More information can be found at [this](https://caddyserver.com/docs/caddyfile/options#email) link.

## CADDY_TALAWA_API_EMAIL

This environment variable is used to configure the email to which the certificate authority issuing digital certificates for talawa api's secure connection at runtime can send email to. More information can be found at [this](https://caddyserver.com/docs/caddyfile/options#email) link.

## CADDY_TALAWA_API_HOST

This environment variable is used to configure the host that can access the port on which talawa api listens to at runtime. More information can be found at [this](https://docs.docker.com/engine/network/#published-ports) link.

## CADDY_TALAWA_API_PORT

This environment variable is used to configure the port on which talawa api listens to at runtime. More information can be found at [this](https://docs.docker.com/engine/network/#published-ports) link.

# Cloudbeaver(container)

Listed below is a subset of environment variables that are accepted by the `cloudbeaver` container service defined within the `compose.yaml` file located at the root directory of this project. More information could be found at [this](https://github.com/dbeaver/cloudbeaver/wiki/Server-configuration#automatic-server-configuration) link.

## CLOUDBEAVER_ADMIN_NAME

This environment variable is used to configure name for the default cloudbeaver admin account. More information can be found at [this](https://github.com/dbeaver/cloudbeaver/wiki/Server-configuration#automatic-server-configuration) link.

## CLOUDBEAVER_ADMIN_PASSWORD

This environment variable is used to configure password for the default cloudbeaver admin account created using the `${CLOUDBEAVER_ADMIN_NAME}` environment variable. More information can be found at [this](https://github.com/dbeaver/cloudbeaver/wiki/Server-configuration#automatic-server-configuration) link.

## CLOUDBEAVER_SERVER_NAME

This environment variable is used to configure name for the default talawa cloudbeaver server the cloudbeaver client connects to at runtime. More information can be found at [this](https://github.com/dbeaver/cloudbeaver/wiki/Server-configuration#automatic-server-configuration) link.

## CLOUDBEAVER_SERVER_URL

This environment variable is used to configure url for the default talawa cloudbeaver server the cloudbeaver client connects to at runtime. More information can be found at [this](https://github.com/dbeaver/cloudbeaver/wiki/Server-configuration#automatic-server-configuration) link.

## CLOUDBEAVER_MAPPED_HOST_IP

This environment variable is used to configure the host ip that can access the host port mapped with the container service port on which cloudbeaver listens to at runtime. More information can be found at [this](https://docs.docker.com/engine/network/#published-ports) link.

## CLOUDBEAVER_MAPPED_PORT

This environment variable is used to configure the host port to map with the container service port on which cloudbeaver listens to at runtime. More information can be found at [this](https://docs.docker.com/engine/network/#published-ports) link.

# Minio(container)

Listed below is a subset of environment variables that are accepted by the `minio` container service defined within the `compose.yaml` file located at the root directory of this project. More information could be found at [this](https://min.io/docs/minio/linux/reference/minio-server/minio-server.html#id4) link.

## MINIO_BROWSER

This environment variable is used to configure the toggle state of minio console between `on` and `off`. More information can be found at [this](https://min.io/docs/minio/linux/reference/minio-server/settings/console.html#envvar.MINIO_BROWSER) link.

## MINIO_API_MAPPED_HOST_IP

This environment variable is used to configure the host ip that can access the host port mapped with the container service port on which minio api listens to at runtime. More information can be found at [this](https://docs.docker.com/engine/network/#published-ports) link.

## MINIO_API_MAPPED_PORT

This environment variable is used to configure the host port to map with the container service port on which minio api listens to at runtime. More information can be found at [this](https://docs.docker.com/engine/network/#published-ports) link.

## MINIO_CONSOLE_MAPPED_HOST_IP

This environment variable is used to configure the host ip that can access the host port mapped with the container service port on which minio console listens to at runtime. More information can be found at [this](https://docs.docker.com/engine/network/#published-ports) link.

## MINIO_CONSOLE_MAPPED_PORT

This environment variable is used to configure the host port to map with the container service port on which minio console listens to at runtime. More information can be found at [this](https://docs.docker.com/engine/network/#published-ports) link.

## MINIO_ROOT_PASSWORD

This environment variable is used to configure password for the default minio root user `minioadmin` or the custom minio root user created using the `${MINIO_ROOT_USER}` environment variable. More information can be found at [this](https://min.io/docs/minio/linux/reference/minio-server/settings/root-credentials.html#envvar.MINIO_ROOT_PASSWORD) link.

## MINIO_ROOT_USER

This environment variable is used to configure name for a custom minio root user. More information can be found at [this](https://min.io/docs/minio/linux/reference/minio-server/settings/root-credentials.html#root-user) link.

# Postgres(container)

Listed below is a subset of environment variables that are accepted by the `postgres` container service defined within the `compose.yaml` file located at the root directory of this project. More information could be found at [this](https://github.com/docker-library/docs/blob/master/postgres/README.md#environment-variables) link.

## POSTGRES_DB

This environment variable is used to configure name for the database that will be created within the postgres container on startup if not already present. More information can be found at [this](https://github.com/docker-library/docs/tree/master/postgres#postgres_db) link.

## POSTGRES_MAPPED_HOST_IP

This environment variable is used to configure the host ip that can access the host port mapped with the container service port on which postgres listens to at runtime. More information can be found at [this](https://docs.docker.com/engine/network/#published-ports) link.

## POSTGRES_MAPPED_PORT

This environment variable is used to configure the host port to map with the container service port on which postgres listens to at runtime. More information can be found at [this](https://docs.docker.com/engine/network/#published-ports) link.

## POSTGRES_PASSWORD

This environment variable is used to configure password for the default `postgres` postgres user or the custom postgres user created using the `${POSTGRES_USER}` environment variable. More information can be found at [this](https://github.com/docker-library/docs/tree/master/postgres#postgres_password) link.

## POSTGRES_USER

This environment variable is used to configure name for a custom postgres user with superuser permissions. More information can be found at [this](https://github.com/docker-library/docs/tree/master/postgres#postgres_user) link.

# Redis(container)

## REDIS_MAPPED_HOST_IP

This environment variable is used to configure the host ip that can access the host port mapped with the container service port on which redis listens to at runtime. More information can be found at [this](https://docs.docker.com/engine/network/#published-ports) link.

## REDIS_MAPPED_PORT

This environment variable is used to configure the host port to map with the container service port on which redis listens to at runtime. More information can be found at [this](https://docs.docker.com/engine/network/#published-ports) link.

# Redis insight(container)

## REDIS_INSIGHT_MAPPED_HOST_IP

This environment variable is used to configure the host ip that can access the host port mapped with the container service port on which redis insight listens to at runtime. More information can be found at [this](https://docs.docker.com/engine/network/#published-ports) link.

## REDIS_INSIGHT_MAPPED_PORT

This environment variable is used to configure the host port to map with the container service port on which redis insight listens to at runtime. More information can be found at [this](https://docs.docker.com/engine/network/#published-ports) link.

# Docker Compose(container)

## COMPOSE_PROFILES

This environment variable is used to enable or disable container services defined within the `compose.yaml` file located at the root directory of this project to be run by docker compose. Possible values are `api`, `caddy`, `cloudbeaver`, `minio` and `postgres`. More information can be found at [this](https://docs.docker.com/compose/environment-variables/envvars/#compose_profiles) link.

## COMPOSE_PROJECT_NAME

This environment variable is used to configure the prefix for identifiers of all the container services to be run by docker compose. More information can be found at [this](https://docs.docker.com/compose/environment-variables/envvars/#compose_project_name) link.