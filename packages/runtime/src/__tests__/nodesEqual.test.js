import { describe, it, expect } from "vitest";
import { areNodesEqual } from "../nodesEqual"; // Adjust the path to your function
import { DOM_TYPES } from "../f"; // Adjust the path to your DOM_TYPES

describe("areNodesEqual", () => {
    it("should return false if node types are different", () => {
        const nodeOne = { type: DOM_TYPES.ELEMENT };
        const nodeTwo = { type: DOM_TYPES.TEXT };

        expect(areNodesEqual(nodeOne, nodeTwo)).toBe(false);
    });

    it("should return true for nodes with the same type that are not ELEMENT", () => {
        const nodeOne = { type: DOM_TYPES.TEXT };
        const nodeTwo = { type: DOM_TYPES.TEXT };

        expect(areNodesEqual(nodeOne, nodeTwo)).toBe(true);
    });

    it("should return false if node types are ELEMENT but tags are different", () => {
        const nodeOne = { type: DOM_TYPES.ELEMENT, tag: "div" };
        const nodeTwo = { type: DOM_TYPES.ELEMENT, tag: "span" };

        expect(areNodesEqual(nodeOne, nodeTwo)).toBe(false);
    });

    it("should return true if node types are ELEMENT and tags are the same", () => {
        const nodeOne = { type: DOM_TYPES.ELEMENT, tag: "div" };
        const nodeTwo = { type: DOM_TYPES.ELEMENT, tag: "div" };

        expect(areNodesEqual(nodeOne, nodeTwo)).toBe(true);
    });
});
