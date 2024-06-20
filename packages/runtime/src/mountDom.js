import { setAttributes } from "./attributes";
import { addEventListeners } from "./events";
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
    const { tag, props, children } = vdom;
    const el = document.createElement(tag);
    addProps(el, props, vdom);
    vdom.el = el;

    children.forEach((child) => mountDom(child, el));
    parentEl.append(el);
}

function addProps(el, props, vdom) {
    const { on: events, ...attrs } = props;

    vdom.listeners = addEventListeners(events, el);
    setAttributes(attrs, el);
}
