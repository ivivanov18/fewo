import { test, expect, beforeEach, vi, describe, it } from "vitest";
import { mountDom } from "../mountDom";
import { fString, f, fFragment } from "../f";

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

test("Should mount a text element into a parent element", () => {
    const text = "This is default text";
    const vdom = fString(text);
    const p = document.createElement("p");
    document.body.append(p);

    mountDom(vdom, p);

    expect(p.innerHTML).toBe(`${text}`);
});

test("Should save the text element in the vdom", () => {
    const text = "This is default text";
    const vdom = fString(text);
    const p = document.createElement("p");
    document.body.append(p);

    mountDom(vdom, p);
    const { el } = vdom;

    expect(el).toBeInstanceOf(Text);
    expect(p.innerHTML).toBe(text);
});

test("Should save a reference of the parent when mounting a fragment", () => {
    const text = "This a default text";
    const vdom = fFragment([fString(text)]);
    const p = document.createElement("p");
    document.body.append(p);

    mountDom(vdom, p);

    expect(vdom.el).toBe(p);
});

test("all nested fragments should have a reference to the same parent element", () => {
    const vdomOne = fFragment([fString("hi"), fString("hello there")]);
    const vdomTwo = fFragment([vdomOne]);
    const vdomThree = fFragment([vdomTwo]);

    mountDom(vdomThree, document.body);

    expect(vdomThree.el).toBe(document.body);
    expect(vdomTwo.el).toBe(document.body);
    expect(vdomOne.el).toBe(document.body);
});

test("Should mount an element with id", () => {
    const vdom = f("div", { id: "home-div" });

    mountDom(vdom, document.body);

    expect(document.body.innerHTML).toBe('<div id="home-div"></div>');
});

test("Should mount an element with class", () => {
    const vdom = f("div", { class: "test-class" });

    mountDom(vdom, document.body);

    expect(document.body.innerHTML).toBe('<div class="test-class"></div>');
});

test("Should mount an elements with arrays of classes", () => {
    const vdom = f("div", { class: ["class1", "class2", "class3"] });

    mountDom(vdom, document.body);

    expect(document.body.innerHTML).toBe(
        '<div class="class1 class2 class3"></div>'
    );
});

test("Should mount an element with style", () => {
    const vdom = f("div", { style: { fontSize: "16px", border: "10px" } });

    mountDom(vdom, document.body);

    const { el } = vdom;

    expect(document.body.innerHTML).toBe(
        '<div style="font-size: 16px; border: 10px;"></div>'
    );
    expect(el.style.border).toBe("10px");
    expect(el.style.fontSize).toBe("16px");
});

test("Should mount an element with handlers", () => {
    const vdom = f("div", { on: { click: vi.fn() } });

    mountDom(vdom, document.body);

    expect(vdom.listeners).toEqual({ click: expect.any(Function) });
});

test("Should throw an error if index is negative ", () => {
    const p = f("p", ["test"]);
    expect(() => mountDom(p, document.body, -10)).toThrowError(
        `Index must be positive but got ${-10}`
    );
});

test("Should append the element at the end of the parent element if index is null", () => {
    const p = f("p", {}, ["test"]);
    const div = document.createElement("div");
    div.className = "test";
    document.body.append(div);

    mountDom(p, document.body);

    expect(document.body.innerHTML).toBe(`<div class="test"></div><p>test</p>`);
});

test("Should append at the end if the index is superior to the length of the child nodes", () => {
    const div = document.createElement("div");
    const div2 = document.createElement("div");
    const div3 = document.createElement("div");
    document.body.append(div, div2, div3);

    const p = f("p", {}, ["test"]);

    mountDom(p, document.body, 20);

    expect(document.body.innerHTML);
});
