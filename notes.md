# backlog

1. Mend renovate integration
2. Synchronizing node.js version across configurations
3. Devcontainer host-container ignored paths bi-directional mounting fix

# to research about:-

1. Reproducible development environment with as much as possible automated replication of production dependencies/services on the local system. Research about docker, docker compose. devcontainers, nix flakes etc.
2. SQL migrations version control. Research about handling sql migrations in github.
3. Database migrations without corruption and downtime. Research about expand and contract database migration pattern.
4. Software testing patterns. Black box testing preferred as the fundamental testing pattern. Reference, [node best practices](https://github.com/goldbergyoni/nodebestpractices), [javascript testing best practices](https://github.com/goldbergyoni/javascript-testing-best-practices), [nodejs integration tests best practices](https://github.com/testjavascript/nodejs-integration-tests-best-practices).
5. documentatation about docker, docker compose, api.Containerfile, compose files
6. documentatation about environment variables
7. documentatation about gql.tada
8, documentatation about workflow commands

# devcontainers

development

git
github cli

ci

THE DOCKER VOLUMES ARE OWNED BY THE ROOT USER BY DEFAULT, MUST BE CHANGED TO BE OWNED BY A NON ROOT USER.

# expand and contract database migrations

Let's say we want to extract out the `firstName` and `lastName` values from the `name` column of a database table and store them in their own columns. Here's the steps to do this with expand and contract database migration pattern:

1. Add nullable `firstname` and `lastname` columns to the database.
2. Update the server code to write new values to `name`, `firstname` and `lastname` columns but still read values from the `name` column.
3. Run a background task that populates the currently `null` `firstname` and `lastname` columns with corresponding values from the `name` column.
4. Once the previous task is complete and all the `null` `firstname` and `lastname` have been populated update the server code to stop writing to the `name` column and start reading from the `firstname` and `lastname` columns.
5. Once the previous task is complete remove the `name` column from the database.

# docker compose

validate compose files:
```
docker compose config --quiet
```

# presentation

devcontainer
testing infrastructure
type safe graphql documents in integration tests with gql.tada

# mercurius fixes required

The official mercurius context type has incorrect typings for the following fields for all operations queries/mutations/subscriptions 

```ts
{
    operationsCount?: number;
    operationId?: number;
}
```
and many typings don't exist in the mercurius context type but are present in the context at runtime.

# watch modes required

rechecking type errors on code change: tsc watch mode

rechecking biome lint/format errors on code change: biome watch mode?

regenerating graphql sdl schema on pothos schema change: 

pushing drizzle schema to database on drizzle schema change: 

restarting development api server on api server code change: tsx watch

restarting tests on api server code change: vitest watch

# not yet implemented

secrets manager

graphql documentation generation using spectaql

# to run an ephemeral postgres database

```bash
docker container run --env-file ./.env --interactive --tty --publish 5432:5432 postgres
```
#

Graphql input to zod schema for database insert operations:

    Make sure that `T` graphql field is transformed to `T` zod field for non nullable database fields.

        T -> T

    Make sure that `T | null | undefined` graphql field is transformed to `T | undefined` zod field for auto generated non nullable database fields.

        T | null | undefined -> T | undefined

    Make sure that `T | null | undefined` graphql field is transformed to `T | null | undefined` zod field for nullable database fields.

        T | null | undefined -> T | null | undefined

Graphql input to zod schema for database update operations:

    Make sure that `T` graphql field is transformed to `T` zod field for non nullable database fields that are used for record identification.

        T -> T

    Make sure that `T | null | undefined` graphql field is transformed to `T | undefined` zod field for non nullable database fields.

        T | null | undefined -> T | undefined

    Make sure that `T | null | undefined` graphql field is transformed to `T | null | undefined` zod field for nullable database fields.

        T | null | undefined -> T | null | undefined