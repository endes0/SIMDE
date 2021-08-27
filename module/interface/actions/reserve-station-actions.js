import * as tslib_1 from "tslib";
export var NEXT_RESERVE_STATION_CYCLE = 'NEXT_RESERVE_STATION_CYCLE';
export function nextReserveStationCycle(data) {
    return {
        type: NEXT_RESERVE_STATION_CYCLE,
        value: data.map(function (element) { return mapReserveStationEntry(element); })
    };
}
function mapReserveStationEntry(content) {
    var data = content.data;
    var toReturn = [];
    var i;
    var defaultObject = {
        instruction: { id: '', value: '', color: '' },
        Qj: '',
        Vj: '',
        Qk: '',
        Vk: '',
        A: '',
        ROB: ''
    };
    for (i = 0; i < data.length; i++) {
        var aux = tslib_1.__assign({}, defaultObject);
        if (data[i] != null) {
            aux = {
                instruction: { id: '', value: '', color: '' },
                Qj: data[i].Qj,
                Vj: data[i].Vj,
                Qk: data[i].Qk,
                Vk: data[i].Vk,
                A: data[i].A,
                ROB: data[i].ROB
            };
            if (data[i].instruction != null) {
                aux.instruction.id = data[i].instruction.id;
                aux.instruction.value = data[i].instruction.toString();
                aux.instruction.color = data[i].instruction.color;
            }
        }
        toReturn.push(aux);
    }
    for (var j = i; j < content.size; j++) {
        toReturn.push(tslib_1.__assign({}, defaultObject));
    }
    return toReturn;
}
//# sourceMappingURL=reserve-station-actions.js.map