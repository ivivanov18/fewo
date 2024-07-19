import { mountDom } from "./mountDom";
import { destroyDom } from "./destroyDom";
import Dispatcher from "./dispatcher";

function createApp({ state = {}, view, reducers = {} }) {
    let parentEl = null;
    let vdom = null;

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
        if (vdom) {
            destroyDom(vdom);
        }
        vdom = view(state, emit);
        mountDom(vdom, parentEl);
    }

    function emit(eventName, payload) {
        dispatcher.dispatch(eventName, payload);
    }

    return {
        mount: function (_parentEl) {
            parentEl = _parentEl;
            renderApp();
        },
        unmount: function () {
            destroyDom(vdom);
            vdom = null;
            subscriptions.forEach((unsubscribe) => unsubscribe());
        },
    };
}
