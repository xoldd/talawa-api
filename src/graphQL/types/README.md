# About this directory

This directory is intended for storing the pothos schema definitions for the graphQL types used in talawa api's graphQL implementation.

# Conventions

The following coventions are to be followed within this directory:-

1. The sdl name of a graphQL type must follow the `PascalCase` naming convention.

2. The file containing the pothos schema definition of a graphQL type must be named the same as the sdl name of that graphQL type.

3. All the fields of a graphQL type must follow the `snakeCase` naming convention.

4. The object reference to the pothos schema definition for a graphQL type must be a pothos `objectRef` named export named the same as the sdl name of that graphQL type suffixed with the keyword `Ref`.

Here's an example depicting these rules: 

```typescript
// User.ts
import { builder } from "~/src/graphQL/schemaBuilder.js";

type User = {
	age: number;
    name: string;
};

export const UserRef = builder.interfaceRef<User>("User");

UserRef.implement({
	fields: (t) => ({
		age: t.exposeInt("age"),
        name: t.exposeString("name")
	}),
});
```
In this example: 

1. The sdl name of the graphQL type is `User` which follows the `PascalCase` naming convention.

2. The file containing the pothos schema definition of the graphQL type is named `User.ts` which is the same as the sdl name `User` of that graphQL interface.

3. The fields of the graphQL interface are `age` and `name` respectively which follow the `snakeCase` naming convention.

4. The object reference to the pothos schema definition for the graphQL type is a named export named `UserRef` which is the same as the sdl name of that graphQL type suffixed with the keyword `Ref`.
