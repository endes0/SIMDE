"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function batchActions() {
    var actions = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        actions[_i] = arguments[_i];
    }
    return {
        type: 'BATCH_ACTIONS',
        actions: actions
    };
}
exports.batchActions = batchActions;
//# sourceMappingURL=batch.js.map