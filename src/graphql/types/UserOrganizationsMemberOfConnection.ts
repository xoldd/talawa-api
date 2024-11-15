import {resolveArrayConnection,resolveOffsetConnection} from "@pothos/plugin-relay"
import type { usersTable } from "~/src/drizzle/tables/users";
import { builder } from "~/src/graphql/builder";
import { OrganizationMembershipRole } from "../enums/OrganizationMembershipRole";
import { User } from "./User/User";
import { UserOrganizationsMemberOfConnectionEdge } from "./UserOrganizationsMemberOfConnectionEdge";

export type UserOrganizationsMemberOfConnection = {
	edges: [];
};

// export const UserOrganizationsMemberOfConnection = builder
// 	.objectRef<UserOrganizationsMemberOfConnection>(
// 		"UserOrganizationsMemberOfConnection",
// 	)
// 	.implement({
// 		description: "",
// 		fields: (t) => ({
// 			edges: t.listRef(UserOrganizationsMemberOfConnectionEdge),
// 		}),
// 	});

builder.queryField("something",(t)=>t.connection({resolve:resolveOffsetConnection({},()))}))