import { randomUUID } from "node:crypto";
import { expect, test } from "vitest";
import { expectToBeNonNullish } from "../../helpers.js";
import { gql, mercuriusClient } from "../client.js";

test("Query test", async () => {
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
	expectToBeNonNullish(createMessageMutationResult.data?.createMessage);

	const messageQueryDoc = gql(`query messageQuery($id: ID!) {
    	message(id: $id) {
			body
			id
		}
    }`);

	const messageQueryResult = await mercuriusClient.query(messageQueryDoc, {
		variables: {
			id: createMessageMutationResult.data.createMessage.id,
		},
	});

	expect(messageQueryResult.errors).toEqual(undefined);
	expectToBeNonNullish(messageQueryResult.data.message);
	expect(messageQueryResult.data.message).toEqual(
		createMessageMutationResult.data.createMessage,
	);
});
