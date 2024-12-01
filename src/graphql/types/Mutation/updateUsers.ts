import { hash } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { z } from "zod";
import {
	usersTable,
	type usersTableInsertSchema,
} from "~/src/drizzle/tables/users";
import { builder } from "~/src/graphql/builder";
import {
	MutationUpdateUserInput,
	mutationUpdateUserInputSchema,
} from "~/src/graphql/inputs/MutationUpdateUserInput";
import { User } from "~/src/graphql/types/User/User";
import {
	type ArgumentsAssociatedResourcesNotFoundExtensions,
	type ForbiddenActionOnArgumentsAssociatedResourcesExtensions,
	TalawaGraphQLError,
} from "~/src/utilities/talawaGraphQLError";

const mutationUpdateUsersArgumentsSchema = z
	.object({
		input: mutationUpdateUserInputSchema.array().min(1).max(32),
	})
	.superRefine((arg, ctx) => {
		const uniqueIds = new Set<
			z.infer<typeof mutationUpdateUserInputSchema>["id"]
		>();
		const uniqueEmailAddresses = new Set<
			z.infer<typeof mutationUpdateUserInputSchema>["emailAddress"]
		>();

		for (const [index, input] of arg.input.entries()) {
			if (uniqueIds.has(input.id)) {
				ctx.addIssue({
					code: "custom",
					message: "Duplicate value of a previous input's id argument.",
					path: ["input", index, "id"],
				});
			}
			if (
				input.emailAddress !== undefined &&
				uniqueEmailAddresses.has(input.emailAddress)
			) {
				ctx.addIssue({
					code: "custom",
					message:
						"Duplicate value of a previous input's emailAddress argument.",
					path: ["input", index, "emailAddress"],
				});
			}
			uniqueIds.add(input.id);
			uniqueEmailAddresses.add(input.emailAddress);
		}
	});

builder.mutationField("updateUsers", (t) =>
	t.field({
		args: {
			input: t.arg({
				description: "",
				required: true,
				type: t.arg.listRef(MutationUpdateUserInput, {
					required: true,
				}),
			}),
		},
		description: "Mutation field to update users.",
		resolve: async (_parent, args, ctx) => {
			if (!ctx.currentClient.isAuthenticated) {
				throw new TalawaGraphQLError({
					extensions: {
						code: "unauthenticated",
					},
					message: "Only authenticated users can perform this action.",
				});
			}

			const {
				success,
				data: parsedArgs,
				error,
			} = mutationUpdateUsersArgumentsSchema.safeParse(args);

			if (!success) {
				throw new TalawaGraphQLError({
					extensions: {
						code: "invalid_arguments",
						issues: error.issues.map((issue) => ({
							argumentPath: issue.path,
							message: issue.message,
						})),
					},
					message: "Invalid arguments provided.",
				});
			}

			const currentUserId = ctx.currentClient.user.id;

			const currentUser = await ctx.drizzleClient.query.usersTable.findFirst({
				columns: {
					role: true,
				},
				where: (fields, operators) => operators.eq(fields.id, currentUserId),
			});

			if (currentUser === undefined) {
				throw new TalawaGraphQLError({
					extensions: {
						code: "unauthenticated",
					},
					message: "Only authenticated users can perform this action.",
				});
			}

			if (currentUser.role !== "administrator") {
				throw new TalawaGraphQLError({
					extensions: {
						code: "unauthorized_action",
					},
					message: "You are not authorized to perform this action.",
				});
			}

			let inputIndexWithCurrentClientUserId: number | undefined = undefined;
			const emailAddresses: NonNullable<
				(typeof parsedArgs)["input"][number]["emailAddress"]
			>[] = [];
			const emailAddressesInputIndexes: number[] = [];
			const ids: (typeof parsedArgs)["input"][number]["id"][] = [];
			const inputPromises: Promise<
				Omit<(typeof parsedArgs)["input"][number], "password"> & {
					passwordHash?:
						| z.infer<typeof usersTableInsertSchema.shape.passwordHash>
						| undefined;
				}
			>[] = [];

			for (const [
				index,
				{ password, ...remainingInput },
			] of parsedArgs.input.entries()) {
				ids.push(remainingInput.id);

				if (remainingInput.id === ctx.currentClient.user.id) {
					inputIndexWithCurrentClientUserId = index;
				}

				inputPromises.push(
					// Immediately invoked anonymous async function for creating a promise.
					(async () => {
						return {
							...remainingInput,
							passwordHash:
								password !== undefined ? await hash(password) : undefined,
						};
					})(),
				);

				if (remainingInput.emailAddress !== undefined) {
					emailAddresses.push(remainingInput.emailAddress);
					emailAddressesInputIndexes.push(index);
				}
			}

			if (inputIndexWithCurrentClientUserId !== undefined) {
				throw new TalawaGraphQLError({
					extensions: {
						code: "forbidden_action_on_arguments_associated_resources",
						issues: [
							{
								argumentPath: [
									"input",
									inputIndexWithCurrentClientUserId,
									"id",
								],
								message:
									"You cannot update the user record associated to you with this action.",
							},
						],
					},
					message:
						"This action is forbidden on the resources associated to the provided arguments.",
				});
			}

			const existingUsersWithIds = (
				await ctx.drizzleClient.query.usersTable.findMany({
					where: (fields, operators) => operators.inArray(fields.id, ids),
				})
			).sort(
				// Sort the user records in the order of corresponding inputs provided by the client.
				(user0, user1) => ids.indexOf(user0.id) - ids.indexOf(user1.id),
			);

			if (existingUsersWithIds.length !== ids.length) {
				throw new TalawaGraphQLError({
					extensions: {
						code: "arguments_associated_resources_not_found",
						issues: ids.reduce<
							ArgumentsAssociatedResourcesNotFoundExtensions["issues"]
						>((accumulator, id, index) => {
							if (existingUsersWithIds.some((user) => user.id !== id)) {
								accumulator.push({
									argumentPath: ["input", index, "id"],
								});
							}
							return accumulator;
						}, []),
					},
					message: "No associated resources found for the provided arguments.",
				});
			}

			/**
			 * Array of existing user records with `emailAddress` field that is equal to the corresponding `emailAddress` field in the inputs in the `parsedArgs.input` array.
			 */
			const existingUsersWithEmailAddresses = (
				await ctx.drizzleClient.query.usersTable.findMany({
					where: (fields, operators) =>
						operators.inArray(fields.emailAddress, emailAddresses),
				})
			).sort(
				(user0, user1) =>
					emailAddresses.indexOf(user0.emailAddress) -
					emailAddresses.indexOf(user1.emailAddress),
			);

			// Length of the `existingUsersWithEmailAddresses` array not being equal to 0 means that the update operation would result in a postgres unique constraint violation.
			if (existingUsersWithEmailAddresses.length !== 0) {
				throw new TalawaGraphQLError({
					extensions: {
						code: "forbidden_action_on_arguments_associated_resources",
						issues: emailAddresses.reduce<
							ForbiddenActionOnArgumentsAssociatedResourcesExtensions["issues"]
						>((accumulator, emailAddress, index) => {
							if (
								existingUsersWithEmailAddresses.some(
									(user) => user.emailAddress === emailAddress,
								)
							) {
								accumulator.push({
									argumentPath: ["input", index, "emailAddress"],
									message: "This email address is already registered.",
								});
							}
							return accumulator;
						}, []),
					},
					message:
						"This action is forbidden on the resources associated to the provided arguments.",
				});
			}

			const currentClientUserId = ctx.currentClient.user.id;

			return await ctx.drizzleClient.transaction(async (tx) => {
				const updatedUsers = await Promise.all(
					inputPromises.map((inputPromise) => {
						// Immediately invoked anonymous async function for creating a promise.
						const updatedUserPromise = (async () => {
							const input = await inputPromise;

							const [updatedUser] = await tx
								.update(usersTable)
								.set({
									...input,
									updaterId: currentClientUserId,
								})
								.where(eq(usersTable.id, input.id))
								.returning();

							// If the updated user record is not returned, it means that either it was deleted or itrs `id` column was changed by external entities before this update operation could take place. To keep the update operation consistent with the input we throw the error to rollback the postgres transaction.
							if (updatedUser === undefined) {
								throw new TalawaGraphQLError({
									extensions: {
										code: "unexpected",
									},
									message: "Something went wrong. Please try again.",
								});
							}

							return updatedUser;
						})();

						return updatedUserPromise;
					}),
				);

				return updatedUsers;
			});
		},
		type: t.listRef(User),
	}),
);

// builder.mutationField("updateUsers", (t) =>
// 	t.field({
// 		args: {
// 			input: t.arg({
// 				description: "",
// 				required: true,
// 				type: t.arg.listRef(MutationUpdateUserInput, {
// 					required: true,
// 				}),
// 			}),
// 		},
// 		description: "Mutation field to update users.",
// 		resolve: async (_parent, args, ctx) => {
// 			if (!ctx.currentClient.isAuthenticated) {
// 				throw ctx.currentClient.error;
// 			}

// 			if (ctx.currentClient.user.role !== "administrator") {
// 				throw new TalawaGraphQLError({
// 					extensions: {
// 						code: "unauthorized_action",
// 					},
// 					message: "You are not authorized to perform this action.",
// 				});
// 			}

// 			const {
// 				success,
// 				data: parsedArgs,
// 				error,
// 			} = mutationUpdateUsersArgumentsSchema.safeParse(args);

// 			if (!success) {
// 				throw new TalawaGraphQLError({
// 					extensions: {
// 						code: "invalid_arguments",
// 						issues: error.issues.map((issue) => ({
// 							argumentPath: issue.path,
// 							message: issue.message,
// 						})),
// 					},
// 					message: "Invalid arguments provided.",
// 				});
// 			}

// 			const emailAddresses: NonNullable<
// 				(typeof parsedArgs)["input"][number]["emailAddress"]
// 			>[] = [];
// 			const emailAddressesInputIndexes: number[] = [];
// 			const ids: (typeof parsedArgs)["input"][number]["id"][] = [];
// 			const inputPromises: Promise<
// 				{
// 					[K in keyof Omit<
// 						(typeof parsedArgs)["input"][number],
// 						"id" | "password"
// 					>]: SQL;
// 				} & {
// 					passwordHash?: SQL;
// 				}
// 			>[] = [];

// 			for (const [
// 				index,
// 				{ id, password, ...remainingInput },
// 			] of parsedArgs.input.entries()) {
// 				ids.push(id);

// 				inputPromises.push(
// 					// Immediately invoked anonymous async function for creating a promise.
// 					(async () => {
// 						let passwordHash: SQL | undefined = undefined;

// 						if (password !== undefined) {
// 							passwordHash = sql`when ${usersTable.id} = ${id} then ${await hash(password)}`;
// 						}

// 						const input = Object.entries(remainingInput).reduce<{
// 							[K in keyof Omit<
// 								(typeof parsedArgs)["input"][number],
// 								"id" | "password"
// 							>]: SQL;
// 						}>((accumulator, [key, value]) => {
// 							if (value !== undefined) {
// 								if (key === "birthDate") {
// 									// By default postgres infers the data type of a column in a `case` statement to be `text`. Therefore, columns of other data types need to be explicitly casted into their specific data type.
// 									accumulator[key as keyof typeof input] =
// 										sql`when ${usersTable.id} = ${id} then ${value}::date`;
// 								} else {
// 									accumulator[key as keyof typeof input] =
// 										sql`when ${usersTable.id} = ${id} then ${value}`;
// 								}
// 							}

// 							return accumulator;
// 						}, {});

// 						return {
// 							...input,
// 							passwordHash,
// 						};
// 					})(),
// 				);

// 				if (remainingInput.emailAddress !== undefined) {
// 					emailAddresses.push(remainingInput.emailAddress);
// 					emailAddressesInputIndexes.push(index);
// 				}
// 			}

// 			const existingUsersWithIds = (
// 				await ctx.drizzleClient.query.usersTable.findMany({
// 					where: (fields, operators) => operators.inArray(fields.id, ids),
// 				})
// 			).sort(
// 				// Sort the user records in the order of corresponding inputs provided by the client.
// 				(user0, user1) => ids.indexOf(user0.id) - ids.indexOf(user1.id),
// 			);

// 			if (existingUsersWithIds.length !== ids.length) {
// 				throw new TalawaGraphQLError({
// 					extensions: {
// 						code: "arguments_associated_resources_not_found",
// 						issues: ids.reduce<ArgumentsAssociatedResourcesNotFoundExtensions["issues"]>(
// 							(accumulator, id, index) => {
// 								if (existingUsersWithIds.some((user) => user.id !== id)) {
// 									accumulator.push({
// 										argumentPath: ["input", index, "id"],
// 									});
// 								}
// 								return accumulator;
// 							},
// 							[],
// 						),
// 					},
// 					message: "No associated resources found for the provided arguments.",
// 				});
// 			}

// 			/**
// 			 * Array of existing user records with `emailAddress` field that is equal to the corresponding `emailAddress` field in the inputs in the `parsedArgs.input` array.
// 			 */
// 			const existingUsersWithEmailAddresses = (
// 				await ctx.drizzleClient.query.usersTable.findMany({
// 					where: (fields, operators) =>
// 						operators.inArray(fields.emailAddress, emailAddresses),
// 				})
// 			).sort(
// 				(user0, user1) =>
// 					emailAddresses.indexOf(user0.emailAddress) -
// 					emailAddresses.indexOf(user1.emailAddress),
// 			);

// 			// Length of the `existingUsersWithEmailAddresses` array not being equal to 0 means that the create operation would result in a postgres unique constraint violation.
// 			if (existingUsersWithEmailAddresses.length !== 0) {
// 				throw new TalawaGraphQLError({
// 					extensions: {
// 						code: "forbidden_action_on_arguments_associated_resources",
// 						issues: emailAddresses.reduce<
// 							ForbiddenActionOnArgumentsAssociatedResourcesExtensions["issues"]
// 						>((accumulator, emailAddress, index) => {
// 							if (
// 								existingUsersWithEmailAddresses.some(
// 									(user) => user.emailAddress === emailAddress,
// 								)
// 							) {
// 								accumulator.push({
// 									argumentPath: ["input", index, "emailAddress"],
// 									message:
// 										"This email address is already registered under a talawa user.",
// 								});
// 							}
// 							return accumulator;
// 						}, []),
// 					},
// 					message:
// 						"This action is forbidden on the resources associated to the provided arguments.",
// 				});
// 			}

// 			const input = (await Promise.all(inputPromises)).reduce<
// 				{
// 					[K in keyof Omit<
// 						(typeof parsedArgs)["input"][number],
// 						"id" | "password"
// 					>]: SQL;
// 				} & {
// 					passwordHash?: SQL | undefined;
// 				}
// 			>((accumulator, input, index) => {
// 				for (const [key, value] of Object.entries(input)) {
// 					//		if accumulator value is defined
// 					//			if value is defined
// 					//				append sql`${value} `.append(sql`end)`) to the accumulator value
// 					//			if value is not defined
// 					//				append sql`end)` to the accumulator value
// 					//		if accumulator value is not defined
// 					//			if value is defined
// 					//				set sql`(case `.append(sql`${value} `.append(sql`end)`)) as the accumulator value
// 					//			if value is not defined
// 					//				ignore
// 					//	if it not last iteration of loop
// 					//		if accumulator value is defined
// 					//			if value is defined
// 					//				append sql`${value} ` to the accumulator value
// 					//			if value is not defined
// 					//				ignore
// 					//		if accumulator value is not defined
// 					//			if value is defined
// 					//				set sql`(case `.append(sql`${value} `) as the accumulator value
// 					//			if value is not defined
// 					//				ignore

// 					if (index === inputPromises.length - 1) {
// 						if (accumulator[key as keyof typeof input] !== undefined) {
// 							if (value !== undefined) {
// 								accumulator[key as keyof typeof input]
// 									?.append(value)
// 									.append(sql` `)
// 									.append(sql`end)`);
// 							} else {
// 								accumulator[key as keyof typeof input]?.append(sql`end)`);
// 							}
// 						} else {
// 							if (value !== undefined) {
// 								accumulator[key as keyof typeof input] = sql`(case `
// 									.append(value)
// 									.append(sql` `)
// 									.append(sql`end)`);
// 							}
// 						}
// 					} else {
// 						if (accumulator[key as keyof typeof input] !== undefined) {
// 							if (value !== undefined) {
// 								accumulator[key as keyof typeof input]
// 									?.append(value)
// 									.append(sql` `);
// 							}
// 						} else {
// 							if (value !== undefined) {
// 								accumulator[key as keyof typeof input] = sql`(case `
// 									.append(value)
// 									.append(sql` `);
// 							}
// 						}
// 					}
// 				}

// 				return accumulator;
// 			}, {});

// 			return await ctx.drizzleClient.transaction(async (tx) => {
// 				const updatedUsers = (
// 					await tx
// 						.update(usersTable)
// 						.set(input)
// 						.where(inArray(usersTable.id, ids))
// 						.returning()
// 				).sort((user0, user1) => ids.indexOf(user0.id) - ids.indexOf(user1.id));

// 				// If the number of updated user records is not equal to the number of records that were meant to be updated, it means that some of those records were either deleted or their `id` column was changed by external entities before this update operation could take place. To keep the update operation consistent with the input we throw the error to rollback the postgres transaction.
// 				if (updatedUsers.length !== ids.length) {
// 					throw new TalawaGraphQLError({
// 						extensions: {
// 							code: "unexpected",
// 						},
// 						message: "Something went wrong. Please try again.",
// 					});
// 				}

// 				return updatedUsers;
// 			});
// 		},
// 		type: t.listRef(User),
// 	}),
// );
