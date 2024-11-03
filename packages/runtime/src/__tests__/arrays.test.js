import { it, test, expect, describe } from "vitest";
import { withoutNulls, arraysDiff, arraysDiffSequence } from "../utils/arrays";

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
    test("Should return empty arrays if initial arrays are empty", () => {
        const newArr = [];
        const oldArr = [];

        const result = arraysDiff(oldArr, newArr);

        expect(result).toEqual({
            added: [],
            removed: [],
        });
    });

    test("Should get the added elements", () => {
        const oldArr = [];
        const newArr = [1, 2, 3];

        const result = arraysDiff(oldArr, newArr);

        expect(result).toEqual({
            added: [1, 2, 3],
            removed: [],
        });
    });

    test("Should get the removed elements", () => {
        const oldArr = [1, 2, 3, 4, 5];
        const newArr = [1, 3, 5];

        const result = arraysDiff(oldArr, newArr);

        expect(result).toEqual({
            added: [],
            removed: [2, 4],
        });
    });

    test("should get both added and removed elements", () => {
        const oldArr = [1, 2, 3];
        const newArr = [2, 3, 4];
        const result = arraysDiff(oldArr, newArr);
        expect(result).toEqual({
            added: [4],
            removed: [1],
        });
    });

    test("should return empty arrays when both arrays have the same elements", () => {
        const oldArr = [1, 2, 3];
        const newArr = [1, 2, 3];
        const result = arraysDiff(oldArr, newArr);
        expect(result).toEqual({
            added: [],
            removed: [],
        });
    });

    test("should handle arrays with duplicate elements correctly", () => {
        const oldArr = [1, 2, 2, 3];
        const newArr = [2, 3, 3, 4];
        const result = arraysDiff(oldArr, newArr);
        expect(result).toEqual({
            added: [4],
            removed: [1],
        });
    });

    test("should handle complex scenarios correctly", () => {
        const oldArr = [1, 2, 3, 4, 5];
        const newArr = [3, 4, 5, 6, 7];
        const result = arraysDiff(oldArr, newArr);
        expect(result).toEqual({
            added: [6, 7],
            removed: [1, 2],
        });
    });
});

describe("arraysDiffSequence", () => {
    it("should return an empty sequence for identical arrays", () => {
        const oldArray = [1, 2, 3];
        const newArray = [1, 2, 3];
        const expectedSequence = [
            {
                index: 0,
                item: 1,
                op: "noop",
                originalIndex: 0,
            },
            {
                index: 1,
                item: 2,
                op: "noop",
                originalIndex: 1,
            },
            {
                index: 2,
                item: 3,
                op: "noop",
                originalIndex: 2,
            },
        ];
        const result = arraysDiffSequence(oldArray, newArray);

        expect(result).toEqual(expectedSequence);
    });

    it("should return a sequence of add operations for elements added to the new array", () => {
        console.log("starting");
        const oldArray = [];
        const newArray = [3, 4];
        console.log("beginning");
        const result = arraysDiffSequence(oldArray, newArray);

        expect(result).toEqual([
            { op: "add", index: 0, item: 3 },
            { op: "add", index: 1, item: 4 },
        ]);
    });

    it("should return a sequence of remove operations for elements removed from the old array", () => {
        const oldArray = [3, 4];
        const newArray = [];
        const result = arraysDiffSequence(oldArray, newArray);

        expect(result).toEqual([
            { op: "remove", index: 0, item: 3 },
            { op: "remove", index: 0, item: 4 },
        ]);
    });

    it("should return a mix of noop, add and remove operations for arrays with no changes, additions and removals", () => {
        const oldArray = [1, 2, 3];
        const newArray = [1, 4, 2];
        const result = arraysDiffSequence(oldArray, newArray);

        expect(result).toEqual([
            {
                index: 0,
                item: 1,
                op: "noop",
                originalIndex: 0,
            },
            { op: "add", index: 1, item: 4 },
            { op: "noop", index: 2, item: 2, originalIndex: 1 },
            { op: "remove", item: 3, index: 3 },
        ]);
    });
});
