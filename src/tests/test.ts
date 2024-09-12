import { describe, it } from "node:test";
import { graphql } from "gql.tada";
import { print } from "graphql";
import initializeFastify from "../initialize_fastify.js";

const fastify = await initializeFastify();

const UserQuery = graphql(`query UserQuery($id: ID!) {
  user(id: $id){
    id
  }
}`);

describe("", {}, async () => {
	it("", async () => {
		const response = fastify.inject({
			body: print(UserQuery),
		});
	});
});
