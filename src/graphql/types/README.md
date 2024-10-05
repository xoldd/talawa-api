# About this directory

This directory is intended for storing the pothos schema definitions for the graphql types used in talawa api's graphql implementation. More about implementing graphql types with pothos at [this](https://pothos-graphql.dev/docs/guide/objects) link.

# Conventions

The following coventions are to be followed within this directory: 

1. The sdl name of a graphql type must follow the `PascalCase` naming convention.

2. The file containing the pothos schema definition for a graphql type must be named the same as the sdl name of that graphql type.

3. All the fields of a graphql type must follow the `snakeCase` naming convention.

4. The object reference to the pothos schema definition for a graphql type must be a pothos `objectRef` named export named the same as the sdl name of that graphql type suffixed with the keyword `Ref`.

5. If a single file for a graphql type gets enormous in size, create a directory that is named the same as the sdl name of that graphql type and an `index.ts` file within it that exports the object reference mentioned in the previous convention. Now within this directory extract the fields of that graphql type into files that are named the same as their graphql sdl name and make sure to import them all in the `index.ts` file.

Here's an example depicting these rules: 

```typescript
// User.ts
import { builder } from "~/src/graphql/schemaBuilder.js";

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
import { builder } from "~/src/graphql/schemaBuilder.js";
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
import { builder } from "~/src/graphql/schemaBuilder.js";
import { UserRef } from "~/src/graphql/types/User.js";
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

1. The sdl name of the graphql type is `User` which follows the `PascalCase` naming convention.

2. The file containing the pothos schema definition of the graphql type is named `User.ts` which is the same as the sdl name `User` of that graphql interface.

3. The fields of the graphql type are `age` and `name` which follow the `snakeCase` naming convention.

4. The object reference to the pothos schema definition for the graphql type is a named export named `UserRef` which is the same as the sdl name of that graphql type suffixed with the keyword `Ref`.

5. A directory named `Post` is created for the graphql type `Post` with two files named `index.ts` and `poster.ts` where `index.ts` exports the object reference to the pothos schema definition for the `Post` graphql type and `poster.ts` is used to define pothos schema for the `poster` field of the `Post` graphql type.