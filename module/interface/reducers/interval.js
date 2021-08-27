import * as tslib_1 from "tslib";
export function addInterval(state, field, interval) {
    var newVisibleRangeValues = Array.from(new Set(tslib_1.__spread(state[field].visibleRangeValues, interval))).sort(function (a, b) { return +a - +b; });
    var newState = tslib_1.__assign({}, state, { history: state.history.map(function (historyEntry) {
            var newHistoryEntry = tslib_1.__assign({}, historyEntry);
            newHistoryEntry[field] = tslib_1.__assign({}, historyEntry[field], { visibleRangeValues: newVisibleRangeValues });
            return newHistoryEntry;
        }) });
    newState[field] = tslib_1.__assign({}, state[field], { visibleRangeValues: Array.from(new Set(tslib_1.__spread(state[field].visibleRangeValues, interval))).sort(function (a, b) { return +a - +b; }) });
    return newState;
}
export function removeInterval(state, field, interval) {
    var newVisibleRangeValues = state[field].visibleRangeValues.filter(function (x) { return !interval.has(x); });
    var newState = tslib_1.__assign({}, state, { history: state.history.map(function (historyEntry) {
            var newHistoryEntry = tslib_1.__assign({}, historyEntry);
            newHistoryEntry[field] = tslib_1.__assign({}, historyEntry[field], { visibleRangeValues: newVisibleRangeValues });
            return newHistoryEntry;
        }) });
    newState[field] = tslib_1.__assign({}, state[field], { visibleRangeValues: state[field].visibleRangeValues.filter(function (x) { return !interval.has(x); }) });
    return (state = newState);
}
//# sourceMappingURL=interval.js.map