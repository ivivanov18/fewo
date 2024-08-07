export default class Dispatcher {
    #subs = new Map();
    #afterHandlers = [];

    subscribe(commandName, handler) {
        if (!this.#subs.has(commandName)) {
            this.#subs.set(commandName, []);
        }

        const handlers = this.#subs.get(commandName);
        if (handlers.includes(handler)) {
            // nothing to un-register
            return () => {};
        }

        handlers.push(handler);

        return () => {
            const idx = handlers.indexOf(handler);
            handlers.splice(idx, 1);
        };
    }

    get subs() {
        return this.#subs;
    }

    get afterHandlers() {
        return this.#afterHandlers;
    }

    dispatch(commandName, payload) {
        if (!this.#subs.has(commandName)) {
            console.warn(`No handlers for command ${commandName}`);
        } else {
            this.#subs.get(commandName).forEach((handler) => handler(payload));
        }
        this.#afterHandlers.forEach((handler) => handler());
    }

    afterEveryCommand(handler) {
        this.#afterHandlers.push(handler);

        return () => {
            const idx = this.#afterHandlers.indexOf(handler);
            this.#afterHandlers.splice(idx, 1);
        };
    }
}
