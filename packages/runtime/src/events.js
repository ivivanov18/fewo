export function addEventListener(eventName, handler, el) {
    el.addEventListener(eventName, handler);
    return handler;
}

export function addEventListeners(listeners = {}, el) {
    const addedListeners = {};

    Object.entries(listeners).forEach(([eventName, handler]) => {
        const listener = el.addEventListener(eventName, handler);
        addedListeners[eventName] = listener;
    });

    return addedListeners;
}
