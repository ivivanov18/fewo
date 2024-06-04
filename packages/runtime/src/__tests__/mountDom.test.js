import { test, expect } from "vitest";
import { mountDom } from "../mountDom";
import { hString, f } from "../f";

test("Should throw error for none recognized dom type", () => {
    const unknown = "unknown";

    expect(() => mountDom({ type: "unknown" }, "body")).toThrowError(
        `Can't mount DOM of type: ${unknown}`
    );
});

test("Should be mounted on document.body by default if no parent element", () => {
    const text = "This is a default text";
    const vdom = hString(text);

    mountDom(vdom);

    expect(document.body.innerHTML).toBe(`${text}`);
});

test("Should mount a text element into a parent element", () => {
    const text = "This is default text";
    const vdom = hString(text);
    const p = document.createElement("p");
    document.body.append(p);

    mountDom(vdom, p);

    expect(p.innerHTML).toBe(`${text}`);
});

test("Should save the text element in the vdom", () => {
    const text = "This is default text";
    const vdom = hString(text);
    const p = document.createElement("p");
    document.body.append(p);

    mountDom(vdom, p);
    const { el } = vdom;

    expect(vdom.el).to;
});
