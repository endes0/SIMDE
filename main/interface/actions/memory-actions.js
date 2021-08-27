"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NEXT_MEMORY_CYCLE = 'NEXT_MEMORY_CYCLE';
function nextMemoryCycle(data) {
    return {
        type: exports.NEXT_MEMORY_CYCLE,
        value: data
    };
}
exports.nextMemoryCycle = nextMemoryCycle;
//# sourceMappingURL=memory-actions.js.map