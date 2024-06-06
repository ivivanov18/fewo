import { DOM_TYPES } from "./f";

export function mountDom(vdom, parentEl = document.body) {
    const { type } = vdom;

    switch (type) {
        case DOM_TYPES.TEXT:
            createTextNode(vdom, parentEl);
            break;
        case DOM_TYPES.FRAGMENT:
            createFragmentNode(vdom, parentEl);
            break;
        case DOM_TYPES.ELEMENT:
            createElementNode(vdom, parentEl);
            break;
        default:
            throw new Error(`Can't mount DOM of type: ${vdom.type}`);
    }
}

function createTextNode(vdom, parentEl) {
    const { value } = vdom;

    const textNode = document.createTextNode(value);
    vdom.el = textNode;

    parentEl.append(textNode);
}

function createFragmentNode(vdom, parentEl) {
    const { children } = vdom;
    vdom.el = parentEl;

    children.forEach((child) => {
        mountDom(child, parentEl);
    });
}

function createElementNode(vdom, parentEl) {
    const { tag, props } = vdom;
    const el = document.createElement(tag);
    const attributes = Object.entries(props);

    attributes.forEach(([att, val]) => el.setAttribute(att, val));

    vdom.el = el;

    parentEl.append(el);
}
