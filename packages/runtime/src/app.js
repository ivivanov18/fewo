import { mountDom } from "./mountDom";
import { destroyDom } from "./destroyDom";
import patchDom from "./patchDom";
import Dispatcher from "./dispatcher";

export function createApp({ state = {}, view, reducers = {} }) {
    let parentEl = null;
    let vdom = null;
    let isMounted = false;

    const dispatcher = new Dispatcher();
    const subscriptions = [dispatcher.afterEveryCommand(renderApp)];

    for (const actionName in reducers) {
        const reducer = reducers[actionName];

        const subs = dispatcher.subscribe(actionName, (payload) => {
            state = reducer(state, payload);
        });
        subscriptions.push(subs);
    }

    function renderApp() {
        const newVdom = view(state, emit);
        vdom = patchDom(vdom, newVdom, parentEl);
    }

    function emit(eventName, payload) {
        dispatcher.dispatch(eventName, payload);
    }

    return {
        mount: function (_parentEl) {
            if (isMounted) {
                throw new Error("App is already mounted");
            }
            parentEl = _parentEl;
            vdom = view(state, emit);
            mountDom(vdom, parentEl);
            isMounted = true;
        },
        unmount: function () {
            destroyDom(vdom);
            vdom = null;
            subscriptions.forEach((unsubscribe) => unsubscribe());
            isMounted = false;
        },
    };
}
