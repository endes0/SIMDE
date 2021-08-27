"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NEXT_REORDER_BUFFER_CYCLE = 'NEXT_REORDER_BUFFER_CYCLE';
exports.COLOR_CELL = 'COLOR_CELL';
var SuperescalarEnums_1 = require("../../core/Superescalar/SuperescalarEnums");
function nextReorderBufferCycle(data) {
    return {
        type: exports.NEXT_REORDER_BUFFER_CYCLE,
        value: mapReorderBufferData(data)
    };
}
exports.nextReorderBufferCycle = nextReorderBufferCycle;
function mapReorderBufferData(data) {
    return data.map(function (element) {
        var aux = {
            instruction: { id: '', value: '', color: '' },
            destinyRegister: '',
            value: '',
            address: '',
            superStage: ''
        };
        if (element != null) {
            aux = {
                instruction: { id: '', value: '', color: '' },
                destinyRegister: '' + element.destinyRegister,
                value: '' + element.value,
                address: '' + element.address,
                superStage: SuperescalarEnums_1.stageToString(element.superStage)
            };
            if (element.instruction != null) {
                aux.instruction.id = '' + element.instruction.id;
                aux.instruction.value = element.instruction.toString();
                aux.instruction.color = element.instruction.color;
            }
        }
        return aux;
    });
}
exports.mapReorderBufferData = mapReorderBufferData;
function colorCell(instructionid, color) {
    return {
        type: exports.COLOR_CELL,
        value: [instructionid, color]
    };
}
exports.colorCell = colorCell;
//# sourceMappingURL=reorder-buffer-actions.js.map