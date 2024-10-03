# About this directory

This directory is intended for storing the pothos schema definitions for graphQL inputs used in talawa api's graphQL implementation. More about implementing graphQL inputs with pothos at [this](https://pothos-graphql.dev/docs/guide/inputs) link.

# Conventions

The following coventions are to be followed within this directory: 

1. The sdl name of a graphQL input must follow the `PascalCase` naming convention consisting of a base keyword suffixed with the keyword `Input`.

2. The file containing the pothos schema definition of a graphQL input must be named the same as the sdl name of that graphQL input.

3. All the fields of a graphQL input must follow the `snakeCase` naming convention.

3. The object reference to the pothos schema definition for a graphQL input must either be a pothos `inputRef` or `inputType` named export named the same as the sdl name of that graphQL input.

Here's an example depicting these rules: 

```typescript
// CreatePostInput.ts
type CreatePostInput = {
	body: string;
	title: string;
};

export const CreatePostInput = builder.inputRef<CreatePostInput>("CreatePostInput");

CreatePostInput.implement({
	fields: (t) => ({
		body: t.string({
			required: true
		}),
		title: t.string({
			required: true
		})
	})
});
```
```typescript
// DeleteAccountInput.ts
export const DeleteAccountInput = builder.inputType("DeleteAccountInput", {
	fields: (t) => {
		id: t.id({
			required: true,
		});
		reasonForDeletion: t.string();
	},
});
```
In this example:-

1. The sdl names of the graphQL inputs are `CreatePostInput` and `DeleteAccountInput` which follow the `PascalCase` naming convention consisting of the base keywords `CreatePost` and `DeleteAccount`, both suffixed with the keyword `Input`.

2. The file containing the pothos schema definition of the graphQL inputs are named `CreateMessageInput.ts` and `DeleteAccountInput.ts` which are the same as the sdl names `CreateMessageInput` and `DeleteAccountInput` of the graphQL inputs.

3. The object references to the pothos schema definition for the graphQL inputs are named exports named `CreatePostInputRef` and `DeleteAccountInput` named the same as the sdl name of those graphQL inputs.