import { type SQL, and, asc, desc, eq, exists, gt, lt } from "drizzle-orm";
import { z } from "zod";
import { usersTable } from "~/src/drizzle/tables/users";
import { builder } from "~/src/graphql/builder";
import { User } from "~/src/graphql/types/User/User";
import {
	defaultGraphQLConnectionArgumentsSchema,
	transformDefaultGraphQLConnectionArguments,
	transformToDefaultGraphQLConnection,
} from "~/src/utilities/defaultGraphQLConnection";
import { TalawaGraphQLError } from "~/src/utilities/talawaGraphQLError";

const queryUsersArgumentsSchema = defaultGraphQLConnectionArgumentsSchema
	.transform(transformDefaultGraphQLConnectionArguments)
	.superRefine((arg, ctx) => {
		if (
			arg.cursor !== undefined &&
			!z.string().uuid().safeParse(arg.cursor).success
		) {
			ctx.addIssue({
				code: "custom",
				message: "Not a valid cursor.",
				path: [arg.isInversed ? "before" : "after"],
			});
		}
	});

builder.queryField("users", (t) =>
	t.connection(
		{
			description:
				"Query field to read users by traversing through them using a graphql connection.",
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
					data: parsedArgs,
					error,
					success,
				} = queryUsersArgumentsSchema.safeParse(args);

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

				const { cursor, isInversed, limit } = parsedArgs;

				const orderBy = isInversed ? asc(usersTable.id) : desc(usersTable.id);

				let where: SQL | undefined;
				if (isInversed) {
					if (cursor !== undefined) {
						where = and(
							exists(
								ctx.drizzleClient
									.select()
									.from(usersTable)
									.where(eq(usersTable.id, cursor)),
							),
							gt(usersTable.id, cursor),
						);
					}
				} else {
					if (cursor !== undefined) {
						where = and(
							exists(
								ctx.drizzleClient
									.select()
									.from(usersTable)
									.where(eq(usersTable.id, cursor)),
							),
							lt(usersTable.id, cursor),
						);
					}
				}

				const users = await ctx.drizzleClient.query.usersTable.findMany({
					limit,
					orderBy,
					where,
				});

				if (cursor !== undefined && users.length === 0) {
					throw new TalawaGraphQLError({
						extensions: {
							code: "arguments_associated_resources_not_found",
							issues: [
								{
									argumentPath: [isInversed ? "before" : "after"],
								},
							],
						},
						message:
							"No associated resources found for the provided arguments.",
					});
				}

				return transformToDefaultGraphQLConnection({
					createCursor: (user) => user.id,
					createNode: (user) => user,
					parsedArgs,
					rawNodes: users,
				});
			},

			type: User,
		},
		{
			description: "",
		},
		{
			description: "",
		},
	),
);
