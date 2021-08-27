"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NEXT_NAT_FPR_CYCLE = 'NEXT_NAT_FPR_CYCLE';
exports.NEXT_NAT_GPR_CYCLE = 'NEXT_NAT_GPR_CYCLE';
exports.NEXT_PREDICATE_CYCLE = 'NEXT_PREDICATE_CYCLE';
exports.ADD_NAT_FPR_INTERVAL = 'ADD_NAT_FPR_INTERVAL';
exports.ADD_NAT_GPR_INTERVAL = 'ADD_NAT_GPR_INTERVAL';
exports.REMOVE_NAT_FPR_INTERVAL = 'REMOVE_NAT_FPR_INTERVAL';
exports.REMOVE_NAT_GPR_INTERVAL = 'REMOVE_NAT_GPR_INTERVAL';
exports.ADD_PREDICATE_INTERVAL = 'ADD_PREDICATE_INTERVAL';
exports.REMOVE_PREDICATE_INTERVAL = 'REMOVE_PREDICATE_INTERVAL';
function addNatFprInterval(data) {
    return {
        type: exports.ADD_NAT_FPR_INTERVAL,
        value: data
    };
}
exports.addNatFprInterval = addNatFprInterval;
function addNatGprInterval(data) {
    return {
        type: exports.ADD_NAT_GPR_INTERVAL,
        value: data
    };
}
exports.addNatGprInterval = addNatGprInterval;
function removeNatFprInterval(data) {
    return {
        type: exports.REMOVE_NAT_FPR_INTERVAL,
        value: new Set(data)
    };
}
exports.removeNatFprInterval = removeNatFprInterval;
function removeNatGprInterval(data) {
    return {
        type: exports.REMOVE_NAT_GPR_INTERVAL,
        value: new Set(data)
    };
}
exports.removeNatGprInterval = removeNatGprInterval;
function addMemoryInterval(data) {
    return {
        type: exports.ADD_PREDICATE_INTERVAL,
        value: data
    };
}
exports.addMemoryInterval = addMemoryInterval;
function removeMemoryInterval(data) {
    return {
        type: exports.REMOVE_PREDICATE_INTERVAL,
        value: new Set(data)
    };
}
exports.removeMemoryInterval = removeMemoryInterval;
function nextNatFprCycle(data) {
    return {
        type: exports.NEXT_NAT_FPR_CYCLE,
        value: data
    };
}
exports.nextNatFprCycle = nextNatFprCycle;
function nextNatGprCycle(data) {
    return {
        type: exports.NEXT_NAT_GPR_CYCLE,
        value: data
    };
}
exports.nextNatGprCycle = nextNatGprCycle;
function nextPredicateCycle(data) {
    return {
        type: exports.NEXT_PREDICATE_CYCLE,
        value: data
    };
}
exports.nextPredicateCycle = nextPredicateCycle;
//# sourceMappingURL=predicate-nat-actions.js.map