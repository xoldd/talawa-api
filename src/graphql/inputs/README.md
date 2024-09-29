# About this directory

This directory is intended for storing the pothos schema definitions for graphql inputs used in talawa api's graphql implementation.

# Conventions

> Parts of a word consist of prefix, root and suffix.

The following coventions are to be followed within this directory:-

1. The sdl name of a graphql input must follow the "PascalCase" naming convention consisting of a root suffixed by the keyword "Input".

2. The file containing the pothos schema definition of a graphql input must be named the same as the sdl name of that graphql input.

3. The object reference to the pothos schema definition for a graphql input must be a named export named the same as the root of the sdl name of that graphql input suffixed with the keyword "GqlInput".

Here's an example depicting these rules:-

```typescript
// CreateMessageInput.ts
export const CreateMessageGqlInput = builder.inputType("CreateMessageInput", {
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

1. The sdl name of the graphql input is "CreateMessageInput" which follows the "PascalCase" naming convention consisting of the root "CreateMessage" suffixed by the keyword "Input".

2. The file containing the pothos schema definition of the graphql input is named "CreateMessageInput.ts" which is the same as the sdl name "CreateMessageInput" of the graphql input.

3. The object reference to the pothos schema definition for the graphql input is a named export named "CreateMessageGqlInput" which is the same as the root "CreateMessage" of the sdl name "CreateMessageInput" of the graphql input suffixed with the keyword "GqlInput".
