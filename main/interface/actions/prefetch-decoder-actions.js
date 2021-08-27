"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NEXT_PREFETCH_CYCLE = 'NEXT_PREFETCH_CYCLE';
exports.NEXT_DECODER_CYCLE = 'NEXT_DECODER_CYCLE';
function nextPrefetchCycle(data) {
    return {
        type: exports.NEXT_PREFETCH_CYCLE,
        value: mapPrefetchDecoderData(data)
    };
}
exports.nextPrefetchCycle = nextPrefetchCycle;
function nextDecoderCycle(data) {
    return {
        type: exports.NEXT_DECODER_CYCLE,
        value: mapPrefetchDecoderData(data)
    };
}
exports.nextDecoderCycle = nextDecoderCycle;
function mapPrefetchDecoderData(data) {
    var toReturn = new Array(data.elements.length - 1);
    toReturn.fill(' ');
    var j = 0;
    for (var i = data.first; i !== data.last; i = data.nextIterator(i), j++) {
        toReturn[j] =
            data.getElement(i) != null
                ? data.getElement(i).instruction.id
                : '0';
    }
    return toReturn;
}
exports.mapPrefetchDecoderData = mapPrefetchDecoderData;
//# sourceMappingURL=prefetch-decoder-actions.js.map