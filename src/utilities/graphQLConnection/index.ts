/**
 * This function is used to check nullish state of a value passed to it. Nullish means the
 * value being either `null` or `undefined`. If the value is found to be nullish, the function
 * returns the boolean `false`, else it returns the boolean `true`.
 * @example
 * Here's an example:-
 * function print(str: string | null) \{
 *   if(isNotNullish(str)) \{
 *     console.log(`the string is ${str}`)
 *   \} else \{
 *     console.log(`the string is null`)
 *   \}
 * \}
 */
export function isNotNullish<T0>(value: T0 | undefined | null): value is T0 {
	return value !== undefined && value !== null;
}

/**
 * This is typescript type of a base graphql argument error. This argument error type can be
 * extended to create custom argument error types as long as they adhere to the default type of
 * this base graphql argument error.
 */
export type DefaultGraphQLArgumentError = {
	message: string;
	path: string[];
};

/**
 * This is typescript type of the standard arguments object received by a graphql connection
 * following the relay cursor connection specification, More information at this link: {@link https://relay.dev/graphql/connections.htm}
 */
export type DefaultGraphQLConnectionArguments = {
	after?: string | null;
	before?: string | null;
	first?: number | null;
	last?: number | null;
};

/**
 * This is typescript type of the direction the graphql connection is to be traversed in.
 */
export type GraphQLConnectionTraversalDirection = "FORWARD" | "BACKWARD";

export * from "./generateDefaultGraphQLConnection";
export * from "./getCommonGraphQLConnectionFilter";
export * from "./getCommonGraphQLConnectionSort";
export * from "./parseGraphQLConnectionArguments";
export * from "./parseGraphQLConnectionArgumentsWithSortedBy";
export * from "./parseGraphQLConnectionArgumentsWithSortedByAndWhere";
export * from "./parseGraphQLConnectionArgumentsWithWhere";
export * from "./transformToDefaultGraphQLConnection";
