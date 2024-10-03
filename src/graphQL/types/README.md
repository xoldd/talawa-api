# About this directory

This directory is intended for storing the pothos schema definitions for the graphQL types used in talawa api's graphQL implementation. More about implementing graphQL types with pothos at [this](https://pothos-graphql.dev/docs/guide/objects) link.

# Conventions

The following coventions are to be followed within this directory:-

1. The sdl name of a graphQL type must follow the `PascalCase` naming convention.

2. The file containing the pothos schema definition of a graphQL type must be named the same as the sdl name of that graphQL type.

3. All the fields of a graphQL type must follow the `snakeCase` naming convention.

4. The object reference to the pothos schema definition for a graphQL type must be a pothos `objectRef` named export named the same as the sdl name of that graphQL type suffixed with the keyword `Ref`.

5. If a single file for a graphQL type is getting enormous in size, create a directory that is named the same as the sdl name of that graphQL type and an `index.ts` field within it that exports the object reference mentioned in the previous convention. Now within this directory extract the fields of that graphQL type into files that are named the same as their graphQL sdl name and make sure to import them all in the `index.ts` file.

Here's an example depicting these rules: 

```typescript
// User.ts
import { builder } from "~/src/graphQL/schemaBuilder.js";

type User = {
	age: number;
    name: string;
};

export const UserRef = builder.objectRef<User>("User");

UserRef.implement({
	fields: (t) => ({
		age: t.exposeInt("age"),
        name: t.exposeString("name")
	}),
});
```
```typescript
// Post/index.ts
import { builder } from "~/src/graphQL/schemaBuilder.js";
import "./Poster.js";

type Post = {
	body: string;
    posterId: string;
    title: string;
};

export const PostRef = builder.objectRef<Post>("Post");

PostRef.implement({
	fields: (t) => ({
		body: t.exposeInt("body"),
        title: t.exposeString("title")
	}),
});
```
```typescript
// Post/poster.ts
import { builder } from "~/src/graphQL/schemaBuilder.js";
import { UserRef } from "~/src/graphQL/types/User.js";
import { PostRef } from "./index.js";

PostRef.implement({
	fields: (t) => ({
		poster: t.expose({
            resolve: (parent, args, ctx) => {
                return await ctx.drizzleClient.query.user.findFirst({
                    where: (fields, operators) => {
                        return operators.eq(fields.id, parent.posterId);
                    }
                })
            },
            type: UserRef
        }),
	}),
});
```
In this example: 

1. The sdl name of the graphQL type is `User` which follows the `PascalCase` naming convention.

2. The file containing the pothos schema definition of the graphQL type is named `User.ts` which is the same as the sdl name `User` of that graphQL interface.

3. The fields of the graphQL interface are `age` and `name` respectively which follow the `snakeCase` naming convention.

4. The object reference to the pothos schema definition for the graphQL type is a named export named `UserRef` which is the same as the sdl name of that graphQL type suffixed with the keyword `Ref`.

5. A directory named `Post` is created for the graphQL type `Post` with two files named `index.ts` and `poster.ts` where `index.ts` exports the object reference to the pothos schema definition for the `Post` graphQL type and `poster.ts` is used to define pothos schema for the `poster` field of the `Post` graphQL type.