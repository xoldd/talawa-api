import type { usersTable } from "~/src/drizzle/tables/users";
import { builder } from "~/src/graphql/builder";
import { User } from "./User/User";

export type AuthenticationPayload = {
	authenticationToken: string;
	user: typeof usersTable.$inferSelect;
};

export const AuthenticationPayload = builder
	.objectRef<AuthenticationPayload>("AuthenticationPayload")
	.implement({
		description: "",
		fields: (t) => ({
			authenticationToken: t.exposeString("authenticationToken", {
				description:
					"This is the authentication token using which a user can sign in to the talawa application.",
			}),
			user: t.expose("user", {
				description: "This is the user record of the authenticated client.",
				type: User,
			}),
		}),
	});
