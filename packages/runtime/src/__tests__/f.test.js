import { test, expect } from "vitest";
import { DOM_TYPES, fString, f } from "../f";

test("Should return string node with value", () => {
    const str = "This is a text";
    const expectedNode = {
        type: DOM_TYPES.TEXT,
        value: str,
    };
    const returnedNode = fString(str);

    expect(returnedNode).toMatchObject(expectedNode);
});

test("Should return an element node", () => {
    const tag = "div";
    const props = { id: "test" };
    const children = [fString("test")];
    const expectedNode = {
        children,
        props,
        type: DOM_TYPES.ELEMENT,
    };

    const elNode = f(tag, props, children);

    expect(elNode).toMatchObject(expectedNode);
});
