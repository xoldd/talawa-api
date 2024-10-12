import type { InferInsertModel } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { usersTable } from "~/src/drizzle/schema.js";
import { builder } from "~/src/graphql/builder.js";
import { UserEducationGrade } from "~/src/graphql/enums/UserEducationGrade.js";
import { UserEmploymentStatus } from "~/src/graphql/enums/UserEmploymentStatus.js";
import { UserMaritalStatus } from "~/src/graphql/enums/UserMaritalStatus.js";
import { UserNatalSex } from "~/src/graphql/enums/UserNatalSex.js";

const createUserInputSchema = createInsertSchema(usersTable, {});

export const CreateUserInput = builder
	.inputRef<InferInsertModel<typeof usersTable>>("CreateUserInput")
	.implement({
		description: "",
		fields: (t) => ({
			addressLine1: t.string({}),
			addressLine2: t.string({}),
			avatarURI: t.string({}),
			birthDate: t.field({
				type: "Date",
			}),
			city: t.string({}),
			email: t.string({
				required: true,
			}),
			countryCode: t.field({
				type: "CountryCode",
				validate: {
					type: "string",
				},
			}),
			description: t.string({}),
			educationGrade: t.field({
				type: UserEducationGrade,
			}),
			employmentStatus: t.field({
				type: UserEmploymentStatus,
			}),
			firstName: t.string({}),
			homePhoneNumber: t.string({}),
			isAdminstrator: t.boolean({}),
			isEmailVerified: t.boolean({}),
			lastName: t.string({}),
			maritalStatus: t.field({
				type: UserMaritalStatus,
			}),
			mobilePhoneNumber: t.string({}),
			name: t.string({}),
			natalSex: t.field({
				type: UserNatalSex,
			}),
			postalCode: t.string({}),
			state: t.string({}),
			workPhoneNumber: t.string({}),
		}),
		// validate: {
		// 	schema: createUserInputSchema,
		// },
	});
