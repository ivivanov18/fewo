import { test, it, expect, describe } from "vitest";
import { objectsDiff } from "../utils/objects";

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
