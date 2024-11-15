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
