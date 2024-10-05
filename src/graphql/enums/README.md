# About this directory

This directory is intended for storing the pothos schema definitions for the graphql enums used in the talawa api's graphql implementation. More about implementing graphql enums with pothos at [this](https://pothos-graphql.dev/docs/guide/enums) link.

# Conventions

The following coventions are to be followed within this directory: 

1. The sdl name of a graphql enum must follow the `PascalCase` naming convention consisting of a base keyword that represents the entity to which the enum is associated with and a suffix keyword that represents which aspect of that entity the enum contains the variants of.

2. The file containing the pothos schema definition for a graphql enum must be named the same as the sdl name of that graphql enum.

3. All the variants of a graphql enum must follow the `SCREAMING_SNAKE_CASE` naming convention.

4. The object reference to the pothos schema definition for a graphql enum must be a named export named the same as the sdl name of that graphql enum.

Here's an example depicting these rules: 

```typescript
// IceCreamFlavour.ts
import { builder } from "~/src/graphql/schemaBuilder.js";

export const IceCreamFlavour = builder.enumType("IceCreamFlavour", {
	values: ["BUTTER_PECAN", "CHOCOLATE", "MINT_CHOCOLATE_CHIP"] as const,
});
```
In this example: 

1. The sdl name of the graphql enum is `IceCreamFlavour` which follows the `PascalCase` naming convention consisting of the base keyword `IceCream` and the suffix keyword `Flavour`.

2. The file containing the pothos schema definition of the graphql enum is named `IceCreamFlavour.ts` which is the same as the sdl name of that graphql enum.

3. The variants of the graphql enum are `BUTTER_PECAN`, `CHOCOLATE` and `MINT_CHOCOLATE_CHIP` respectively which follow the `SCREAMING_SNAKE_CASE` naming convention.

4. The object reference to the pothos schema definition for the graphql enum is a named export named `IceCreamFlavour` which is the same as the sdl name of that graphql enum.