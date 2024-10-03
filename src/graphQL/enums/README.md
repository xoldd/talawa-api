# About this directory

This directory is intended for storing the pothos schema definitions for the graphQL enums used in the talawa api's graphQL implementation.

# Conventions

The following coventions are to be followed within this directory: 

1. The sdl name of a graphQL enum must follow the `PascalCase` naming convention consisting of a root keyword that represents the entity to which the enum is associated to and a suffix keyword that represents which aspect of that entity the enum contains the variants of. More about implementing graphQL enums with pothos at [this](https://pothos-graphql.dev/docs/guide/enums) link.

2. The file containing the pothos schema definition of a graphQL enum must be named the same as the sdl name of that graphQL enum.

3. All the variants of a graphQL enum must follow the `SCREAMING_SNAKE_CASE` naming convention.

4. The object reference to the pothos schema definition for a graphQL enum must be a named export named the same as the sdl name of that graphQL enum.

Here's an example depicting these rules: 

```typescript
// IceCreamFlavour.ts
import { builder } from "~/src/graphQL/schemaBuilder.js";

export const IceCreamFlavour = builder.enumType("IceCreamFlavour", {
	values: ["BUTTER_PECAN", "CHOCOLATE", "MINT_CHOCOLATE_CHIP"],
});
```
In this example: 

1. The sdl name of the graphQL enum is `IceCreamFlavour` which follows the `PascalCase` naming convention consisting of the root keyword `IceCream` and the suffix keyword `Flavour`.

2. The file containing the pothos schema definition of the graphQL enum is named `IceCreamFlavour.ts` which is the same as the sdl name `IceCreamFlavour` of the graphQL enum.

3. The variants of the graphQL enum are `BUTTER_PECAN`, `CHOCOLATE` and `MINT_CHOCOLATE_CHIP` respectively which follow the `SCREAMING_SNAKE_CASE` naming convention.

4. The object reference to the pothos schema definition for the graphQL enum is a named export named `IceCreamFlavour` which is the same as the sdl name of that graphQL enum.