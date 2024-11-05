import { DOM_TYPES } from "./f";
import { mountDom } from "./mountDom";
import { areNodesEqual } from "./nodesEqual";
import { objectsDiff } from "./utils/objects";
import { isNotBlankOrEmptyString } from "./utils/strings";
import {
    removeStyle,
    setStyle,
    setAttribute,
    removeAttribute,
} from "./attributes";

export default function patchDom(oldVdom, newVdom, parentEl) {
    if (!areNodesEqual(oldVdom, newVdom)) {
        const index = findIndexInParent(parentEl, vdom.el);
        destroyDom(oldVdom);
        mountDom(newVdom, parentEl, index);

        return newVdom;
    }

    newVdom.el = oldVdom.el;

    switch (newVdom.type) {
        case DOM_TYPES.TEXT: {
            patchText(oldVdom, newVdom);
            return newVdom;
        }
        case DOM_TYPES.ELEMENT: {
            patchElement(oldVdom, newVdom);
            break;
        }
    }
}

function findIndexInParent(parentEl, el) {
    const index = Array.from(parentEl.childNodes).indexOf(el);

    if (index < 0) return null;

    return index;
}

function patchText(oldVdom, newVdom) {
    const { el } = oldVdom;
    const { value: oldText } = oldValue;
    const { value: newText } = newVdom;

    if (oldText !== newText) {
        el.nodeValue = newText;
    }
}

function patchElement(oldVdom, newVdom) {
    const el = oldVdom.el;
    const {
        class: oldClass,
        style: oldStyle,
        on: oldEvents,
        ...oldAttrs
    } = oldVdom.props;
    const {
        class: newClass,
        style: newStyle,
        on: newEvents,
        ...newAttrs
    } = newVdom.props;
    const { listeners: oldListeners } = oldVdom;

    patchAttrs(el, oldAttrs, newAttrs);
    patchClasses(el, oldClass, newClass);
    patchStyles(el, oldStyle, newStyle);
    newVdom.listeners = patchEvents(el, oldListeners, oldEvents, newEvents);
}

function patchAttrs(el, oldAttrs, newAttrs) {
    const { added, removed, modified } = objectsDiff(oldAttrs, newAttrs);

    for (const attr of removed) {
        removeAttribute(el, attr);
    }

    for (const attr of added.concat(modified)) {
        setAttribute(el, attr, newAttrs[attr]);
    }
}

function patchClasses(el, oldClass, newClass) {
    const oldClasses = toClassList(oldClass);
    const newClasses = toClassList(newClass);

    const { added, removed } = arraysDiff(oldClasses, newClasses);

    if (removed.length > 0) {
        el.classList.remove(...removed);
    }
    if (added.length > 0) {
        el.classList.add(...added);
    }
}

function toClassList(classes = "") {
    return Array.isArray(classes)
        ? classes.filter(isNotBlankOrEmptyString)
        : classes.split(/(\s+)/).filter(isNotBlankOrEmptyString);
}

function patchStyles(el, oldStyle = {}, newStyle = {}) {
    const { added, removed, modified } = objectsDiff(oldStyle, newStyle);

    for (const style of removed) {
        removeStyle(el, style);
    }

    for (const style of added.concat(modified)) {
        setStyle(el, style, newStyle[style]);
    }
}

function patchEvents(el, oldListeners = {}, oldEvents = {}, newEvents = {}) {
    const { removed, added, modified } = objectsDiff(oldEvents, newEvents);

    for (const eventName of removed.concat(modified)) {
        el.removeEventListener(eventName, oldListeners[eventName]);
    }

    const addedListeners = {};

    for (const eventName of added.concat(modified)) {
        const listener = addEventListener(eventName, newEvents[eventName], el);
        addedListeners[eventName] = listener;
    }

    return addedListeners;
}
