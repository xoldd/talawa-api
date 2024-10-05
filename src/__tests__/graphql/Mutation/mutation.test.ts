import { randomUUID } from "node:crypto";
import { expect, test } from "vitest";
import { gql, mercuriusClient } from "../client.js";

test("Mutation test", async () => {
	const createMessageMutationDoc = gql(`mutation createMessageMutation ($body: String!) {
        createMessage(body: $body) {
			body
			id
		}
    }`);

	const body = `body${randomUUID()}`;

	const createMessageMutationResult = await mercuriusClient.mutate(
		createMessageMutationDoc,
		{
			variables: {
				body,
			},
		},
	);

	expect(createMessageMutationResult.errors).toEqual(undefined);
	expect(createMessageMutationResult.data.createMessage).contains({ body });
});
