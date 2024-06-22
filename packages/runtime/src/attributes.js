export function setAttributes(attributes, el) {
    const { class: className, style, ...attrs } = attributes;

    if (className) {
        setClass(className, el);
    }

    if (style) {
        Object.entries(style).forEach(([prop, value]) => {
            setStyle(el, prop, value);
        });
    }

    for (const [name, value] of Object.entries(attrs)) {
        setAttribute(el, name, value);
    }
}

function setClass(className, el) {
    el.className = "";

    if (typeof className === "string") {
        el.className = className;
    }

    if (Array.isArray(className)) {
        el.classList.add(...className);
    }
}

function setStyle(el, name, value) {
    el.style[name] = value;
}

function removeStyle(el, name) {
    el.style[name] = null;
}

function setAttribute(el, name, value) {
    if (value == null) {
        removeAttribute(el, name);
    } else if (name.startsWith("data-")) {
        el.setAttribute(name, value);
    } else {
        el[name] = value;
    }
}

function removeAttribute(el, name) {
    el[name] = null;
    el.removeAttribute(name);
}
