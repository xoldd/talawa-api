import { createMercuriusTestClient } from "mercurius-integration-testing";
import { type ResultOf, envConfig, graphql } from "tests/graphqlClient.js";
import { expectToBeNonNullish } from "tests/helpers.js";
import { expect, suite, test } from "vitest";
import { initializeFastify } from "~/src/initializeFastify";

suite.concurrent("GraphQL test", async () => {
	test.concurrent("Query test", async () => {
		const fastify = await initializeFastify({
			envConfig,
		});

		const mercuriusTestClient = createMercuriusTestClient(fastify);

		const countQueryDoc = graphql(`query countQuery {
			count
		}`);

		const countQueryResult = await mercuriusTestClient.query(countQueryDoc);

		expect(countQueryResult.errors).toEqual(undefined);
		expectToBeNonNullish(countQueryResult.data.count);
	});

	test.concurrent("Mutation test", async () => {
		const fastify = await initializeFastify({
			envConfig,
		});

		const mercuriusTestClient = createMercuriusTestClient(fastify);

		const countQueryDoc = graphql(`query countQuery {
			count
		}`);

		const countQueryResult = await mercuriusTestClient.query(countQueryDoc);

		expect(countQueryResult.errors).toEqual(undefined);
		expectToBeNonNullish(countQueryResult.data.count);

		const mutateCountMutationDoc = graphql(`mutation MutateCountMutation ($toMutateBy: Int!) {
			mutateCount(toMutateBy: $toMutateBy)
		}`);

		const mutateCountMutationResult = await mercuriusTestClient.query(
			mutateCountMutationDoc,
			{
				variables: {
					toMutateBy: 1,
				},
			},
		);

		expect(mutateCountMutationResult.errors).toEqual(undefined);
		expect(mutateCountMutationResult.data.mutateCount).toEqual(
			countQueryResult.data.count + 1,
		);
	});

	test.concurrent("Subscription test", async () => {
		const fastify = await initializeFastify({
			envConfig,
		});

		const mercuriusTestClient = createMercuriusTestClient(fastify);

		const mutateCountMutationDoc = graphql(`mutation MutateCountMutation ($toMutateBy: Int!) {
			mutateCount(toMutateBy: $toMutateBy)
		}`);

		const mutateCountMutationResult0 = await mercuriusTestClient.query(
			mutateCountMutationDoc,
			{
				variables: {
					toMutateBy: 1,
				},
			},
		);

		expect(mutateCountMutationResult0.errors).toEqual(undefined);
		expectToBeNonNullish(mutateCountMutationResult0.data.mutateCount);

		const mutateCountMutationResult1 = await mercuriusTestClient.query(
			mutateCountMutationDoc,
			{
				variables: {
					toMutateBy: 1,
				},
			},
		);

		expect(mutateCountMutationResult1.errors).toEqual(undefined);
		expectToBeNonNullish(mutateCountMutationResult1.data.mutateCount);

		const mutateCountMutationResult2 = await mercuriusTestClient.query(
			mutateCountMutationDoc,
			{
				variables: {
					toMutateBy: 1,
				},
			},
		);

		expect(mutateCountMutationResult2.errors).toEqual(undefined);
		expectToBeNonNullish(mutateCountMutationResult2.data.mutateCount);

		const countMutatedSubscriptionDoc = graphql(`subscription countMutatedSubscription{
			countMutated
		}`);

		const mutateCountMutationDataList: ResultOf<
			typeof mutateCountMutationDoc
		>["mutateCount"][] = [
			mutateCountMutationResult0.data.mutateCount,
			mutateCountMutationResult1.data.mutateCount,
			mutateCountMutationResult2.data.mutateCount,
		];

		const { unsubscribe } = await mercuriusTestClient.subscribe({
			onData: (result) => {
				expect(result.errors).toBeUndefined();
				expectToBeNonNullish(result.data.countMutated);
				expect(result.data.countMutated).toEqual(
					mutateCountMutationDataList.shift(),
				);
			},
			query: countMutatedSubscriptionDoc,
		});

		unsubscribe();

		await fastify.close();
	});
});
