# About this directory

This directory is intended for storing the pothos schema definitions for the graphQL unions used in talawa api's graphQL implementation. More about implementing graphQL unions with pothos at [this](https://pothos-graphql.dev/docs/guide/unions) link.

# Conventions

The following coventions are to be followed within this directory:-

1. The sdl name of a graphQL type must follow the `PascalCase` naming convention.

2. The file containing the pothos schema definition of a graphQL union must be named the same as the sdl name of that graphQL union.

3. The object reference to the pothos schema definition for a graphQL union must be a named export named the same as the sdl name of that graphQL union.

Here's an example depicting these rules: 

```typescript
// CreatePostResult.ts
import { builder } from "~/src/graphQL/schemaBuilder.js";

export const CreateUserResult = builder.unionType("CreateUserResult", {
    types: [UserRef, ErrorRef],
    resolveType: (parent) => {
        if (isNotNullish(parent.name) && typeof parent.name === "string") {
            return UserRef;
        }else {
            return ErrorRef;
        }
    }
});
```

In this example: 

1. The sdl name of the graphQL union is `CreateUserResult` which follows the `PascalCase` naming convention.

2. The file containing the pothos schema definition of the graphQL union is named `CreatePostResult.ts` which is the same as the sdl name `CreatePostResult` of that graphQL union.

3. The object reference to the pothos schema definition for the graphQL union is a named export named `CreateUserResult` which is the same as the sdl name of that graphQL union.