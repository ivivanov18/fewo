import { test, expect, beforeEach } from "vitest";
import { hFragment, hString, f } from "../f";
import { mountDom } from "../mountDom";
import { destroyDom } from "../destroyDom";

beforeEach(() => {
    document.body.innerHTML = "";
});

test("Should destroy text element", () => {
    const text = "Test element";
    const vdom = hString(text);
    mountDom(vdom);

    expect(document.body.innerHTML).toBe(text);
    expect(vdom.el).toBeInstanceOf(Text);

    destroyDom(vdom);

    expect(document.body.innerHTML).toBe("");
});

test("Should destroy fragment node", () => {
    const vdom = hFragment([
        f("div", {}, [hString("This is a div")]),
        f("p", {}, [hString("This is a paragraph")]),
    ]);

    mountDom(vdom);

    expect(document.body.innerHTML).toBe(
        "<div>This is a div</div><p>This is a paragraph</p>"
    );

    destroyDom(vdom);
    expect(document.body.innerHTML).toBe("");
});
