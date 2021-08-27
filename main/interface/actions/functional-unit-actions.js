"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FUNCTIONAL_UNIT_CYCLE = 'FUNCTIONAL_UNIT_CYCLE';
function nextFunctionalUnitCycle(data) {
    return {
        type: exports.FUNCTIONAL_UNIT_CYCLE,
        value: data.map(function (element) { return mapFunctionalUnitData(element); })
    };
}
exports.nextFunctionalUnitCycle = nextFunctionalUnitCycle;
function mapFunctionalUnitData(data) {
    var toReturnObject = {
        content: [],
        header: []
    };
    var content = new Array();
    if (data != null && data[0] != null) {
        for (var i = 0; i < data[0].flow.length; i++) {
            var aux = [];
            for (var j = 0; j < data.length; j++) {
                if (data[j].flow[i] != null) {
                    aux.push({
                        id: data[j].flow[i].id,
                        value: data[j].flow[i].toString(),
                        color: data[j].flow[i].color
                    });
                }
                else {
                    aux.push({
                        id: ' ',
                        value: '',
                        color: ''
                    });
                }
            }
            content.push(aux);
        }
    }
    toReturnObject.content = content;
    toReturnObject.header = generateFunctionalUnitHeader(data);
    return toReturnObject;
}
function generateFunctionalUnitHeader(data) {
    var toReturn = [];
    if (data != null) {
        for (var i = 0; i < data.length; i++) {
            toReturn.push("#" + i);
        }
    }
    return toReturn;
}
//# sourceMappingURL=functional-unit-actions.js.map