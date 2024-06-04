import { DOM_TYPES } from "./f";

export function mountDom(vdom, parentEl = document.body) {
    const { type } = vdom;

    switch (type) {
        case DOM_TYPES.TEXT:
            createTextNode(vdom, parentEl);
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
