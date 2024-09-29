import { GraphQLError, type GraphQLErrorOptions } from "graphql";

/**
 * The term action used below is used to refer to CRUD(Create/Read/Update/Delete) operations performed
 * by the clients. In the context of a graphQL server query, mutation and subscription are the three
 * possible ways to perform these actions.
 *
 * The term resource used below is used to refer to any entity that the client can perform an action
 * on. These can be both coarse and fine grained entities. One example for a coarse grained entity
 * would be the account of a user. One example for a fine grained entity would be the email of a user.
 */

/**
 * When a resource associated to an argument is not found.
 *
 * @example
 * throw new TalawaGraphQLError("Post not found.", {
 *  argumentPath: ["input", "postId"],
 *  code: "ARGUMENT_ASSOCIATED_RESOURCE_NOT_FOUND"
 * })
 */
type ArgumentAssociatedResourceNotFound = {
	argumentPath: (string | number)[];
	code: "ARGUMENT_ASSOCIATED_RESOURCE_NOT_FOUND";
};

/**
 * When the client tries to perform an action that conflicts with real world expectations of the
 * application.
 *
 * @example
 * throw new TalawaGraphQLError("You can only claim your yearly award once per year.",
 * {
 *  code: "FORBIDDEN_ACTION"
 * })
 */
type ForbiddenAction = {
	code: "FORBIDDEN_ACTION";
};

/**
 * When the client tries to perform an action on a resource associated to an argument that conflicts
 * with real world expectations of the application. One example would be a user trying to follow their
 * own account on a social media application.
 *
 * @example
 * throw new TalawaGraphQLError("You cannot follow your own user account.", {
 *  argumentPath: ["id"],
 *  code: "FORBIDDEN_ACTION_ON_ARGUMENT_ASSOCIATED_RESOURCE"
 * })
 */
type ForbiddenActionOnArgumentAssociatedResource = {
	argumentPath: (string | number)[];
	code: "FORBIDDEN_ACTION_ON_ARGUMENT_ASSOCIATED_RESOURCE";
};

/**
 * When the client must be authenticated to perform an action.
 *
 * @example
 * throw new TalawaGraphQLError("You must be authenticated to create a post.", {
 *  code: "UNAUTHENTICATED"
 * })
 */
type Unauthenticated = {
	code: "UNAUTHENTICATED";
};

/**
 * When the client provides invalid arguments while performing an action.
 *
 * @example
 * throw new TalawaGraphQLError("Invalid arguments provided.", {
 *  code: "INVALID_ARGUMENTS",
 *  issues: [
 *      {
 *          argumentPath: ["input", "age"],
 *          message: "Your age must be greater than 18."
 *      },
 *      {
 *          argumentPath: ["input", "username"],
 *          message: "Username must be smaller than or equal to 25 characters."
 *      },
 *      {
 *          argumentPath: ["input", "favoriteFood", 2],
 *          message: "This favourite food entry must be at least 1 character long."
 *      },
 *  ]
 * })
 */
type InvalidArguments = {
	code: "INVALID_ARGUMENTS";
	issues: {
		argumentPath: (string | number)[];
		message: string;
	}[];
};

/**
 * When a resource is not found.
 *
 * @example
 * throw new TalawaGraphQLError("Post creator not found.", {
 *  code: "RESOURCE_NOT_FOUND"
 * })
 */
type ResourceNotFound = {
	code: "RESOURCE_NOT_FOUND";
};

/**
 * When the client is not authorized to perform an action.
 *
 * @example
 * throw new TalawaGraphQLError("Your account does not meet the minimum requirements to create posts.", {
 *  code: "UNAUTHORIZED_ACTION"
 * })
 */
type UnauthorizedAction = {
	code: "UNAUTHORIZED_ACTION";
};

/**
 * When the client is not authorized to perform an action on a resource associated to an argument.
 *
 * @example
 * throw new TalawaGraphQLError("You must be an approved member of this community to access it.", {
 *  argumentPath: ["id"],
 *  code: "UNAUTHORIZED_ACTION_ON_ARGUMENT_ASSOCIATED_RESOURCE"
 * })
 */
type UnauthorizedActionOnArgumentAssociatedResource = {
	argumentPath: (string | number)[];
	code: "UNAUTHORIZED_ACTION_ON_ARGUMENT_ASSOCIATED_RESOURCE";
};

/**
 * When an error that doesn't fit one of the errors listed above occurs. One example would be a database
 * request failure.
 *
 * @example
 * throw new TalawaGraphQLError("Something went wrong. Please try again later.", {
 *  code: "UNEXPECTED"
 * })
 */
type Unexpected = {
	code: "UNEXPECTED";
};

type TalawaGraphQLErrorExtensions =
	| ArgumentAssociatedResourceNotFound
	| ForbiddenAction
	| ForbiddenActionOnArgumentAssociatedResource
	| Unauthenticated
	| InvalidArguments
	| ResourceNotFound
	| UnauthorizedAction
	| UnauthorizedActionOnArgumentAssociatedResource
	| Unexpected;

/**
 * This function is used to create instances of `GraphQLError` class with strict typescript assertion on providing the error metadata within the `extensions` field.
 *
 * This assertion prevents talawa api contributers from returning arbitrary, undocumented errors to the talawa api graphql clients.
 *
 * This also standardizes the errors that the client developers using talawa api can expect in the graphql responses, helping them design better UI experiences for end users.
 *
 * If necessary, the localization of the error messages(i18n) can be done within the graphQL resolvers where this function is used.
 *
 * The following example shows the usage of `createTalawaGraphQLError` function within a graphql resolver for resolving the user record of the best friend of a user:
 * @example
 * export const bestFriend = async (parent, args, ctx) => {
 *  const user = await ctx.drizzleClient.query.user.findFirst({
 *      where(fields, operators) {
 *          return operators.eq(fields.id, parent.bestFriendId);
 *      }
 *  });
 *
 *  if (user === undefined) {
 *      throw createTalawaGraphQLError("Best friend not found", {
 *          code: "RESOURCE_NOT_FOUND"
 *      })
 *  }
 *
 *  return user;
 * }
 */
export const createTalawaGraphQLError = (
	message: string,
	options: GraphQLErrorOptions & {
		extensions: TalawaGraphQLErrorExtensions;
	},
) => {
	return new GraphQLError(message, options);
};
