import { createMercuriusTestClient } from "mercurius-integration-testing";
import { server } from "../../server";

export const mercuriusClient = createMercuriusTestClient(server, {
	url: "/graphql",
});
