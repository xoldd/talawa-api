# About this directory

This directory is intended for storing the pothos schema definitions for graphql enums used in talawa api's graphql implementation.

# Conventions

> Parts of a word consist of prefix, root and suffix.

The following coventions are to be followed within this directory:-

1. The sdl name of a graphql enum must follow the "PascalCase" naming convention consisting of a root suffixed by the keyword "Enum".

2. The file containing the pothos schema definition of a graphql enum must be named the same as the sdl name of that graphql enum.

3. All the variants of a graphql enum must follow the "SCREAMING_SNAKE_CASE" naming convention.

4. The object reference to the pothos schema definition for a graphql enum must be a named export named the same as the root of the sdl name of that graphql enum suffixed with the keyword "GqlEnum".

Here's an example depicting these rules:-

```typescript
// IceCreamEnum.ts
export const IceCreamGqlEnum = builder.enumType("IceCreamEnum", {
	values: ["BUTTER_PECAN", "CHOCOLATE", "MINT_CHOCOLATE_CHIP"],
});
```
In this example:-

1. The sdl name of the graphql enum is "IceCreamEnum" which follows the "PascalCase" naming convention consisting of the root "IceCream" suffixed by the keyword "Enum".

2. The file containing the pothos schema definition of the graphql enum is named "IceCreamEnum.ts" which is the same as the sdl name "IceCreamEnum" of the graphql enum.

3. The variants of the graphql enum are "BUTTER_PECAN", "CHOCOLATE" and "MINT_CHOCOLATE_CHIP" respectively which follow the "SCREAMING_SNAKE_CASE" naming convention.

4. The object reference to the pothos schema definition for the graphql enum is a named export named "IceCreamGqlEnum" which is the same as the root "IceCream" of the sdl name "IceCreamEnum" of the graphql enum suffixed with the keyword "GqlEnum".
