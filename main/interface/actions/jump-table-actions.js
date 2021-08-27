"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NEXT_JUMP_TABLE_CYCLE = 'NEXT_JUMP_TABLE_CYCLE';
function nextJumpTableCycle(data) {
    return {
        type: exports.NEXT_JUMP_TABLE_CYCLE,
        value: mapJumpTableData(data)
    };
}
exports.nextJumpTableCycle = nextJumpTableCycle;
function mapJumpTableData(data) {
    return data.map(function (datum) { return changeValue(datum); });
}
exports.mapJumpTableData = mapJumpTableData;
function changeValue(value) {
    var possibleValues = {
        0: 'F(00)',
        1: 'F(01)',
        2: 'V(10)',
        3: 'V(11)'
    };
    return possibleValues[value];
}
//# sourceMappingURL=jump-table-actions.js.map