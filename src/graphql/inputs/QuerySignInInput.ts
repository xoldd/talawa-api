import { z } from "zod";
import { usersTableSelectSchema } from "~/src/drizzle/tables/users";
import { builder } from "~/src/graphql/builder";

export const querySignInInputSchema = usersTableSelectSchema
	.pick({
		emailAddress: true,
	})
	.extend({
		password: z.string().min(1).max(64),
	});

export const QuerySignInInput = builder
	.inputRef<z.infer<typeof querySignInInputSchema>>("QuerySignInInput")
	.implement({
		description: "",
		fields: (t) => ({
			emailAddress: t.field({
				description: "Email address of the user.",
				required: true,
				type: "EmailAddress",
			}),
			password: t.string({
				description: "Password of the user to sign in to the application.",
				required: true,
			}),
		}),
	});
