import { inArray } from "drizzle-orm";
import { z } from "zod";
import { usersTable } from "~/src/drizzle/tables/users";
import { builder } from "~/src/graphql/builder";
import {
	MutationDeleteUserInput,
	mutationDeleteUserInputSchema,
} from "~/src/graphql/inputs/MutationDeleteUserInput";
import { User } from "~/src/graphql/types/User/User";
import {
	type ArgumentsAssociatedResourcesNotFoundExtensions,
	TalawaGraphQLError,
} from "~/src/utilities/talawaGraphQLError";

const mutationDeleteUsersArgumentsSchema = z
	.object({
		input: mutationDeleteUserInputSchema.array().min(1).max(32),
	})
	.superRefine((arg, ctx) => {
		const uniqueIds = new Set();

		for (const [index, input] of arg.input.entries()) {
			if (uniqueIds.has(input.id)) {
				ctx.addIssue({
					code: "custom",
					message: "Duplicate value of a previous input's id argument.",
					path: ["input", index, "id"],
				});
			}
			uniqueIds.add(input.id);
		}
	});

builder.mutationField("deleteUsers", (t) =>
	t.field({
		args: {
			input: t.arg({
				description: "",
				required: true,
				type: t.arg.listRef(MutationDeleteUserInput, {
					required: true,
				}),
			}),
		},
		description: "Mutation field to delete users.",
		resolve: async (_parent, args, ctx) => {
			if (!ctx.currentClient.isAuthenticated) {
				throw new TalawaGraphQLError({
					extensions: {
						code: "unauthenticated",
					},
					message: "Only authenticated users can perform this action.",
				});
			}

			if (ctx.currentClient.user.role !== "administrator") {
				throw new TalawaGraphQLError({
					extensions: {
						code: "unauthorized_action",
					},
					message: "You are not authorized to perform this action.",
				});
			}
			const {
				data: parsedArgs,
				error,
				success,
			} = mutationDeleteUsersArgumentsSchema.safeParse(args);

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

			const currentClientUserId = ctx.currentClient.user.id;
			let inputIndexWithCurrentClientUserId: number | undefined = undefined;
			const ids = parsedArgs.input.map((input, index) => {
				if (input.id === currentClientUserId) {
					inputIndexWithCurrentClientUserId = index;
				}

				return input.id;
			});

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
									"You cannot delete the user associated to you with this action.",
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
				// Sort the users in the order of corresponding inputs provided by the client.
				(user0, user1) => ids.indexOf(user0.id) - ids.indexOf(user1.id),
			);

			// Length of the `existingUsersWithIds` array not being equal to the length of the `ids` array means that the delete operation would result in a partial deletion inconsistent with the provided input.
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

			return await ctx.drizzleClient.transaction(async (tx) => {
				const deletedUsers = (
					await tx
						.delete(usersTable)
						.where(inArray(usersTable.id, ids))
						.returning()
				).sort(
					// Sort the users in the order of corresponding inputs provided by the client.
					(user0, user1) => ids.indexOf(user0.id) - ids.indexOf(user1.id),
				);

				// If the number of deleted users is not equal to the number of users that were meant to be deleted, it means that some of those users were either deleted or their `id` column was changed by external entities before this delete operation could take place. To keep the delete operation consistent with the input we throw the error to rollback the postgres transaction.
				if (deletedUsers.length !== ids.length) {
					throw new TalawaGraphQLError({
						extensions: {
							code: "unexpected",
						},
						message: "Something went wrong. Please try again.",
					});
				}

				return deletedUsers;
			});
		},
		type: t.listRef(User),
	}),
);
