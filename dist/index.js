"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createActionCreator() {
    var data = {};
    var actionCreator = new Proxy(data, {
        get: function (target, prop) {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return ({
                    type: {
                        origin: data.origin,
                        methodName: prop,
                    },
                    args: args,
                });
            };
        },
    });
    data.origin = actionCreator;
    return actionCreator;
}
exports.createActionCreator = createActionCreator;
function createReducer(actionHandler, actionOrigin, initialState) {
    return function (s, a) {
        if (s === void 0) { s = initialState; }
        return (a.type.origin === actionOrigin && actionHandler[a.type.methodName]) ?
            actionHandler[a.type.methodName].apply(actionHandler, a.args)(s) : s;
    };
}
exports.createReducer = createReducer;
//# sourceMappingURL=index.js.map