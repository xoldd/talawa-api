# `package.json` scripts

The scripts listed below are used with pnpm for many different workflows of talawa api.

`pnpm apply_drizzle_migrations`

This command is used to apply the sql migration files present in the `drizzle_migrations` directory to the postgres database being used by talawa api. More information can be found at [this](https://orm.drizzle.team/kit-docs/commands#apply-migrations) link.

`pnpm build_production`

This command is used to create a production build of the talawa api codebase by transpiling the typescript code to javascript code and also getting rid of unncessary stuff not needed in production. More information can be found at [this](https://swc.rs/docs/usage/cli) link.

`pnpm check_code_quality`

This command is used to check the linting and formatting issues in the codebase. More information can be found at [this](https://biomejs.dev/reference/cli/#biome-check) link.

`pnpm check_drizzle_migrations`

This command is used to check for inconsistencies and collisions in the sql migration files in the `drizzle_migrations` directory that could arise because of many contributers contributing to the project. More information can be found at [this](https://orm.drizzle.team/kit-docs/commands#check) link.

`pnpm check_type_errors`

This command is used to check the type errors in the codebase using typescript compiler. More information can be found at [this](https://www.typescriptlang.org/docs/handbook/compiler-options.html#using-the-cli) link.

`pnpm drop_drizzle_migrations`

This command is used to delete the existing sql migration files in the `drizzle_migrations` directory as their manual deletion would break drizzle-kit. More information can be found at [this](https://orm.drizzle.team/kit-docs/commands#drop-migration) link.

`pnpm fix_code_quality`

This command is used to fix as many linting and formatting issues in the codebase as possible for being auto-fixed. Output of this command resulting in a failure means that there are some issues that need to be fixed manually. More information can be found at [this](https://biomejs.dev/reference/cli/#biome-check) link.

`pnpm generate_drizzle_migrations`

This command is used to generate the sql migration files in the `drizzle_migrations` directory that reflect the latest state of the drizzle schema in the codebase. More information can be found at [this](https://orm.drizzle.team/kit-docs/commands#generate-migrations) link.

`pnpm push_drizzle_schema`

This command is used to push the changes in the drizzle-orm schema in the codebase to the postgres database for rapid local development(prototyping) without having to handle the drizzle migration files after each little change. More information can be found at [this](https://orm.drizzle.team/kit-docs/commands#apply-migrations) link.

`pnpm start_development`

This command is used to concurrently start the development server of talawa api in watch mode and the typescript compiler in watch mode to check for type errors.

`pnpm start_development_debug`

This command is used to concurrently start the development server of talawa api in watch mode, a debugger on host `127.0.0.1` and port `9229` by default that are customizable by providing environment variables `$API_DEBUGGER_HOST` and `$API_DEBUGGER_PORT` and the typescript compiler in watch mode to check for type errors.

`pnpm start_production`

This command is used to start the production server of talawa api.

`pnpm start_production_debug`

This command is used to start the production server of talawa api and a debugger attached to that process on host `127.0.0.1` and port `9229` by default that are customizable by providing environment variables `$API_DEBUGGER_HOST` and `$API_DEBUGGER_PORT`.

`pnpm upgrade_drizzle_metadata`

This command is used to keep the drizzle metadata in the `drizzle_migrations/_meta` directory up to date with the latest changes in drizzle-orm and drizzle-kit. More information can be found at [this](https://orm.drizzle.team/kit-docs/commands#maintain-stale-metadata) link.