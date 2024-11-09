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
 * When resources associated to arguments are not found.
 *
 * @example
 *	throw new TalawaGraphQLError("No posts found for some of the provided arguments.", {
 *		code: "arguments_associated_resources_not_found"
 *		issues: [
 *			{
 * 				argumentPath: ["input", 0, "id"],
 * 			},
 * 			{
 * 				argumentPath: ["input", 3, "id"],
 * 			},
 * 			{
 * 				argumentPath: ["input", 19, "id"],
 * 			},
 *		],
 *	});
 */
export type ArgumentsAssociatedResourcesNotFound = {
	code: "arguments_associated_resources_not_found";
	issues: {
		argumentPath: (string | number)[];
	}[];
};

/**
 * When the client tries to perform an action that conflicts with real world expectations of the application.
 *
 * @example
 * throw new TalawaGraphQLError("You can only claim your yearly award once per year.",
 * {
 *  code: "forbidden_action"
 * })
 */
export type ForbiddenAction = {
	code: "forbidden_action";
};

/**
 * When the client tries to perform an action on a resource associated to an argument that conflicts with real world expectations of the application. One example would be a user trying to follow their own account on a social media application.
 *
 * @example
 *	throw new TalawaGraphQLError("You cannot perform forbidden actions on resources associated to the arguments.", {
 *		code: "forbidden_action_on_arguments_associated_resources"
 *		issues: [
 *			{
 * 				argumentPath: ["input", 0, "emailAddress"],
 * 				message: "This email address in already registered under a talawa user.",
 * 			},
 * 			{
 * 				argumentPath: ["input", 3, "username"],
 * 				message: "This username is already registered under a talawa user.",
 * 			},
 *		],
 *	});
 */
export type ForbiddenActionOnArgumentsAssociatedResources = {
	code: "forbidden_action_on_arguments_associated_resources";
	issues: {
		argumentPath: (string | number)[];
		message: string;
	}[];
};

/**
 * When the client must be authenticated to perform an action.
 *
 * @example
 * throw new TalawaGraphQLError("You must be authenticated to create a post.", {
 *  code: "unauthenticated"
 * })
 */
export type Unauthenticated = {
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
export type InvalidArguments = {
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
export type ResourceNotFound = {
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
export type UnauthorizedAction = {
	code: "unauthorized_action";
};

/**
 * When the client is not authorized to perform an action on a resource associated to an argument.
 *
 * @example
 * throw new TalawaGraphQLError("You must be an approved member of this community to access it.", {
 *  argumentPath: ["id"],
 *  code: "unauthorized_action_on_arguments_associated_resources"
 * })
 */
export type UnauthorizedActionOnArgumentsAssociatedResources = {
	issues: {
		argumentPath: (string | number)[];
	}[];
	code: "unauthorized_action_on_arguments_associated_resources";
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
export type Unexpected = {
	code: "unexpected";
};

export type TalawaGraphQLErrorExtensions =
	| ArgumentsAssociatedResourcesNotFound
	| ForbiddenAction
	| ForbiddenActionOnArgumentsAssociatedResources
	| Unauthenticated
	| InvalidArguments
	| ResourceNotFound
	| UnauthorizedAction
	| UnauthorizedActionOnArgumentsAssociatedResources
	| Unexpected;

/**
 * This class extends the `GraphQLError` class and is used to create graphql error instances with strict typescript assertion on providing the error metadata within the `extensions` field. This assertion prevents talawa api contributers from returning arbitrary, undocumented errors to the talawa api graphql clients.
 *
 * This also standardizes the errors that the client developers using talawa api can expect in the graphql responses, helping them design better UI experiences for end users. If necessary, the localization of the error messages(i18n) can be done within the graphql resolvers where this function is used.
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
 *	if (user === undefined) {
 *		throw new TalawaGraphQLError({
 *			extensions: {
 *				code: "resource_not_found"
 *			}
 * 			message: "No best friend found for this user.",
 *      })
 *	}
 *
 *  return user;
 * }
 */
export class TalawaGraphQLError extends GraphQLError {
	constructor({
		message,
		...options
	}: GraphQLErrorOptions & {
		extensions: TalawaGraphQLErrorExtensions;
		message: string;
	}) {
		super(message, options);
	}
}
