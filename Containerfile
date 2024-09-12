# syntax=docker/dockerfile:1

# https://github.com/devcontainers/templates/tree/main/src/debian
# This build stage switches to `vscode` non root user and checks out into the `/home/vscode/api` directory as the working directory.
FROM mcr.microsoft.com/devcontainers/base:bookworm AS devcontainer
# Renaming 'vscode' group to 'talawa', renaming 'vscode' user to 'talawa', setting '/home/talawa' as the home directory for 'talawa' user and copying the contents of '/home/vscode' to '/home/talawa'.
# RUN groupmod -n talawa vscode && usermod -d /home/talawa -l talawa -m vscode
# USER talawa
# ENV PATH=/home/talawa/.local/share/fnm:${PATH}
ENV PNPM_HOME=/home/vscode/.local/share/pnpm
ENV PATH=${PNPM_HOME}:/home/vscode/.local/share/fnm:${PATH}
USER vscode
# SHELL ["/bin/bash", "-o", "pipefail", "-c"]
# RUN curl -fsSL https://fnm.vercel.app/install | bash -s -- --skip-shell \ 
# && echo eval "$(fnm env --corepack-enabled --resolve-engines --use-on-cd --version-file-strategy=recursive)" >> /home/talawa/.bashrc
RUN curl -fsSL https://fnm.vercel.app/install | bash -s -- --skip-shell \ 
&& echo eval "$(fnm env --corepack-enabled --resolve-engines --use-on-cd --version-file-strategy=recursive)" >> /home/vscode/.bashrc
# WORKDIR /home/talawa/api
WORKDIR /home/vscode/api

# This build stage sets up and switches to the `talawa` non root user, sets up pnpm configuration and checks out into the `/home/talawa/api` directory as the working directory.
FROM node:22.8.0-bookworm-slim AS base
# Used to configure the group id for the group assigned to the non-root "talawa" user within the image.
ARG API_GID=1000
# Used to configure the user id for the non-root "talawa" user within the image.
ARG API_UID=1000
# Deletes the pre-included "node" user along with its home directory.
RUN userdel -r node \
# Adds the "talawa" group with id equal to the value of argument "${API_GID}".
&& groupadd -g ${API_GID} talawa \
# Adds the "talawa" user with id equal to the value of argument "${API_UID}", assigns it to "talawa" group, creates the home directory for "talawa" user, sets bash as the "talawa" user's login shell.
&& useradd -g talawa -l -m -s "$(which bash)" -u ${API_UID} talawa \
&& corepack enable
USER talawa
ENV PNPM_HOME=/home/talawa/.local/share/pnpm
ENV PATH=${PNPM_HOME}:${PATH}
WORKDIR /home/talawa/api

FROM base AS testing
COPY --chown=talawa:talawa ./pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm fetch --frozen-lockfile
COPY --chown=talawa:talawa ./ ./
RUN pnpm install --frozen-lockfile --offline
CMD pnpm run_tests

# This build stage is used to build the codebase used in production environment of talawa api. 
FROM base AS production_code
# RUN pnpm config set store-dir /home/talawa/.local/share/pnpm/store
COPY --chown=talawa:talawa ./pnpm-lock.yaml ./pnpm-lock.yaml 
RUN pnpm fetch --frozen-lockfile
COPY --chown=talawa:talawa ./ ./
RUN pnpm install --frozen-lockfile --offline && pnpm build_production

# This build stage is used to download and install the dependencies used in production environment of talawa api.
FROM base AS production_dependencies
# RUN pnpm config set store-dir /home/talawa/.local/share/pnpm/store
COPY --chown=talawa:talawa ./pnpm-lock.yaml ./pnpm-lock.yaml 
RUN pnpm fetch --frozen-lockfile --prod
COPY --chown=talawa:talawa ./package.json ./package.json
RUN pnpm install --frozen-lockfile --offline --prod

# This build stage is used to create the container image for production environment of talawa api.
FROM base AS production
COPY --from=production_code /home/talawa/api/api_compose_service_healthcheck.js ./api_compose_service_healthcheck.js
COPY --from=production_code /home/talawa/api/dist ./dist
COPY --from=production_code /home/talawa/api/drizzle_migrations ./drizzle_migrations
COPY --from=production_code /home/talawa/api/package.json ./package.json
COPY --from=production_dependencies /home/talawa/api/node_modules ./node_modules
CMD ["node", "./dist/start_server.js"]
