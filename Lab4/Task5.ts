type EventHandler<> = (...args: unknown[]) => void;
class MyEventEmitter {
    private handlers: Map<string, EventHandler[]> = new Map();

    public registerHandler(eventName: string, handler: EventHandler): void {
        if (!this.handlers.has(eventName)) {
            this.handlers.set(eventName, []);
        }
        this.handlers.get(eventName)?.push(handler);
    }

    public emitEvent(eventName: string, ...args: unknown[]): void {
        const handlers = this.handlers.get(eventName);
        if (handlers) {
            handlers.forEach((handler) => handler(...args));
        }
    }
}

const emitter = new MyEventEmitter();
emitter.registerHandler('userUpdated', () => console.log('Обліковий запис користувача оновлено'));
emitter.registerHandler('userUpdated', (key) => console.log('Обліковий запис користувача оновлено '+key));
emitter.emitEvent('userUpdated', 3); // Обліковий запис користувача оновлено