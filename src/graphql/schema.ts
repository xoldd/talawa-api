import { builder } from "./schemaBuilder.js";
import "./enums/index.js";
import "./inputs/index.js";
import "./interfaces/index.js";
import "./scalars/index.js";
import "./types/index.js";

/**
 * This is the executable schema for the graphQL server.
 */
export const schema = builder.toSchema({
	sortSchema: true,
});
