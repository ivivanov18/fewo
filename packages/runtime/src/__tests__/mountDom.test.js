import { test, expect, beforeEach, vi } from "vitest";
import { mountDom } from "../mountDom";
import { hString, f, hFragment } from "../f";

beforeEach(() => {
    vi.unstubAllGlobals();
    document.body.innerHTML = "";
});

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

    expect(el).toBeInstanceOf(Text);
    expect(p.innerHTML).toBe(text);
});

test("Should save a reference of the parent when mounting a fragment", () => {
    const text = "This a default text";
    const vdom = hFragment([hString(text)]);
    const p = document.createElement("p");
    document.body.append(p);

    mountDom(vdom, p);

    expect(vdom.el).toBe(p);
});

test("all nested fragments should have a reference to the same parent element", () => {
    const vdomOne = hFragment([hString("hi"), hString("hello there")]);
    const vdomTwo = hFragment([vdomOne]);
    const vdomThree = hFragment([vdomTwo]);

    mountDom(vdomThree, document.body);

    expect(vdomThree.el).toBe(document.body);
    expect(vdomTwo.el).toBe(document.body);
    expect(vdomOne.el).toBe(document.body);
});

test("Should mount an element with id", () => {
    const vdom = f("div", { id: "home-div" });

    mountDom(vdom);

    expect(document.body.innerHTML).toBe('<div id="home-div"></div>');
});

test("Should mount an element with class", () => {
    const vdom = f("div", { class: "test-class" });

    mountDom(vdom);

    expect(document.body.innerHTML).toBe('<div class="test-class"></div>');
});

test("Should mount an elements with arrays of classes", () => {
    const vdom = f("div", { class: ["class1", "class2", "class3"] });

    mountDom(vdom);

    expect(document.body.innerHTML).toBe(
        '<div class="class1 class2 class3"></div>'
    );
});

test("Should mount an element with style", () => {
    const vdom = f("div", { style: { fontSize: "16px", border: "10px" } });

    mountDom(vdom);
    const { el } = vdom;

    expect(document.body.innerHTML).toBe(
        '<div style="font-size: 16px; border: 10px;"></div>'
    );
    expect(el.style.border).toBe("10px");
    expect(el.style.fontSize).toBe("16px");
});

test("Should mount an element with handlers", () => {
    const vdom = f("div", { on: { click: vi.fn() } });

    mountDom(vdom);

    expect(vdom.listeners).toEqual({ click: expect.any(Function) });
});
