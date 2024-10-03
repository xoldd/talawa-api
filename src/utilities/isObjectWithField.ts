export const isObjectWithField = <T extends string>(
	source: unknown,
	field: T,
) => typeof source === "object" && source !== null && field in source;
