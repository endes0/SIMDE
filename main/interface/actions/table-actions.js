"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FunctionalUnit_1 = require("../../core/Common/FunctionalUnit");
exports.HEADER_TABLE_CYCLE = 'HEADER_TABLE_CYCLE';
exports.TABLE_CYCLE = 'TABLE_CYCLE';
function nextVLIWHeaderTableCycle(functionalUnitNumbers) {
    return {
        type: exports.HEADER_TABLE_CYCLE,
        value: mapVLIWHeaderTable(functionalUnitNumbers)
    };
}
exports.nextVLIWHeaderTableCycle = nextVLIWHeaderTableCycle;
function nextVLIWExecutionTableCycle(data, functionalUnitNumbers) {
    return {
        type: exports.TABLE_CYCLE,
        value: data.map(function (element) { return mapVLIWTableData(element, functionalUnitNumbers); })
    };
}
exports.nextVLIWExecutionTableCycle = nextVLIWExecutionTableCycle;
function mapVLIWHeaderTable(functionalUnitNumbers) {
    var functionalUnitAmount = functionalUnitNumbers.reduce(function (accumulator, current) { return accumulator + current; });
    var headers = new Array();
    headers.push({
        extraValue: '#'
    });
    for (var i = 0; i < functionalUnitNumbers.length; i++) {
        for (var j = 0; j < functionalUnitNumbers[i]; j++) {
            headers.push({
                translateKey: functionalUnitTranslateKeys[i],
                extraValue: j
            });
        }
    }
    return headers;
}
function mapVLIWTableData(data, functionalUnitNumbers) {
    var functionalUnitAmount = functionalUnitNumbers.reduce(function (accumulator, current) { return accumulator + current; });
    var cols = new Array(functionalUnitAmount);
    cols.fill(null);
    for (var i = 0; i < data.getVLIWOperationsNumber(); i++) {
        for (var j = 0; j < cols.length; j++) {
            if ((data.getOperation(i).getFunctionalUnitType() === FunctionalUnit_1.FunctionalUnitType.INTEGERSUM)
                && (data.getOperation(i).getFunctionalUnitIndex() === j)) {
                cols[j] = data.getOperation(i).id;
            }
            else if ((data.getOperation(i).getFunctionalUnitType() === FunctionalUnit_1.FunctionalUnitType.INTEGERMULTIPLY)
                && ((data.getOperation(i).getFunctionalUnitIndex() + functionalUnitNumbers[0]) === j)) {
                cols[j] = data.getOperation(i).id;
            }
            else if ((data.getOperation(i).getFunctionalUnitType() === FunctionalUnit_1.FunctionalUnitType.FLOATINGSUM)
                && ((data.getOperation(i).getFunctionalUnitIndex() + functionalUnitNumbers[0] + functionalUnitNumbers[1]) === j)) {
                cols[j] = data.getOperation(i).id;
            }
            else if ((data.getOperation(i).getFunctionalUnitType() === FunctionalUnit_1.FunctionalUnitType.FLOATINGMULTIPLY)
                && ((data.getOperation(i).getFunctionalUnitIndex() + functionalUnitNumbers[0] + functionalUnitNumbers[1] + functionalUnitNumbers[2]) === j)) {
                cols[j] = data.getOperation(i).id;
            }
            else if ((data.getOperation(i).getFunctionalUnitType() === FunctionalUnit_1.FunctionalUnitType.MEMORY)
                && ((data.getOperation(i).getFunctionalUnitIndex() + functionalUnitNumbers[0] +
                    functionalUnitNumbers[1] + functionalUnitNumbers[2] + functionalUnitNumbers[3]) === j)) {
                cols[j] = data.getOperation(i).id;
            }
            else if ((data.getOperation(i).getFunctionalUnitType() === FunctionalUnit_1.FunctionalUnitType.JUMP)
                && ((data.getOperation(i).getFunctionalUnitIndex() + functionalUnitNumbers[0] + functionalUnitNumbers[1]
                    + functionalUnitNumbers[2] + functionalUnitNumbers[3] + functionalUnitNumbers[4]) === j)) {
                cols[j] = data.getOperation(i).id;
            }
        }
    }
    return cols.map(function (c) { return c != null ? c : ' '; });
    // data.getVLIWOperationsNumber(); numero de operaciones de la instucción larga
    // data.getOperation(0).id; //numero de la operación superescalar
    // data.getOperation(0).getFunctionalUnitType; // tipo de operacion ADDI...
    // data.getOperation(0).getFunctionalUnitIndex; // numero de unidad funcional a la que se asignara
}
var functionalUnitTranslateKeys = {
    0: 'planificator.IntegerAdd',
    1: 'planificator.IntegerMult',
    2: 'planificator.FloatAdd',
    3: 'planificator.FloatMult',
    4: 'planificator.Memory',
    5: 'planificator.Jump'
};
//# sourceMappingURL=table-actions.js.map