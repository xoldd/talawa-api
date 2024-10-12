import { userEducationGradeEnum } from "~/src/drizzle/enums.js";
import { builder } from "~/src/graphql/builder.js";

export const UserEducationGrade = builder.enumType("UserEducationGrade", {
	description: "",
	values: userEducationGradeEnum.options,
});
