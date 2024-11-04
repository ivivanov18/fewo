import { setAttributes } from "./attributes";
import { addEventListeners } from "./events";
import { DOM_TYPES } from "./f";

export function mountDom(vdom, parentEl, index) {
    const { type } = vdom;

    switch (type) {
        case DOM_TYPES.TEXT:
            createTextNode(vdom, parentEl, index);
            break;
        case DOM_TYPES.FRAGMENT:
            createFragmentNode(vdom, parentEl, index);
            break;
        case DOM_TYPES.ELEMENT:
            createElementNode(vdom, parentEl, index);
            break;
        default:
            throw new Error(`Can't mount DOM of type: ${vdom.type}`);
    }
}

function createTextNode(vdom, parentEl, index) {
    const { value } = vdom;

    const textNode = document.createTextNode(value);
    vdom.el = textNode;

    insert(textNode, parentEl, index);
}

function createFragmentNode(vdom, parentEl, index) {
    const { children } = vdom;
    vdom.el = parentEl;

    children.forEach((child, i) => {
        mountDom(child, parentEl, index ? index + i : null);
    });
}

function createElementNode(vdom, parentEl, index) {
    const { tag, props, children } = vdom;
    const el = document.createElement(tag);
    addProps(el, props, vdom);
    vdom.el = el;

    children.forEach((child) => mountDom(child, el));
    insert(el, parentEl, index);
}

function addProps(el, props, vdom) {
    const { on: events, ...attrs } = props;

    vdom.listeners = addEventListeners(events, el);
    setAttributes(attrs, el);
}

function insert(el, parentEl, index) {
    if (index == null) {
        parentEl.append(el);
        return;
    }

    if (index < 0) {
        throw new Error(`Index must be positive but got ${index}`);
    }

    const children = parentEl.childNodes;

    if (index >= children.length) {
        parentEl.append(el);
    } else {
        parentEl.insertBefore(el, children[index]);
    }
}
