export var RESET_HISTORY = 'RESET_HISTORY';
export var PUSH_HISTORY = 'PUSH_HISTORY';
export var TAKE_HISTORY = 'TAKE_HISTORY';
export function takeHistory(index) {
    return {
        type: TAKE_HISTORY,
        value: index
    };
}
export function pushHistory() {
    return {
        type: PUSH_HISTORY,
        value: true
    };
}
export function resetHistory() {
    return {
        type: RESET_HISTORY,
        value: true
    };
}
//# sourceMappingURL=history.js.map