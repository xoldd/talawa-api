# About this directory

This directory contains the fastify plugins that are used to define the route definitions for talawa api. This directory follows the file-based routing to a certain extent which is achieved by following a set a conventions and using the [@fastify/autoload](https://github.com/fastify/fastify-autoload) package.

# Directory structure requirements

Certain directory structure requirements must be met for file-based routing to work as intended. Here are the requirements:-

1. Each route plugin must be defined in a file named `route.ts` and must be the default export from that file.
2. Each route plugin must conform to the [FastifyPluginAsync](https://github.com/fastify/fastify/blob/main/types/plugin.d.ts) type definition.
3. Each route plugin must only define the route definition for a particular route. It can however accomodate route definitions for different HTTP verbs. Here is an example:-
4. As a result of the previous requirements, each of those route plugin files must be nested inside a directory. The name of the directory is important here as that name is what the route defined within the plugin will be prefixed with.

# Example fastify route plugin definitions

This route plugin takes care of the `HTTP POST` and `HTTP GET` request to the route `/users`. The routes defined in this file will automatically be prefixed with the route `/users` by the `@fastify/autoload` package.

```typescript
// /src/routes/users/route.ts

import type { FastifyPluginAsync } from "fastify";

const route: FastifyPluginAsync = async (fastify, opts) => {
  fastify.post("/", async (request, reply) => {
    const user = await fastify.db.users.createOne(request.body);
    reply.status(200).send({ user });
  });

  fastify.get("/", async (request, reply) => {
    const users = await fastify.db.users.findMany();
    reply.status(200).send({ users });
  });
};

export default route;
```

This route plugin takes care of the `HTTP GET` and `HTTP DELETE` request to the route `/users/_userId` where `_userId` is a dynamic route parameter. The routes defined in this file will automatically be prefixed with the route `/users/_userId` by the `@fastify/autoload` package.

```typescript
// /src/routes/users/_userId/route.ts

import type { FastifyPluginAsync } from "fastify";

const route: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get("/", async (request, reply) => {
    const user = await fastify.db.users.findOne({
      where: { id: request.params.userId },
    });
    reply.status(200).send({ user });
  });

  fastify.delete("/", async (request, reply) => {
    const user = await fastify.db.users.deleteOne({
      where: { id: request.params.userId },
    });
    reply.status(200).send({ user });
  });
};

export default route;
```

This route plugin takes care of the `HTTP GET` request to the route `/users/_userId/posts/_postId` where `_userId` and `_postId` are dynamic route parameters. The routes defined in this file will automatically be prefixed with the route `/users/_userId/posts/_postId` by the `@fastify/autoload` package.

```typescript
// /src/routes/users/_userId/posts/_postId/route.ts

import type { FastifyPluginAsync } from "fastify";

const route: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get("/", async (request, reply) => {
    const post = await fastify.db.posts.findOne({
      where: {
        id: request.params.postId,
        userId: request.params.userId,
      },
    });
    reply.status(200).send({ post });
  });
};

export default route;
```

# Registering the route plugins using the `@fastify/autoload` package

The following code snippet shows how to register the fastify route plugins defined in this directory on the fastify instance:-

```typescript
import fastify from "fastify";
import fastifyAutoload from "@fastify/autoload";

const fastify = Fastify();

fastify.register(fastifyAutoload, {
  dir: PATH_TO_THIS_DIRECTORY,
  forceESM: true,
  matchFilter: /^.*route(?:\.ts|\.js|\.cjs|\.mjs)$/,
});
```

The variable `PATH_TO_THIS_DIRECTORY` is the address to this directory. The regex pattern used as the value for `matchFilter` field is what is responsible for enforcing the `route.ts` route plugin file naming convention. Other than that `@fastify/autoload` by default follows the convention of prefixing the routes with name of the parent directories.

A great pattern would be to synchronize the directory and file names with the route segments. Here's an example:

```
/
/healthcheck
/graphql
/organizations/:id
/organizations/:id/members

|__/healthcheck.ts
|__/graphql.ts
|__/index.ts
|__/organizations
                |__/index.ts
                |__/$id
                       |__/index.ts
                       |__/members.ts
```

In this diagram:

1. `/` corresponds to `/index.ts`
2. `/healthcheck` and `/graphql` correspond to `/healthcheck.ts` and `/graphql.ts` respectively.
3. `/organizations` corresponds to `/organizations`.
4. `/organizations/:id` corresponds to `/organizations/$id/index.ts`.
5. `/organizations/:id/members` corresponds to `/organizations/$id/members`.