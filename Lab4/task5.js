var MyEventEmitter = /** @class */ (function () {
    function MyEventEmitter() {
        this.handlers = new Map();
    }
    MyEventEmitter.prototype.registerHandler = function (eventName, handler) {
        var _a;
        if (!this.handlers.has(eventName)) {
            this.handlers.set(eventName, []);
        }
        (_a = this.handlers.get(eventName)) === null || _a === void 0 ? void 0 : _a.push(handler);
    };
    MyEventEmitter.prototype.emitEvent = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var handlers = this.handlers.get(eventName);
        if (handlers) {
            handlers.forEach(function (handler) { return handler.apply(void 0, args); });
        }
    };
    return MyEventEmitter;
}());
var emitter = new MyEventEmitter();
emitter.registerHandler('userUpdated', function () { return console.log('Обліковий запис користувача оновлено'); });
emitter.registerHandler('userUpdated', function (key) { return console.log('Обліковий запис користувача оновлено ' + key); });
emitter.emitEvent('userUpdated', 3); // Обліковий запис користувача оновлено
