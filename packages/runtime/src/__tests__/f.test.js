import { test, expect } from "vitest";
import { DOM_TYPES, hString } from "../f";

test("Should return string node with value", () => {
    const str = "This is a text";
    const expectedNode = {
        type: DOM_TYPES.TEXT,
        value: str,
    };
    const returnedNode = hString(str);

    expect(returnedNode).toMatchObject(expectedNode);
});
