import { describe, it, expect, beforeEach, vi } from "vitest";
import Dispatcher from "../dispatcher";

describe("A command dispatcher", () => {
    let dispatcher;
    const payload = { test: "test" };
    const handler1 = vi.fn();
    const handler2 = vi.fn();
    const command = "test-event";

    beforeEach(() => {
        dispatcher = new Dispatcher();
    });

    it("Should add a handler for a command", () => {
        dispatcher.subscribe(command, handler1);

        const handlers = dispatcher.subs.get(command);
        expect(handlers).toContain(handler1);
    });

    it("Should return empty function if handler already exists", () => {
        const unsubscribe1 = dispatcher.subscribe(command, handler1);
        const unsubscribe2 = dispatcher.subscribe(command, handler1);

        expect(unsubscribe1).not.toBe(unsubscribe2);
        expect(unsubscribe2.toString()).toBe("() => {}");
    });

    it("Should remove a handler when the unubscribe function is called", () => {
        const unsubscribe = dispatcher.subscribe(command, handler1);

        let handlers = dispatcher.subs.get(command);
        expect(handlers).toContain(handler1);

        unsubscribe();

        handlers = dispatcher.subs.get(command);
        expect(handlers).not.toContain(handler1);
    });

    it("Should not anything if the same unubscribe is called twice", () => {
        const unsubscribe = dispatcher.subscribe(command, handler1);
        const handlers = dispatcher.subs.get(command);

        expect(handlers).toContain(handler1);

        unsubscribe();
        unsubscribe();

        expect(handlers.length).toBe(0);
        expect(handlers).not.toContain(handler1);
    });

    it("Should handle multiple handlers for the same command", () => {
        dispatcher.subscribe(command, handler1);
        dispatcher.subscribe(command, handler2);

        const handlers = dispatcher.subs.get(command);
        expect(handlers.length).toBe(2);
        expect(handlers).toContain(handler1);
        expect(handlers).toContain(handler2);
    });

    it("Should remove the correct handler when multiple handlers are subscribed", () => {
        dispatcher.subscribe(command, handler1);
        const unsubscribe2 = dispatcher.subscribe(command, handler2);

        let handlers = dispatcher.subs.get(command);
        expect(handlers.length).toBe(2);
        expect(handlers).toContain(handler1);
        expect(handlers).toContain(handler2);

        unsubscribe2();
        handlers = dispatcher.subs.get(command);
        expect(handlers).toContain(handler1);
        expect(handlers).not.toContain(handler2);
    });

    it("Should register afterHandlers", () => {
        const unregister = dispatcher.afterEveryCommand(handler1);
        const afterHandlers = dispatcher.afterHandlers;

        expect(afterHandlers.length).toBe(1);
        expect(afterHandlers).toContain(handler1);
    });

    it("Should handle multiple handlers", () => {
        dispatcher.afterEveryCommand(handler1);
        dispatcher.afterEveryCommand(handler2);

        const afterHandlers = dispatcher.afterHandlers;
        expect(afterHandlers.length).toBe(2);
        expect(afterHandlers).toContain(handler1);
        expect(afterHandlers).toContain(handler2);
    });

    it("Should return an unregister function to remove the handler", () => {
        const unregister = dispatcher.afterEveryCommand(handler1);
        const afterHandlers = dispatcher.afterHandlers;

        expect(afterHandlers.length).toBe(1);
        expect(afterHandlers).toContain(handler1);

        unregister();
        expect(afterHandlers.length).toBe(0);
        expect(afterHandlers).not.toContain(handler1);
    });
});
