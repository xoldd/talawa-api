import { randomUUID } from "node:crypto";
import { setTimeout } from "node:timers/promises";
import { expect, test } from "vitest";
import { assertToBeNonNullish, isSubSequence } from "../../helpers.js";
import { type ResultOf, gql, mercuriusClient } from "../client.js";

test("Subscription test", async () => {
	const createMessageMutationDoc = gql(`mutation createMessageMutation($body: String!) {
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

	expect(createMessageMutationResult.errors).toBeUndefined();
	assertToBeNonNullish(createMessageMutationResult.data.createMessage);

	const messageUpdatedSubscriptionDoc = gql(`subscription messageUpdatedSubscription($id: ID!) {
		messageUpdated(id: $id) {
			body
			id
		}
	}`);

	const messageUpdatedSubscriptionDataList: ResultOf<
		typeof messageUpdatedSubscriptionDoc
	>["messageUpdated"][] = [];

	const { unsubscribe } = await mercuriusClient.subscribe({
		onData: (result) => {
			expect(result.errors).toBeUndefined();
			assertToBeNonNullish(result.data.messageUpdated);
			messageUpdatedSubscriptionDataList.push(result.data.messageUpdated);
		},
		query: messageUpdatedSubscriptionDoc,
		variables: {
			id: createMessageMutationResult.data.createMessage.id,
		},
	});

	const updateMessageMutationDoc = gql(`mutation updateMessageMutation ($id: ID!, $body: String!) {
			updateMessage(id: $id, body: $body) {
				body
				id
			}
		}`);

	const updateMessageMutationDataList: ResultOf<
		typeof updateMessageMutationDoc
	>["updateMessage"][] = [];

	const updateMessageMutationResult0 = await mercuriusClient.mutate(
		updateMessageMutationDoc,
		{
			variables: {
				body: `body${randomUUID()}`,
				id: createMessageMutationResult.data.createMessage.id,
			},
		},
	);

	expect(updateMessageMutationResult0.errors).toEqual(undefined);
	assertToBeNonNullish(updateMessageMutationResult0.data.updateMessage);
	updateMessageMutationDataList.push(
		updateMessageMutationResult0.data.updateMessage,
	);

	const updateMessageMutationResult1 = await mercuriusClient.mutate(
		updateMessageMutationDoc,
		{
			variables: {
				body: `body${randomUUID()}`,
				id: createMessageMutationResult.data.createMessage.id,
			},
		},
	);

	expect(updateMessageMutationResult1.errors).toEqual(undefined);
	assertToBeNonNullish(updateMessageMutationResult1.data.updateMessage);
	updateMessageMutationDataList.push(
		updateMessageMutationResult1.data.updateMessage,
	);

	/**
	 * There needs to be an artificial delay for the subscription event triggered by the previous mutations to resolve before we make assertions against the data of those events.
	 */
	await setTimeout(100);

	// expect(messageUpdatedSubscriptionDataList).containSubset(
	// 	updateMessageMutationDataList,
	// );
	console.log(messageUpdatedSubscriptionDataList);
	console.log(updateMessageMutationDataList);

	expect(
		isSubSequence(
			messageUpdatedSubscriptionDataList,
			updateMessageMutationDataList,
		),
	).toEqual(true);

	unsubscribe();
});
