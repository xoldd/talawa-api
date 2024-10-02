/**
 * More information at this link: https://vitest.dev/config/
 */
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		// coverage: {
		// 	enabled: true,
		// },
	},
});
