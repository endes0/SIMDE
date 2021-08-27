export var NEXT_NAT_FPR_CYCLE = 'NEXT_NAT_FPR_CYCLE';
export var NEXT_NAT_GPR_CYCLE = 'NEXT_NAT_GPR_CYCLE';
export var NEXT_PREDICATE_CYCLE = 'NEXT_PREDICATE_CYCLE';
export var ADD_NAT_FPR_INTERVAL = 'ADD_NAT_FPR_INTERVAL';
export var ADD_NAT_GPR_INTERVAL = 'ADD_NAT_GPR_INTERVAL';
export var REMOVE_NAT_FPR_INTERVAL = 'REMOVE_NAT_FPR_INTERVAL';
export var REMOVE_NAT_GPR_INTERVAL = 'REMOVE_NAT_GPR_INTERVAL';
export var ADD_PREDICATE_INTERVAL = 'ADD_PREDICATE_INTERVAL';
export var REMOVE_PREDICATE_INTERVAL = 'REMOVE_PREDICATE_INTERVAL';
export function addNatFprInterval(data) {
    return {
        type: ADD_NAT_FPR_INTERVAL,
        value: data
    };
}
export function addNatGprInterval(data) {
    return {
        type: ADD_NAT_GPR_INTERVAL,
        value: data
    };
}
export function removeNatFprInterval(data) {
    return {
        type: REMOVE_NAT_FPR_INTERVAL,
        value: new Set(data)
    };
}
export function removeNatGprInterval(data) {
    return {
        type: REMOVE_NAT_GPR_INTERVAL,
        value: new Set(data)
    };
}
export function addMemoryInterval(data) {
    return {
        type: ADD_PREDICATE_INTERVAL,
        value: data
    };
}
export function removeMemoryInterval(data) {
    return {
        type: REMOVE_PREDICATE_INTERVAL,
        value: new Set(data)
    };
}
export function nextNatFprCycle(data) {
    return {
        type: NEXT_NAT_FPR_CYCLE,
        value: data
    };
}
export function nextNatGprCycle(data) {
    return {
        type: NEXT_NAT_GPR_CYCLE,
        value: data
    };
}
export function nextPredicateCycle(data) {
    return {
        type: NEXT_PREDICATE_CYCLE,
        value: data
    };
}
//# sourceMappingURL=predicate-nat-actions.js.map