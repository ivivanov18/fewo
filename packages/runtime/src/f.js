import { withoutNulls } from "./utils/arrays";

export const DOM_TYPES = Object.freeze({
    TEXT: "text",
    ELEMENT: "element",
    FRAGMENT: "fragment",
});

function hyperscript(tag, props = {}, children = []) {
    return {
        tag,
        props,
        children: mapTextNodes(withoutNulls(children)),
        type: DOM_TYPES.ELEMENT,
    };
}

function mapTextNodes(children) {
    return children.map((child) =>
        typeof child === "string" ? fString(child) : child
    );
}

export function fString(str) {
    return {
        type: DOM_TYPES.TEXT,
        value: str,
    };
}

export function fFragment(vNodes) {
    return {
        type: DOM_TYPES.FRAGMENT,
        children: mapTextNodes(withoutNulls(vNodes)),
    };
}

export const f = hyperscript;
