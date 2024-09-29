/**
 * THIS SCRIPT IS USED TO GENERATE THE TALAWA API GRAPHQL SCHEMA IN THE GRAPHQL SDL(SCHEMA DEFINITION LANGUAGE) FORMAT AT THE ROOT DIRECTORY OF THIS PROJECT.
 */

import { writeFile } from "node:fs/promises";
import { lexicographicSortSchema, printSchema } from "graphql";
import { schema } from "~/src/graphql/schema.js";

try {
	console.log("Generating the talawa api graphql schema.");
	await writeFile(
		`${import.meta.dirname}/schema.graphql`,
		printSchema(lexicographicSortSchema(schema)),
	);
	console.log("Successfully generated the talawa api graphql schema.");
} catch (error) {
	console.log(
		"Failed to generate the talawa api graphql schema. Following error encountered: ",
		error,
	);
	process.exit(1);
}
