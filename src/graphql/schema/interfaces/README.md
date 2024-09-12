# About this directory

This directory is intended for storing the pothos schema definitions for graphql interfaces used in talawa api's graphql implementation.

# Conventions

> Parts of a word consist of prefix, root and suffix.

The following coventions are to be followed within this directory:-

1. The sdl name of a graphql interface must follow the "PascalCase" naming convention consisting of a root suffixed by the keyword "Interface".

2. The file containing the pothos schema definition of a graphql interface must be named the same as the sdl name of that graphql interface.

3. The object reference to the pothos schema definition for a graphql interface must be a named export named the same as the root of the sdl name of that graphql interface suffixed with the keyword "GqlInterface".

Here's an example depicting these rules:-

```typescript
// CreateMessageInterface.ts
export const CreateMessageGqlInterface = builder.interfaceType("CreateMessageInterface", {
	fields: (t) => {
		body: t.string({
			required: true,
		});
		receiverId: t.id({
			required: true,
		});
	},
});
```
In this example:-

1. The sdl name of the graphql interface is "CreateMessageInterface" which follows the "PascalCase" naming convention consisting of the root "CreateMessage" suffixed by the keyword "Interface".

2. The file containing the pothos schema definition of the graphql interface is named "CreateMessageInterface.ts" which is the same as the sdl name "CreateMessageInterface" of the graphql interface.

3. The object reference to the pothos schema definition for the graphql interface is a named export named "CreateMessageGqlInterface" which is the same as the root "CreateMessage" of the sdl name "CreateMessageInterface" of the graphql interface suffixed with the keyword "GqlInterface".
