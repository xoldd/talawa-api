import { builder } from "./builder";
import "./enums/index";
import "./inputs/index";
import "./interfaces/index";
import "./scalars/index";
import "./types/index";
import "./unions/index";

/**
 * This is the executable schema for the graphQL server.
 */
export const schema = builder.toSchema({
	sortSchema: true,
});
