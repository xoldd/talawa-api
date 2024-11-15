import { ConnectionEdgesShape } from "@pothos/plugin-relay";
import { builder } from "~/src/graphql/builder";
import { OrganizationMembershipRole } from "~/src/graphql/enums/OrganizationMembershipRole";
import { User } from "./User/User";

export const UserOrganizationsMemberOfConnectionEdge = builder
	.objectRef<{
		cursor: string;
		node: typeof User.$inferType;
		role: typeof OrganizationMembershipRole.$inferType;
	}>("UserOrganizationsMemberOfConnectionEdge")
	.implement({
		description: "",
		fields: (t) => ({
			cursor: t.exposeString("cursor", {
				description: "",
			}),
			node: t.expose("node", {
				description: "",
				type: User,
			}),
			role: t.expose("role", {
				description: "",
				type: OrganizationMembershipRole,
			}),
		}),
	});
