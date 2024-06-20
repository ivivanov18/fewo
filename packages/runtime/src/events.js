export function addEventListener(eventName, handler, el) {
    el.addEventListener(eventName, handler);
    return handler;
}

export function addEventListeners(listeners = {}, el) {
    const addedListeners = {};

    Object.entries(listeners).forEach(([eventName, handler]) => {
        const listener = addEventListener(eventName, handler, el);
        addedListeners[eventName] = listener;
    });
    return addedListeners;
}

export function removeEventsListeners(listeners = {}, el) {
    Object.entries(listeners).forEach(([event, handler]) => {
        el.removeEventListener(event, handler);
    });
}
