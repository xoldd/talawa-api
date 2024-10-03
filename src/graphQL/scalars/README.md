# About this directory

This directory is intended for storing the pothos schema definitions for the graphQL scalars used in talawa api's graphQL implementation. More about implementing graphQL scalars with pothos at [this](https://pothos-graphql.dev/docs/guide/scalars) link.

# Conventions

The following coventions are to be followed within this directory:-

1. The sdl name of a graphQL type must follow the `PascalCase` naming convention.

2. The file containing the pothos schema definition of a graphQL scalar must be named the same as the sdl name of that graphQL scalar. The file must also export a typescript type named the same as the sdl name of that graphQL scalar and satisfying the type `Record<"INPUT" | "OUTPUT", unknown>`(where `unknown` corresponds to any valid javascript data type) for providing type-safety while using the graphQL scalar in pothos schema definitions. If the exported typescript type conflicts with javscript global variables then prefix that type with an underscore `_`.

Here's an example depicting these rules: 

```typescript
// DateTime.ts
import { DateResolver } from "graphql-scalars";
import { builder } from "~/src/graphQL/schemaBuilder.js";

/**
 * More information at this link: {@link https://the-guild.dev/graphQL/scalars/docs/scalars/date}
 */
builder.addScalarType("Date", DateResolver);

/**
 * `Date` scalar type for pothos schema.
 */
export type _Date = {
	Input: Date;
	Output: Date;
};
```
In this example: 

1. The sdl name of the graphQL scalar is `Date` which follows the `PascalCase` naming convention.

2. The file containing the pothos schema definition of the graphQL scalar is named `Date.ts` which is the same as the sdl name `Date` of that graphQL scalar. The file also exports the `Date` typescript type named the same as the sdl name of that graphQL scalar and satisfies the type `Record<"INPUT" | "OUTPUT", unknown>`. The exported typescript type `_Date` is prefixed with an underscore `_` character to prevent conflicts with the `Date` javascript global variable. 