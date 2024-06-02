import { test, expect } from "vitest";
import { withoutNulls } from "../utils/arrays";

test("Should filter the null values", () => {
    const arr = [1, 2, null, 3, null];
    const expected = [1, 2, 3];

    const filtered = withoutNulls(arr);

    expect(filtered.length).toBe(3);
    expect(filtered).toStrictEqual(expected);
});

test("Should filter the undefined values", () => {
    const arr = [1, 2, undefined, 3, undefined];
    const expected = [1, 2, 3];

    const filtered = withoutNulls(arr);

    expect(filtered.length).toBe(3);
    expect(filtered).toStrictEqual(expected);
});
