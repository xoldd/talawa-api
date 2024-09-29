import { builder } from "./schemaBuilder.js";
import "./types/index.js";

/**
 * This is the executable schema for the graphQL server.
 */
export const schema = builder.toSchema({
	sortSchema: true,
});
