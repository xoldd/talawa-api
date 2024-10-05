# About this directory

This directory is intended for storing the pothos schema definitions for the graphql interfaces used in talawa api's graphql implementation. More about implementing graphql interfaces with pothos at [this](https://pothos-graphql.dev/docs/guide/interfaces) link.

# Conventions

The following coventions are to be followed within this directory:-

1. The sdl name of a graphql interface must follow the `PascalCase` naming convention representing the common entity that the graphql types implementing it would be associated to.

2. The file containing the pothos schema definition of a graphql interface must be named the same as the sdl name of that graphql interface.

3. All the fields of a graphql interface must follow the `snakeCase` naming convention.

4. The object reference to the pothos schema definition for a graphql interface must be a pothos `interfaceRef` named export named the same as the sdl name of that graphql interface suffixed with the keyword `Ref`.

Here's an example depicting these rules: 

```typescript
// Message.ts
import { builder } from "~/src/graphql/schemaBuilder.js";

type Message = {
	body: string;
};

export const MessageRef = builder.interfaceRef<Message>("Message");

MessageRef.implement({
	fields: (t) => ({
		body: t.exposeString("body"),
	}),
});
```
In this example: 

1. The sdl name of the graphql interface is `Message` which follows the `PascalCase` naming convention and represents the common entity message that the graphql types implementing it would be associated to.

2. The file containing the pothos schema definition of the graphql interface is named `Message.ts` which is the same as the sdl name of that graphql interface.

3. The fields of the graphql interface are `body` and `createdAt` which follow the `snakeCase` naming convention.

4. The object reference to the pothos schema definition for the graphql interface is a named export named `MessageRef` which is the same as the sdl name of that graphql interface suffixed with the keyword `Ref`.
