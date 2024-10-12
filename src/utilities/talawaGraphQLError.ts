import { GraphQLError, type GraphQLErrorOptions } from "graphql";

/**
 * The term action used below is used to refer to CRUD(Create/Read/Update/Delete) operations performed
 * by the clients. In the context of a graphql server query, mutation and subscription are the three
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
 *  code: "argument_associated_resource_not_found"
 * })
 */
type ArgumentAssociatedResourceNotFound = {
	argumentPath: (string | number)[];
	code: "argument_associated_resource_not_found";
};

/**
 * When the client tries to perform an action that conflicts with real world expectations of the
 * application.
 *
 * @example
 * throw new TalawaGraphQLError("You can only claim your yearly award once per year.",
 * {
 *  code: "forbidden_action"
 * })
 */
type ForbiddenAction = {
	code: "forbidden_action";
};

/**
 * When the client tries to perform an action on a resource associated to an argument that conflicts
 * with real world expectations of the application. One example would be a user trying to follow their
 * own account on a social media application.
 *
 * @example
 * throw new TalawaGraphQLError("You cannot follow your own user account.", {
 *  argumentPath: ["id"],
 *  code: "forbidden_action_on_argument_associated_resource"
 * })
 */
type ForbiddenActionOnArgumentAssociatedResource = {
	argumentPath: (string | number)[];
	code: "forbidden_action_on_argument_associated_resource";
};

/**
 * When the client must be authenticated to perform an action.
 *
 * @example
 * throw new TalawaGraphQLError("You must be authenticated to create a post.", {
 *  code: "unauthenticated"
 * })
 */
type Unauthenticated = {
	code: "unauthenticated";
};

/**
 * When the client provides invalid arguments while performing an action.
 *
 * @example
 * throw new TalawaGraphQLError("Invalid arguments provided.", {
 *  code: "invalid_arguments",
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
	code: "invalid_arguments";
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
 *  code: "resource_not_found"
 * })
 */
type ResourceNotFound = {
	code: "resource_not_found";
};

/**
 * When the client is not authorized to perform an action.
 *
 * @example
 * throw new TalawaGraphQLError("Your account does not meet the minimum requirements to create posts.", {
 *  code: "unauthorized_action"
 * })
 */
type UnauthorizedAction = {
	code: "unauthorized_action";
};

/**
 * When the client is not authorized to perform an action on a resource associated to an argument.
 *
 * @example
 * throw new TalawaGraphQLError("You must be an approved member of this community to access it.", {
 *  argumentPath: ["id"],
 *  code: "unauthorized_action_on_argument_associated_resource"
 * })
 */
type UnauthorizedActionOnArgumentAssociatedResource = {
	argumentPath: (string | number)[];
	code: "unauthorized_action_on_argument_associated_resource";
};

/**
 * When an error that doesn't fit one of the errors listed above occurs. One example would be a database
 * request failure.
 *
 * @example
 * throw new TalawaGraphQLError("Something went wrong. Please try again later.", {
 *  code: "unexpected"
 * })
 */
type Unexpected = {
	code: "unexpected";
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
 * If necessary, the localization of the error messages(i18n) can be done within the graphql resolvers where this function is used.
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
 *          code: "resource_not_found"
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
