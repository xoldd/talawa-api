// import { faker } from "@faker-js/faker";
// import type { ResultOf, VariablesOf } from "gql.tada";
// import { expect, suite, test } from "vitest";
// import type {
// 	ArgumentsAssociatedResourcesNotFoundExtensions,
// 	ForbiddenActionExtensions,
// 	InvalidArgumentsExtensions,
// 	TalawaGraphQLFormattedError,
// 	UnauthenticatedExtensions,
// 	UnauthorizedActionExtensions,
// } from "~/src/utilities/TalawaGraphQLError";
// import { assertToBeNonNullish } from "../../../helpers";
// import { server } from "../../../server";
// import { mercuriusClient } from "../client";
// import {
// 	Mutation_createUser,
// 	Mutation_deleteUser,
// 	Query_signIn,
// 	Query_users,
// } from "../documentNodes";

// suite("Query field users", () => {
// test(`results in a graphql error with "unauthenticated" extensions code in the "errors" field and "null" as the value of "data.users" field if:
//     client triggering the graphql operation is not authenticated.`, async () => {
// 	const usersResult = await mercuriusClient.query(Query_users);

// 	expect(usersResult.data.users).toEqual(null);

// 	expect(usersResult.errors).toEqual(
// 		expect.arrayContaining<TalawaGraphQLFormattedError>([
// 			expect.objectContaining<TalawaGraphQLFormattedError>({
// 				extensions: expect.objectContaining<UnauthenticatedExtensions>({
// 					code: "unauthenticated",
// 				}),
// 				message: expect.any(String),
// 				path: ["users"],
// 			}),
// 		]),
// 	);
// });

// test(`results in a graphql error with "invalid_arguments" extensions code in the "errors" field and "null" as the value of "data.users" field if:
//     Neither of the arguments "first" or "last" are provided in the graphql operation.`, async () => {
// 	const administratorUserSignInResult = await mercuriusClient.query(
// 		Query_signIn,
// 		{
// 			variables: {
// 				input: {
// 					emailAddress: server.envConfig.API_ADMINISTRATOR_USER_EMAIL_ADDRESS,
// 					password: server.envConfig.API_ADMINISTRATOR_USER_PASSWORD,
// 				},
// 			},
// 		},
// 	);

// 	assertToBeNonNullish(
// 		administratorUserSignInResult.data.signIn?.authenticationToken,
// 	);

// 	const usersResult = await mercuriusClient.query(Query_users, {
// 		headers: {
// 			authorization: `bearer ${administratorUserSignInResult.data.signIn.authenticationToken}`,
// 		},
// 	});

// 	expect(usersResult.data.users).toEqual(null);
// 	expect(usersResult.errors).toEqual(
// 		expect.arrayContaining<TalawaGraphQLFormattedError>([
// 			expect.objectContaining<TalawaGraphQLFormattedError>({
// 				extensions: expect.objectContaining<InvalidArgumentsExtensions>({
// 					code: "invalid_arguments",
// 					issues: expect.arrayContaining<
// 						InvalidArgumentsExtensions["issues"][number]
// 					>([
// 						{
// 							argumentPath: ["first"],
// 							message: expect.any(String),
// 						},
// 						{
// 							argumentPath: ["last"],
// 							message: expect.any(String),
// 						},
// 					]),
// 				}),
// 				message: expect.any(String),
// 				path: ["users"],
// 			}),
// 		]),
// 	);
// });

// test(`results in a graphql error with "invalid_arguments" extensions code in the "errors" field and "null" as the value of "data.users" field if:
//     Value of both the arguments "first" and "last" is "null".`, async () => {
// 	const administratorUserSignInResult = await mercuriusClient.query(
// 		Query_signIn,
// 		{
// 			variables: {
// 				input: {
// 					emailAddress: server.envConfig.API_ADMINISTRATOR_USER_EMAIL_ADDRESS,
// 					password: server.envConfig.API_ADMINISTRATOR_USER_PASSWORD,
// 				},
// 			},
// 		},
// 	);

// 	assertToBeNonNullish(
// 		administratorUserSignInResult.data.signIn?.authenticationToken,
// 	);

// 	const usersResult = await mercuriusClient.query(Query_users, {
// 		headers: {
// 			authorization: `bearer ${administratorUserSignInResult.data.signIn.authenticationToken}`,
// 		},
// 		variables: {
// 			first: null,
// 			last: null,
// 		},
// 	});

// 	expect(usersResult.data.users).toEqual(null);
// 	expect(usersResult.errors).toEqual(
// 		expect.arrayContaining<TalawaGraphQLFormattedError>([
// 			expect.objectContaining<TalawaGraphQLFormattedError>({
// 				extensions: expect.objectContaining<InvalidArgumentsExtensions>({
// 					code: "invalid_arguments",
// 					issues: expect.arrayContaining<
// 						InvalidArgumentsExtensions["issues"][number]
// 					>([
// 						{
// 							argumentPath: ["first"],
// 							message: expect.any(String),
// 						},
// 						{
// 							argumentPath: ["last"],
// 							message: expect.any(String),
// 						},
// 					]),
// 				}),
// 				message: expect.any(String),
// 				path: ["users"],
// 			}),
// 		]),
// 	);
// });

// test(`results in a graphql error with "invalid_arguments" extensions code in the "errors" field and "null" as the value of "data.users" field if:
//     Value of the argument "first" is less than 1.
//     Value of the argument "last" is less than 1.`, async () => {
// 	const administratorUserSignInResult = await mercuriusClient.query(
// 		Query_signIn,
// 		{
// 			variables: {
// 				input: {
// 					emailAddress: server.envConfig.API_ADMINISTRATOR_USER_EMAIL_ADDRESS,
// 					password: server.envConfig.API_ADMINISTRATOR_USER_PASSWORD,
// 				},
// 			},
// 		},
// 	);

// 	assertToBeNonNullish(
// 		administratorUserSignInResult.data.signIn?.authenticationToken,
// 	);

// 	const usersResult = await mercuriusClient.query(Query_users, {
// 		headers: {
// 			authorization: `bearer ${administratorUserSignInResult.data.signIn.authenticationToken}`,
// 		},
// 		variables: {
// 			first: 0,
// 			last: 0,
// 		},
// 	});

// 	expect(usersResult.data.users).toEqual(null);
// 	expect(usersResult.errors).toEqual(
// 		expect.arrayContaining<TalawaGraphQLFormattedError>([
// 			expect.objectContaining<TalawaGraphQLFormattedError>({
// 				extensions: expect.objectContaining<InvalidArgumentsExtensions>({
// 					code: "invalid_arguments",
// 					issues: expect.arrayContaining<
// 						InvalidArgumentsExtensions["issues"][number]
// 					>([
// 						{
// 							argumentPath: ["first"],
// 							message: expect.any(String),
// 						},
// 						{
// 							argumentPath: ["last"],
// 							message: expect.any(String),
// 						},
// 					]),
// 				}),
// 				message: expect.any(String),
// 				path: ["users"],
// 			}),
// 		]),
// 	);
// });

// test(`results in a graphql error with "invalid_arguments" extensions code in the "errors" field and "null" as the value of "data.users" field if:
//     Value of the argument "first" is more than 32.
//     Value of the argument "last" is more than 32.`, async () => {
// 	const administratorUserSignInResult = await mercuriusClient.query(
// 		Query_signIn,
// 		{
// 			variables: {
// 				input: {
// 					emailAddress: server.envConfig.API_ADMINISTRATOR_USER_EMAIL_ADDRESS,
// 					password: server.envConfig.API_ADMINISTRATOR_USER_PASSWORD,
// 				},
// 			},
// 		},
// 	);

// 	assertToBeNonNullish(
// 		administratorUserSignInResult.data.signIn?.authenticationToken,
// 	);

// 	const usersResult = await mercuriusClient.query(Query_users, {
// 		headers: {
// 			authorization: `bearer ${administratorUserSignInResult.data.signIn.authenticationToken}`,
// 		},
// 		variables: {
// 			first: 33,
// 			last: 33,
// 		},
// 	});

// 	expect(usersResult.data.users).toEqual(null);
// 	expect(usersResult.errors).toEqual(
// 		expect.arrayContaining<TalawaGraphQLFormattedError>([
// 			expect.objectContaining<TalawaGraphQLFormattedError>({
// 				extensions: expect.objectContaining<InvalidArgumentsExtensions>({
// 					code: "invalid_arguments",
// 					issues: expect.arrayContaining<
// 						InvalidArgumentsExtensions["issues"][number]
// 					>([
// 						{
// 							argumentPath: ["first"],
// 							message: expect.any(String),
// 						},
// 						{
// 							argumentPath: ["last"],
// 							message: expect.any(String),
// 						},
// 					]),
// 				}),
// 				message: expect.any(String),
// 				path: ["users"],
// 			}),
// 		]),
// 	);
// });

// test(`results in a graphql error with "invalid_arguments" extensions code in the "errors" field and "null" as the value of "data.users" field if:
//     Arguments "first", "last" and optionally argument "before" are provided in the graphql operation with non-null values.`, async () => {
// 	const administratorUserSignInResult = await mercuriusClient.query(
// 		Query_signIn,
// 		{
// 			variables: {
// 				input: {
// 					emailAddress: server.envConfig.API_ADMINISTRATOR_USER_EMAIL_ADDRESS,
// 					password: server.envConfig.API_ADMINISTRATOR_USER_PASSWORD,
// 				},
// 			},
// 		},
// 	);

// 	assertToBeNonNullish(
// 		administratorUserSignInResult.data.signIn?.authenticationToken,
// 	);

// 	const usersResult = await mercuriusClient.query(Query_users, {
// 		headers: {
// 			authorization: `bearer ${administratorUserSignInResult.data.signIn.authenticationToken}`,
// 		},
// 		variables: {
// 			before: "cursor",
// 			first: 1,
// 			last: 1,
// 		},
// 	});

// 	expect(usersResult.data.users).toEqual(null);
// 	expect(usersResult.errors).toEqual(
// 		expect.arrayContaining<TalawaGraphQLFormattedError>([
// 			expect.objectContaining<TalawaGraphQLFormattedError>({
// 				extensions: expect.objectContaining<InvalidArgumentsExtensions>({
// 					code: "invalid_arguments",
// 					issues: expect.arrayContaining<
// 						InvalidArgumentsExtensions["issues"][number]
// 					>([
// 						{
// 							argumentPath: ["before"],
// 							message: expect.any(String),
// 						},
// 						{
// 							argumentPath: ["last"],
// 							message: expect.any(String),
// 						},
// 					]),
// 				}),
// 				message: expect.any(String),
// 				path: ["users"],
// 			}),
// 		]),
// 	);
// });

// test(`results in a graphql error with "invalid_arguments" extensions code in the "errors" field and "null" as the value of "data.users" field if:
//     Arguments "after" and "last" are provided in the graphql operation with non-null values.`, async () => {
// 	const administratorUserSignInResult = await mercuriusClient.query(
// 		Query_signIn,
// 		{
// 			variables: {
// 				input: {
// 					emailAddress: server.envConfig.API_ADMINISTRATOR_USER_EMAIL_ADDRESS,
// 					password: server.envConfig.API_ADMINISTRATOR_USER_PASSWORD,
// 				},
// 			},
// 		},
// 	);

// 	assertToBeNonNullish(
// 		administratorUserSignInResult.data.signIn?.authenticationToken,
// 	);

// 	const usersResult = await mercuriusClient.query(Query_users, {
// 		headers: {
// 			authorization: `bearer ${administratorUserSignInResult.data.signIn.authenticationToken}`,
// 		},
// 		variables: {
// 			after: "cursor",
// 			last: 1,
// 		},
// 	});

// 	expect(usersResult.data.users).toEqual(null);
// 	expect(usersResult.errors).toEqual(
// 		expect.arrayContaining<TalawaGraphQLFormattedError>([
// 			expect.objectContaining<TalawaGraphQLFormattedError>({
// 				extensions: expect.objectContaining<InvalidArgumentsExtensions>({
// 					code: "invalid_arguments",
// 					issues: expect.arrayContaining<
// 						InvalidArgumentsExtensions["issues"][number]
// 					>([
// 						{
// 							argumentPath: ["after"],
// 							message: expect.any(String),
// 						},
// 					]),
// 				}),
// 				message: expect.any(String),
// 				path: ["users"],
// 			}),
// 		]),
// 	);
// });

// test(`results in a graphql error with "invalid_arguments" extensions code in the "errors" field and "null" as the value of "data.users" field if:
//     Value of argument "after" is an invalid graphql connection cursor.`, async () => {
// 	const administratorUserSignInResult = await mercuriusClient.query(
// 		Query_signIn,
// 		{
// 			variables: {
// 				input: {
// 					emailAddress: server.envConfig.API_ADMINISTRATOR_USER_EMAIL_ADDRESS,
// 					password: server.envConfig.API_ADMINISTRATOR_USER_PASSWORD,
// 				},
// 			},
// 		},
// 	);

// 	assertToBeNonNullish(
// 		administratorUserSignInResult.data.signIn?.authenticationToken,
// 	);

// 	const usersResult = await mercuriusClient.query(Query_users, {
// 		headers: {
// 			authorization: `bearer ${administratorUserSignInResult.data.signIn.authenticationToken}`,
// 		},
// 		variables: {
// 			after: "cursor",
// 			first: 1,
// 		},
// 	});

// 	expect(usersResult.data.users).toEqual(null);
// 	expect(usersResult.errors).toEqual(
// 		expect.arrayContaining<TalawaGraphQLFormattedError>([
// 			expect.objectContaining<TalawaGraphQLFormattedError>({
// 				extensions: expect.objectContaining<InvalidArgumentsExtensions>({
// 					code: "invalid_arguments",
// 					issues: expect.arrayContaining<
// 						InvalidArgumentsExtensions["issues"][number]
// 					>([
// 						{
// 							argumentPath: ["after"],
// 							message: expect.any(String),
// 						},
// 					]),
// 				}),
// 				message: expect.any(String),
// 				path: ["users"],
// 			}),
// 		]),
// 	);
// });

// test(`results in a graphql error with "invalid_arguments" extensions code in the "errors" field and "null" as the value of "data.users" field if:
//     Value of argument "before" is an invalid graphql connection cursor.`, async () => {
// 	const administratorUserSignInResult = await mercuriusClient.query(
// 		Query_signIn,
// 		{
// 			variables: {
// 				input: {
// 					emailAddress: server.envConfig.API_ADMINISTRATOR_USER_EMAIL_ADDRESS,
// 					password: server.envConfig.API_ADMINISTRATOR_USER_PASSWORD,
// 				},
// 			},
// 		},
// 	);

// 	assertToBeNonNullish(
// 		administratorUserSignInResult.data.signIn?.authenticationToken,
// 	);

// 	const usersResult = await mercuriusClient.query(Query_users, {
// 		headers: {
// 			authorization: `bearer ${administratorUserSignInResult.data.signIn.authenticationToken}`,
// 		},
// 		variables: {
// 			before: "cursor",
// 			last: 1,
// 		},
// 	});

// 	expect(usersResult.data.users).toEqual(null);
// 	expect(usersResult.errors).toEqual(
// 		expect.arrayContaining<TalawaGraphQLFormattedError>([
// 			expect.objectContaining<TalawaGraphQLFormattedError>({
// 				extensions: expect.objectContaining<InvalidArgumentsExtensions>({
// 					code: "invalid_arguments",
// 					issues: expect.arrayContaining<
// 						InvalidArgumentsExtensions["issues"][number]
// 					>([
// 						{
// 							argumentPath: ["before"],
// 							message: expect.any(String),
// 						},
// 					]),
// 				}),
// 				message: expect.any(String),
// 				path: ["users"],
// 			}),
// 		]),
// 	);
// });

// test(`results in a graphql error with "unauthenticated" extensions code in the "errors" field and "null" as the value of "data.users" field if:
// 	client triggering the graphql operation has no existing user associated to their authentication context.`, async () => {
// 	const administratorUserSignInResult = await mercuriusClient.query(
// 		Query_signIn,
// 		{
// 			variables: {
// 				input: {
// 					emailAddress: server.envConfig.API_ADMINISTRATOR_USER_EMAIL_ADDRESS,
// 					password: server.envConfig.API_ADMINISTRATOR_USER_PASSWORD,
// 				},
// 			},
// 		},
// 	);

// 	assertToBeNonNullish(
// 		administratorUserSignInResult.data.signIn?.authenticationToken,
// 	);

// 	const createUserResult = await mercuriusClient.mutate(Mutation_createUser, {
// 		headers: {
// 			authorization: `bearer ${administratorUserSignInResult.data.signIn.authenticationToken}`,
// 		},
// 		variables: {
// 			input: {
// 				emailAddress: `email${faker.string.nanoid()}@email.com`,
// 				isEmailAddressVerified: false,
// 				name: "name",
// 				password: "password",
// 				role: "regular",
// 			},
// 		},
// 	});

// 	assertToBeNonNullish(createUserResult.data.createUser?.user?.id);

// 	await mercuriusClient.mutate(Mutation_deleteUser, {
// 		headers: {
// 			authorization: `bearer ${administratorUserSignInResult.data.signIn.authenticationToken}`,
// 		},
// 		variables: {
// 			input: {
// 				id: createUserResult.data.createUser.user.id,
// 			},
// 		},
// 	});

// 	assertToBeNonNullish(createUserResult.data.createUser?.authenticationToken);

// 	const usersResult = await mercuriusClient.query(Query_users, {
// 		headers: {
// 			authorization: `bearer ${createUserResult.data.createUser.authenticationToken}`,
// 		},
// 		variables: {
// 			first: 1,
// 		},
// 	});

// 	expect(usersResult.data.users).toEqual(null);
// 	expect(usersResult.errors).toEqual(
// 		expect.arrayContaining<TalawaGraphQLFormattedError>([
// 			expect.objectContaining<TalawaGraphQLFormattedError>({
// 				extensions: expect.objectContaining<UnauthenticatedExtensions>({
// 					code: "unauthenticated",
// 				}),
// 				message: expect.any(String),
// 				path: ["users"],
// 			}),
// 		]),
// 	);
// });

// test(`results in a graphql error with "unauthorized_action" extensions code in the "errors" field and "null" as the value of "data.users" field if:
// 	client triggering the graphql operation is not associated to an administrator user.`, async () => {
// 	const administratorUserSignInResult = await mercuriusClient.query(
// 		Query_signIn,
// 		{
// 			variables: {
// 				input: {
// 					emailAddress: server.envConfig.API_ADMINISTRATOR_USER_EMAIL_ADDRESS,
// 					password: server.envConfig.API_ADMINISTRATOR_USER_PASSWORD,
// 				},
// 			},
// 		},
// 	);

// 	assertToBeNonNullish(
// 		administratorUserSignInResult.data.signIn?.authenticationToken,
// 	);

// 	const createUserResult = await mercuriusClient.mutate(Mutation_createUser, {
// 		headers: {
// 			authorization: `bearer ${administratorUserSignInResult.data.signIn.authenticationToken}`,
// 		},
// 		variables: {
// 			input: {
// 				emailAddress: `email${faker.string.nanoid()}@email.com`,
// 				isEmailAddressVerified: false,
// 				name: "name",
// 				password: "password",
// 				role: "regular",
// 			},
// 		},
// 	});

// 	assertToBeNonNullish(createUserResult.data.createUser?.authenticationToken);

// 	const usersResult = await mercuriusClient.query(Query_users, {
// 		headers: {
// 			authorization: `bearer ${createUserResult.data.createUser.authenticationToken}`,
// 		},
// 		variables: {
// 			first: 1,
// 		},
// 	});

// 	expect(usersResult.data.users).toEqual(null);
// 	expect(usersResult.errors).toEqual(
// 		expect.arrayContaining<TalawaGraphQLFormattedError>([
// 			expect.objectContaining<TalawaGraphQLFormattedError>({
// 				extensions: expect.objectContaining<UnauthorizedActionExtensions>({
// 					code: "unauthorized_action",
// 				}),
// 				message: expect.any(String),
// 				path: ["users"],
// 			}),
// 		]),
// 	);
// });

// test(`results in an empty "errors" field and the expected value for the "data.users" field where nodes are ordered in the decreasing order of the field "id".`, async () => {
// 	const administratorUserSignInResult = await mercuriusClient.query(
// 		Query_signIn,
// 		{
// 			variables: {
// 				input: {
// 					emailAddress: server.envConfig.API_ADMINISTRATOR_USER_EMAIL_ADDRESS,
// 					password: server.envConfig.API_ADMINISTRATOR_USER_PASSWORD,
// 				},
// 			},
// 		},
// 	);

// 	assertToBeNonNullish(
// 		administratorUserSignInResult.data.signIn?.authenticationToken,
// 	);

// 	await Promise.all(
// 		[...Array(5)].map(() =>
// 			mercuriusClient.mutate(Mutation_createUser, {
// 				variables: {
// 					input: {
// 						emailAddress: `email${faker.string.nanoid()}@email.com`,
// 						isEmailAddressVerified: false,
// 						name: "name",
// 						password: "password",
// 						role: "regular",
// 					},
// 				},
// 			}),
// 		),
// 	);

// 	const usersResult = await mercuriusClient.query(Query_users, {
// 		headers: {
// 			authorization: `bearer ${administratorUserSignInResult.data.signIn.authenticationToken}`,
// 		},
// 		variables: {
// 			first: 2,
// 		},
// 	});

// 	expect(usersResult.errors).toBeUndefined();
// 	expect(usersResult.data.users).toEqual(
// 		expect.objectContaining<Partial<ResultOf<typeof Query_users>["users"]>>({
// 			edges: expect.arrayContaining([
// 				expect.objectContaining({
// 					cursor: expect.any(String),
// 					node: expect.objectContaining({
// 						id: expect.any(String),
// 					}),
// 				}),
// 			]),
// 			pageInfo: {
// 				endCursor: expect.any(String),
// 				hasNextPage: true,
// 				hasPreviousPage: false,
// 				startCursor: expect.any(String),
// 			},
// 		}),
// 	);

// 	assertToBeNonNullish(usersResult.data.users?.pageInfo.hasNextPage);
// 	assertToBeNonNullish(usersResult.data.users.pageInfo.endCursor);

// 	expect(
// 		usersResult.data.users.edges?.every((edge, index, array) => {
// 			if (index === 0) {
// 				return true;
// 			}

// 			const previousEdge = array[index - 1];

// 			assertToBeNonNullish(edge?.node?.id);
// 			assertToBeNonNullish(previousEdge?.node?.id);

// 			if (edge.node.id < previousEdge.node.id) {
// 				return true;
// 			}

// 			return false;
// 		}),
// 	).toEqual(true);
// });

// test(`results in an empty "errors" field and the expected value for the "data.users" field where nodes are ordered in the increasing order of the field "id".`, async () => {
// 	const administratorUserSignInResult = await mercuriusClient.query(
// 		Query_signIn,
// 		{
// 			variables: {
// 				input: {
// 					emailAddress: server.envConfig.API_ADMINISTRATOR_USER_EMAIL_ADDRESS,
// 					password: server.envConfig.API_ADMINISTRATOR_USER_PASSWORD,
// 				},
// 			},
// 		},
// 	);

// 	assertToBeNonNullish(
// 		administratorUserSignInResult.data.signIn?.authenticationToken,
// 	);

// 	await Promise.all(
// 		[...Array(5)].map(() =>
// 			mercuriusClient.mutate(Mutation_createUser, {
// 				variables: {
// 					input: {
// 						emailAddress: `email${faker.string.nanoid()}@email.com`,
// 						isEmailAddressVerified: false,
// 						name: "name",
// 						password: "password",
// 						role: "regular",
// 					},
// 				},
// 			}),
// 		),
// 	);

// 	const usersResult = await mercuriusClient.query(Query_users, {
// 		headers: {
// 			authorization: `bearer ${administratorUserSignInResult.data.signIn.authenticationToken}`,
// 		},
// 		variables: {
// 			first: 2,
// 		},
// 	});

// 	expect(usersResult.errors).toBeUndefined();
// 	expect(usersResult.data.users).toEqual(
// 		expect.objectContaining<Partial<ResultOf<typeof Query_users>["users"]>>({
// 			edges: expect.arrayContaining([
// 				expect.objectContaining({
// 					cursor: expect.any(String),
// 					node: expect.objectContaining({
// 						id: expect.any(String),
// 					}),
// 				}),
// 			]),
// 			pageInfo: {
// 				endCursor: expect.any(String),
// 				hasNextPage: true,
// 				hasPreviousPage: false,
// 				startCursor: expect.any(String),
// 			},
// 		}),
// 	);

// 	assertToBeNonNullish(usersResult.data.users?.pageInfo.hasNextPage);
// 	assertToBeNonNullish(usersResult.data.users.pageInfo.endCursor);

// 	expect(
// 		usersResult.data.users.edges?.every((edge, index, array) => {
// 			if (index === 0) {
// 				return true;
// 			}

// 			const previousEdge = array[index - 1];

// 			assertToBeNonNullish(edge?.node?.id);
// 			assertToBeNonNullish(previousEdge?.node?.id);

// 			if (edge.node.id < previousEdge.node.id) {
// 				return true;
// 			}

// 			return false;
// 		}),
// 	).toEqual(true);
// });

// test(`results in an empty "errors" field and the expected value for the "data.users" field where nodes are ordered in the increasing order of the field "id".`, async () => {
// 	const administratorUserSignInResult = await mercuriusClient.query(
// 		Query_signIn,
// 		{
// 			variables: {
// 				input: {
// 					emailAddress: server.envConfig.API_ADMINISTRATOR_USER_EMAIL_ADDRESS,
// 					password: server.envConfig.API_ADMINISTRATOR_USER_PASSWORD,
// 				},
// 			},
// 		},
// 	);

// 	assertToBeNonNullish(
// 		administratorUserSignInResult.data.signIn?.authenticationToken,
// 	);

// 	await Promise.all(
// 		[...Array(5)].map(() =>
// 			mercuriusClient.mutate(Mutation_createUser, {
// 				variables: {
// 					input: {
// 						emailAddress: `email${faker.string.nanoid()}@email.com`,
// 						isEmailAddressVerified: false,
// 						name: "name",
// 						password: "password",
// 						role: "regular",
// 					},
// 				},
// 			}),
// 		),
// 	);

// 	const usersResult = await mercuriusClient.query(Query_users, {
// 		headers: {
// 			authorization: `bearer ${administratorUserSignInResult.data.signIn.authenticationToken}`,
// 		},
// 		variables: {
// 			first: 2,
// 		},
// 	});

// 	expect(usersResult.errors).toBeUndefined();
// 	expect(usersResult.data.users).toEqual(
// 		expect.objectContaining<Partial<ResultOf<typeof Query_users>["users"]>>({
// 			edges: expect.arrayContaining([
// 				expect.objectContaining({
// 					cursor: expect.any(String),
// 					node: expect.objectContaining({
// 						id: expect.any(String),
// 					}),
// 				}),
// 			]),
// 			pageInfo: {
// 				endCursor: expect.any(String),
// 				hasNextPage: true,
// 				hasPreviousPage: false,
// 				startCursor: expect.any(String),
// 			},
// 		}),
// 	);

// 	assertToBeNonNullish(usersResult.data.users?.pageInfo.hasNextPage);
// 	assertToBeNonNullish(usersResult.data.users.pageInfo.endCursor);

// 	expect(
// 		usersResult.data.users.edges?.every((edge, index, array) => {
// 			if (index === 0) {
// 				return true;
// 			}

// 			const previousEdge = array[index - 1];

// 			assertToBeNonNullish(edge?.node?.id);
// 			assertToBeNonNullish(previousEdge?.node?.id);

// 			if (edge.node.id < previousEdge.node.id) {
// 				return true;
// 			}

// 			return false;
// 		}),
// 	).toEqual(true);
// });

// test(`results in an empty "errors" field and the expected value for the "data.users" field where nodes are ordered in the increasing order of the field "id".`, async () => {
// 	const administratorUserSignInResult = await mercuriusClient.query(
// 		Query_signIn,
// 		{
// 			variables: {
// 				input: {
// 					emailAddress: server.envConfig.API_ADMINISTRATOR_USER_EMAIL_ADDRESS,
// 					password: server.envConfig.API_ADMINISTRATOR_USER_PASSWORD,
// 				},
// 			},
// 		},
// 	);

// 	assertToBeNonNullish(
// 		administratorUserSignInResult.data.signIn?.authenticationToken,
// 	);

// 	await Promise.all(
// 		[...Array(5)].map(() =>
// 			mercuriusClient.mutate(Mutation_createUser, {
// 				variables: {
// 					input: {
// 						emailAddress: `email${faker.string.nanoid()}@email.com`,
// 						isEmailAddressVerified: false,
// 						name: "name",
// 						password: "password",
// 						role: "regular",
// 					},
// 				},
// 			}),
// 		),
// 	);

// 	const usersResult0 = await mercuriusClient.query(Query_users, {
// 		headers: {
// 			authorization: `bearer ${administratorUserSignInResult.data.signIn.authenticationToken}`,
// 		},
// 		variables: {
// 			last: 1,
// 		},
// 	});

// 	expect(usersResult0.data.users?.pageInfo.hasPreviousPage).toEqual(true);
// 	assertToBeNonNullish(usersResult0.data.users?.pageInfo.startCursor);

// 	const usersResult1 = await mercuriusClient.query(Query_users, {
// 		headers: {
// 			authorization: `bearer ${administratorUserSignInResult.data.signIn.authenticationToken}`,
// 		},
// 		variables: {
// 			before: usersResult0.data.users.pageInfo.startCursor,
// 			last: 1,
// 		},
// 	});

// 	expect(usersResult1.errors).toBeUndefined();
// 	expect(usersResult1.data.users).toEqual(
// 		expect.objectContaining<Partial<ResultOf<typeof Query_users>["users"]>>({
// 			edges: expect.arrayContaining([
// 				expect.objectContaining({
// 					cursor: expect.any(String),
// 					node: expect.objectContaining({
// 						id: expect.any(String),
// 					}),
// 				}),
// 			]),
// 			pageInfo: {
// 				endCursor: expect.any(String),
// 				hasNextPage: true,
// 				hasPreviousPage: true,
// 				startCursor: expect.any(String),
// 			},
// 		}),
// 	);

// 	expect(
// 		usersResult1.data.users?.edges?.every((edge, index, array) => {
// 			if (index === 0) {
// 				return true;
// 			}

// 			const previousEdge = array[index - 1];

// 			assertToBeNonNullish(edge?.node?.id);
// 			assertToBeNonNullish(previousEdge?.node?.id);

// 			if (edge.node.id < previousEdge.node.id) {
// 				return true;
// 			}

// 			return false;
// 		}),
// 	).toEqual(true);

// 	assertToBeNonNullish(usersResult1.data.users?.pageInfo.startCursor);

// 	const usersResult0StartEdge = usersResult0.data.users.edges?.find(
// 		(edge) => edge?.cursor === usersResult0.data.users?.pageInfo.startCursor,
// 	);
// 	const usersResult1EndEdge = usersResult1.data.users.edges?.find(
// 		(edge) => edge?.cursor === usersResult1.data.users?.pageInfo.endCursor,
// 	);

// 	assertToBeNonNullish(usersResult0StartEdge?.node?.id);
// 	assertToBeNonNullish(usersResult1EndEdge?.node?.id);

// 	// When the connection is traversing in inversed direction(beacuse of arguments "last" and "before"), the nodes
// 	expect(usersResult0StartEdge.node.id < usersResult1EndEdge.node.id);
// });

// test(`results in a graphql error with "arguments_associated_resources_not_found" extensions code in the "errors" field and "null" as the value of "data.users" field if:
// 	Value of argument "before" does not correspond to an existing user.`, async () => {
// 	const administratorUserSignInResult = await mercuriusClient.query(
// 		Query_signIn,
// 		{
// 			variables: {
// 				input: {
// 					emailAddress: server.envConfig.API_ADMINISTRATOR_USER_EMAIL_ADDRESS,
// 					password: server.envConfig.API_ADMINISTRATOR_USER_PASSWORD,
// 				},
// 			},
// 		},
// 	);

// 	assertToBeNonNullish(
// 		administratorUserSignInResult.data.signIn?.authenticationToken,
// 	);

// 	await Promise.all(
// 		[...Array(5)].map(() =>
// 			mercuriusClient.mutate(Mutation_createUser, {
// 				variables: {
// 					input: {
// 						emailAddress: `email${faker.string.nanoid()}@email.com`,
// 						isEmailAddressVerified: false,
// 						name: "name",
// 						password: "password",
// 						role: "regular",
// 					},
// 				},
// 			}),
// 		),
// 	);

// 	const usersResult0 = await mercuriusClient.query(Query_users, {
// 		headers: {
// 			authorization: `bearer ${administratorUserSignInResult.data.signIn.authenticationToken}`,
// 		},
// 		variables: {
// 			last: 2,
// 		},
// 	});

// 	assertToBeNonNullish(usersResult0.data.users?.edges);
// 	assertToBeNonNullish(usersResult0.data.users.edges[0]?.node?.id);

// 	// THIS WOULD END UP DELETING DATA CREATED IN OTHER TESTS MAKING THE TESTS FLAKY

// 	// await mercuriusClient.mutate(Mutation_deleteUser, {
// 	// 	headers: {
// 	// 		authorization: `bearer ${administratorUserSignInResult.data.signIn.authenticationToken}`,
// 	// 	},
// 	// 	variables: {
// 	// 		input: {
// 	// 			id: usersResult0.data.users.edges[0].node.id,
// 	// 		},
// 	// 	},
// 	// });

// 	const usersResult1 = await mercuriusClient.query(Query_users, {
// 		headers: {
// 			authorization: `bearer ${administratorUserSignInResult.data.signIn.authenticationToken}`,
// 		},
// 		variables: {
// 			before: usersResult0.data.users.pageInfo.startCursor,
// 			last: 1,
// 		},
// 	});

// 	expect(usersResult1.errors).toBeUndefined();
// 	expect(usersResult1.data.users).toEqual(
// 		expect.objectContaining<Partial<ResultOf<typeof Query_users>["users"]>>({
// 			edges: expect.arrayContaining([
// 				expect.objectContaining({
// 					cursor: expect.any(String),
// 					node: expect.objectContaining({
// 						id: expect.any(String),
// 					}),
// 				}),
// 			]),
// 			pageInfo: {
// 				endCursor: expect.any(String),
// 				hasNextPage: true,
// 				hasPreviousPage: true,
// 				startCursor: expect.any(String),
// 			},
// 		}),
// 	);

// 	expect(
// 		usersResult1.data.users?.edges?.every((edge, index, array) => {
// 			if (index === 0) {
// 				return true;
// 			}

// 			const previousEdge = array[index - 1];

// 			assertToBeNonNullish(edge?.node?.id);
// 			assertToBeNonNullish(previousEdge?.node?.id);

// 			if (edge.node.id < previousEdge.node.id) {
// 				return true;
// 			}

// 			return false;
// 		}),
// 	).toEqual(true);

// 	assertToBeNonNullish(usersResult1.data.users?.pageInfo.startCursor);

// 	const usersResult0StartEdge = usersResult0.data.users.edges?.find(
// 		(edge) => edge?.cursor === usersResult0.data.users?.pageInfo.startCursor,
// 	);
// 	const usersResult1EndEdge = usersResult1.data.users.edges?.find(
// 		(edge) => edge?.cursor === usersResult1.data.users?.pageInfo.endCursor,
// 	);

// 	assertToBeNonNullish(usersResult0StartEdge?.node?.id);
// 	assertToBeNonNullish(usersResult1EndEdge?.node?.id);

// 	// When the connection is traversing in inversed direction(beacuse of arguments "last" and "before"), the nodes
// 	expect(usersResult0StartEdge.node.id < usersResult1EndEdge.node.id);
// });
// });
