# About this directory

This directory is intended for storing the pothos schema definitions for the graphQL interfaces used in talawa api's graphQL implementation.

# Conventions

The following coventions are to be followed within this directory:-

1. The sdl name of a graphQL interface must follow the `PascalCase` naming convention and represent the common entity that the graphQL types implementing it are associated to.

2. The file containing the pothos schema definition of a graphQL interface must be named the same as the sdl name of that graphQL interface.

3. All the fields of a graphQL interface must follow the `snakeCase` naming convention.

4. The object reference to the pothos schema definition for a graphQL interface must be a pothos `interfaceRef` named export named the same as the sdl name of that graphQL interface suffixed with the keyword `Ref`.

Here's an example depicting these rules: 

```typescript
// Message.ts
import { builder } from "~/src/graphQL/schemaBuilder.js";

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

1. The sdl name of the graphQL interface is `Message` which follows the `PascalCase` naming convention and represents the common entity message that the graphQL types implementing it are associated to.

2. The file containing the pothos schema definition of the graphQL interface is named `Message.ts` which is the same as the sdl name `Message` of that graphQL interface.

3. The fields of the graphQL interface are `body` and `createdAt` respectively which follow the `snakeCase` naming convention.

4. The object reference to the pothos schema definition for the graphQL interface is a named export named `MessageRef` which is the same as the sdl name of that graphQL interface suffixed with the keyword `Ref`.
