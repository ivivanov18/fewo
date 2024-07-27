import { test, it, expect, describe } from "vitest";
import { objectsDiff, arraysDiff } from "../utils/objects";

describe("objectsDiff", () => {
    it("Should return empty arrays when both objects are empty", () => {
        const oldObj = {};
        const newObj = {};
        const result = objectsDiff(oldObj, newObj);
        expect(result).toEqual({ added: [], removed: [], modified: [] });
    });

    it("Should get the added keys", () => {
        const oldObj = {};
        const newObj = { a: 1, b: 2 };
        const result = objectsDiff(oldObj, newObj);
        expect(result).toEqual({
            added: ["a", "b"],
            removed: [],
            modified: [],
        });
    });

    it("Should get removed keys", () => {
        const oldObj = { a: 1, b: 2 };
        const newObj = {};
        const result = objectsDiff(oldObj, newObj);
        expect(result).toEqual({
            added: [],
            removed: ["a", "b"],
            modified: [],
        });
    });

    it("should identify modified keys", () => {
        const oldObj = { a: 1, b: 2 };
        const newObj = { a: 2, b: 2 };
        const result = objectsDiff(oldObj, newObj);
        expect(result).toEqual({
            added: [],
            removed: [],
            modified: ["a"],
        });
    });

    it("should identify a combination of added, removed, and modified keys", () => {
        const oldObj = { a: 1, b: 2, c: 3 };
        const newObj = { b: 2, c: 4, d: 5 };
        const result = objectsDiff(oldObj, newObj);
        expect(result).toEqual({
            added: ["d"],
            removed: ["a"],
            modified: ["c"],
        });
    });

    it("should handle complex scenarios correctly", () => {
        const oldObj = { a: 1, b: 2, c: 3, e: 5 };
        const newObj = { a: 1, b: 3, d: 4 };
        const result = objectsDiff(oldObj, newObj);
        expect(result).toEqual({
            added: ["d"],
            removed: ["c", "e"],
            modified: ["b"],
        });
    });
});

describe("arraysDiff", () => {
    it("Should return empty arrays if initial arrays are empty", () => {
        const newArr = [];
        const oldArr = [];

        const result = arraysDiff(oldArr, newArr);

        expect(result).toEqual({
            added: [],
            removed: [],
        });
    });

    it("Should get the added elements", () => {
        const oldArr = [];
        const newArr = [1, 2, 3];

        const result = arraysDiff(oldArr, newArr);

        expect(result).toEqual({
            added: [1, 2, 3],
            removed: [],
        });
    });

    it("Should get the removed elements", () => {
        const oldArr = [1, 2, 3, 4, 5];
        const newArr = [1, 3, 5];

        const result = arraysDiff(oldArr, newArr);

        expect(result).toEqual({
            added: [],
            removed: [2, 4],
        });
    });

    it("should get both added and removed elements", () => {
        const oldArr = [1, 2, 3];
        const newArr = [2, 3, 4];
        const result = arraysDiff(oldArr, newArr);
        expect(result).toEqual({
            added: [4],
            removed: [1],
        });
    });

    it("should return empty arrays when both arrays have the same elements", () => {
        const oldArr = [1, 2, 3];
        const newArr = [1, 2, 3];
        const result = arraysDiff(oldArr, newArr);
        expect(result).toEqual({
            added: [],
            removed: [],
        });
    });

    it("should handle arrays with duplicate elements correctly", () => {
        const oldArr = [1, 2, 2, 3];
        const newArr = [2, 3, 3, 4];
        const result = arraysDiff(oldArr, newArr);
        expect(result).toEqual({
            added: [4],
            removed: [1],
        });
    });

    it("should handle complex scenarios correctly", () => {
        const oldArr = [1, 2, 3, 4, 5];
        const newArr = [3, 4, 5, 6, 7];
        const result = arraysDiff(oldArr, newArr);
        expect(result).toEqual({
            added: [6, 7],
            removed: [1, 2],
        });
    });
});
