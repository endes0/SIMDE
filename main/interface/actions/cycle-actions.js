"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NEXT_CYCLE = 'NEXT_CYCLE';
function nextCycle(data) {
    return {
        type: exports.NEXT_CYCLE,
        value: data
    };
}
exports.nextCycle = nextCycle;
//# sourceMappingURL=cycle-actions.js.map