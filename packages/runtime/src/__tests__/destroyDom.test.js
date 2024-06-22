import { test, expect, beforeEach } from "vitest";
import { fFragment, fString, f } from "../f";
import { mountDom } from "../mountDom";
import { destroyDom } from "../destroyDom";

beforeEach(() => {
    document.body.innerHTML = "";
});

test("Should destroy text element", () => {
    const text = "Test element";
    const vdom = fString(text);
    mountDom(vdom);

    expect(document.body.innerHTML).toBe(text);
    expect(vdom.el).toBeInstanceOf(Text);

    destroyDom(vdom);

    expect(document.body.innerHTML).toBe("");
});

test("Should destroy fragment node", () => {
    const vdom = fFragment([
        f("div", {}, [fString("This is a div")]),
        f("p", {}, [fString("This is a paragraph")]),
    ]);

    mountDom(vdom);

    expect(document.body.innerHTML).toBe(
        "<div>This is a div</div><p>This is a paragraph</p>"
    );

    destroyDom(vdom);
    expect(document.body.innerHTML).toBe("");
});
