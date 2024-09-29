import { graphql } from "gql.tada";
import { describe, expect, it } from "vitest";
import { mercuriusTestClient } from "~/src/tests/mercuriusTestClient.js";

describe("Test describe block", async () => {
	it("Test block", async () => {
		const CountQueryDocument = graphql(`query CountQuery {
			count
		}`);

		const { data, errors } = await mercuriusTestClient.query(
			CountQueryDocument,
			{
				variables: {
					id: "",
				},
			},
		);

		expect(errors).toEqual(undefined);
		expect(data.count).toBeTypeOf("number");
	});
});
