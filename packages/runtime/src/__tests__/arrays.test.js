import { test, expect, describe } from "vitest";
import { withoutNulls, arraysDiff } from "../utils/arrays";

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

describe("arraysDiff", () => {
    test("should return empty arrays when both oldArr and newArr are empty", () => {
        const oldArr = [];
        const newArr = [];
        const result = arraysDiff(oldArr, newArr);

        expect(result).toEqual({ added: [], removed: [] });
    });

    test("should return all elements as added when oldArr is empty and newArr has elements", () => {
        const oldArr = [];
        const newArr = [1, 2, 3];
        const result = arraysDiff(oldArr, newArr);

        expect(result).toEqual({ added: [1, 2, 3], removed: [] });
    });

    test("should return all elements as removed when newArr is empty and oldArr has elements", () => {
        const oldArr = [1, 2, 3];
        const newArr = [];
        const result = arraysDiff(oldArr, newArr);

        expect(result).toEqual({ added: [], removed: [1, 2, 3] });
    });

    test("should return correct added and removed elements when both arrays have unique differences", () => {
        const oldArr = [1, 2, 3];
        const newArr = [3, 4, 5];
        const result = arraysDiff(oldArr, newArr);

        expect(result).toEqual({ added: [4, 5], removed: [1, 2] });
    });

    test("should return empty arrays when both arrays are identical", () => {
        const oldArr = [1, 2, 3];
        const newArr = [1, 2, 3];
        const result = arraysDiff(oldArr, newArr);

        expect(result).toEqual({ added: [], removed: [] });
    });
});
