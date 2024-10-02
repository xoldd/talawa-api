import { expect } from "vitest";

/**
 * This function is used to narrow the type of a value passed to it to not be `null` or `undefined`. More information can be found at the following links:
 * {@link https://github.com/vitest-dev/vitest/issues/2883#issuecomment-2176048122}
 * {@link https://github.com/vitest-dev/vitest/issues/5702#issuecomment-2176048295}
 */
export function expectToBeNonNullish<T>(
	value: T | null | undefined,
): asserts value is T {
	expect(value).not.toBeUndefined();
	expect(value).not.toBeNull();
}
