export default class Dispatcher {
    #subs = new Map();

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

    dispatch(commandName, payload) {}
}
