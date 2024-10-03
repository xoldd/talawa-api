# About this directory

This directory is intended for storing the pothos schema definitions for the graphQL scalars used in talawa api's graphQL implementation.

# Conventions

The following coventions are to be followed within this directory:-

1. The sdl name of a graphQL type must follow the `PascalCase` naming convention.

2. The file containing the pothos schema definition of a graphQL scalar must be named the same as the sdl name of that graphQL scalar. The file must also export a typescript type named the same as the sdl name of that graphQL scalar and satisfying the type `Record<"INPUT" | "OUTPUT", unknown>`(where `unknown` corresponds to any valid javascript data type) for providing type-safety while using the graphQL scalar in pothos schema definitions.

Here's an example depicting these rules: 

```typescript
// DateTime.ts
import { DateTimeResolver } from "graphql-scalars";
import { builder } from "~/src/graphQL/schemaBuilder.js";

/**
 * More information at this link: {@link https://the-guild.dev/graphQL/scalars/docs/scalars/date-time}
 */
builder.addScalarType("DateTime", DateTimeResolver);

/**
 * `DateTime` scalar type for pothos schema.
 */
export type DateTime = {
	Input: Date;
	Output: Date;
};
```
In this example: 

1. The sdl name of the graphQL scalar is `DateTime` which follows the `PascalCase` naming convention.

2. The file containing the pothos schema definition of the graphQL scalar is named `DateTime.ts` which is the same as the sdl name `DateTime` of that graphQL scalar. The file also exports the `DateTime` typescript type named the same as the sdl name of that graphQL scalar and satisfies the type `Record<"INPUT" | "OUTPUT", unknown>`.
