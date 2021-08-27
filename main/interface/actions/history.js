"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESET_HISTORY = 'RESET_HISTORY';
exports.PUSH_HISTORY = 'PUSH_HISTORY';
exports.TAKE_HISTORY = 'TAKE_HISTORY';
function takeHistory(index) {
    return {
        type: exports.TAKE_HISTORY,
        value: index
    };
}
exports.takeHistory = takeHistory;
function pushHistory() {
    return {
        type: exports.PUSH_HISTORY,
        value: true
    };
}
exports.pushHistory = pushHistory;
function resetHistory() {
    return {
        type: exports.RESET_HISTORY,
        value: true
    };
}
exports.resetHistory = resetHistory;
//# sourceMappingURL=history.js.map