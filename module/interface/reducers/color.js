import * as tslib_1 from "tslib";
export function colorHistoryInstruction(history, instructiondId, color) {
    return history.map(function (historyEntry) {
        var newHistoryEntry = tslib_1.__assign({}, historyEntry, { reorderBuffer: colorReserveEntry(historyEntry.reorderBuffer, instructiondId, color), reserveStationIntAdd: colorReserveEntry(historyEntry.reserveStationIntAdd, instructiondId, color), reserveStationIntSub: colorReserveEntry(historyEntry.reserveStationIntSub, instructiondId, color), reserveStationFloAdd: colorReserveEntry(historyEntry.reserveStationFloAdd, instructiondId, color), reserveStationFloSub: colorReserveEntry(historyEntry.reserveStationFloSub, instructiondId, color), reserveStationMemory: colorReserveEntry(historyEntry.reserveStationMemory, instructiondId, color), reserveStationJump: colorReserveEntry(historyEntry.reserveStationJump, instructiondId, color), functionalUnitIntAdd: colorFunctionalUnit(historyEntry.functionalUnitIntAdd, instructiondId, color), functionalUnitIntSub: colorFunctionalUnit(historyEntry.functionalUnitIntSub, instructiondId, color), functionalUnitFloAdd: colorFunctionalUnit(historyEntry.functionalUnitFloAdd, instructiondId, color), functionalUnitFloSub: colorFunctionalUnit(historyEntry.functionalUnitFloSub, instructiondId, color), functionalUnitMemory: colorFunctionalUnit(historyEntry.functionalUnitMemory, instructiondId, color), functionalUnitJump: colorFunctionalUnit(historyEntry.functionalUnitJump, instructiondId, color), functionalUnitAluMem: colorFunctionalUnit(historyEntry.functionalUnitAluMem, instructiondId, color) });
        return newHistoryEntry;
    });
}
function colorReserveEntry(reserveEntry, instructiondId, color) {
    return reserveEntry.map(function (e) {
        if (e.instruction.id === instructiondId) {
            e.instruction.color = color;
        }
        return e;
    });
}
function colorFunctionalUnit(functionalUnit, instructiondId, color) {
    var newFunctionalUnit = tslib_1.__assign({}, functionalUnit);
    newFunctionalUnit.content = newFunctionalUnit.content.map(function (ce) {
        return ce.map(function (cee) {
            if (cee.id === instructiondId) {
                cee.color = color;
            }
            return cee;
        });
    });
    return newFunctionalUnit;
}
//# sourceMappingURL=color.js.map