export var NEXT_JUMP_TABLE_CYCLE = 'NEXT_JUMP_TABLE_CYCLE';
export function nextJumpTableCycle(data) {
    return {
        type: NEXT_JUMP_TABLE_CYCLE,
        value: mapJumpTableData(data)
    };
}
export function mapJumpTableData(data) {
    return data.map(function (datum) { return changeValue(datum); });
}
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