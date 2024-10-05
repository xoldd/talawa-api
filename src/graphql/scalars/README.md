# About this directory

This directory is intended for storing the pothos schema definitions for the graphql scalars used in talawa api's graphql implementation. More about implementing graphql scalars with pothos at [this](https://pothos-graphql.dev/docs/guide/scalars) link.

# Conventions

The following coventions are to be followed within this directory:-

1. The sdl name of a graphql type must follow the `PascalCase` naming convention.

2. The file containing the pothos schema definition of a graphql scalar must be named the same as the sdl name of that graphql scalar. 

3. The file must also export a typescript type named the same as the sdl name of that graphql scalar and satisfying the type `Record<"INPUT" | "OUTPUT", unknown>`(where `unknown` corresponds to any valid javascript data type) for providing type-safety while using the graphql scalar in pothos schema definitions.

4. The exported scalar typescript type conflicting with javascript global variables must be prefixed with an underscore `_` or a viable alternative if necessary.

Here's an example depicting these rules: 

```typescript
// DateTime.ts
import { DateResolver } from "graphql-scalars";
import { builder } from "~/src/graphql/schemaBuilder.js";

/**
 * More information at this link: {@link https://the-guild.dev/graphql/scalars/docs/scalars/date}
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

1. The sdl name of the graphql scalar is `Date` which follows the `PascalCase` naming convention.

2. The file containing the pothos schema definition of the graphql scalar is named `Date.ts` which is the same as the sdl name `Date` of that graphql scalar.

3. The file exports the `_Date` typescript type named the same as the sdl name of that graphql scalar satisfying the type `Record<"INPUT" | "OUTPUT", unknown>`.

4. The exported typescript type `_Date` is prefixed with an underscore `_` to prevent conflicts with the javascript global variable `Date`.