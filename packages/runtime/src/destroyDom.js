import { removeEventsListeners } from "./events";
import { DOM_TYPES } from "./f";

export function destroyDom(vdom) {
    const { type } = vdom;

    switch (type) {
        case DOM_TYPES.TEXT: {
            removeTextNode(vdom);
            break;
        }
        case DOM_TYPES.FRAGMENT: {
            removeFragmentNode(vdom);
            break;
        }
        case DOM_TYPES.ELEMENT: {
            removeElementNode(vdom);
            break;
        }
        default:
            throw new Error(`Cannot destroy node of type ${type}`);
    }
}

function removeTextNode(vdom) {
    const { el } = vdom;
    el.remove();
}

function removeElementNode(vdom) {
    const { listeners, el, children } = vdom;

    el.remove();
    children.forEach(destroyDom);

    if (listeners) {
        removeEventsListeners(listeners, el);
    }
}

function removeFragmentNode(vdom) {
    const { children } = vdom;

    children.forEach(destroyDom);
}
