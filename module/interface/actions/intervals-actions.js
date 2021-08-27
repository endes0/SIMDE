export var ADD_ROB_FPR_INTERVAL = 'ADD_ROB_FPR_INTERVAL';
export var ADD_ROB_GPR_INTERVAL = 'ADD_ROB_GPR_INTERVAL';
export var REMOVE_ROB_FPR_INTERVAL = 'REMOVE_ROB_FPR_INTERVAL';
export var REMOVE_ROB_GPR_INTERVAL = 'REMOVE_ROB_GPR_INTERVAL';
export var ADD_MEMORY_INTERVAL = 'ADD_MEMORY_INTERVAL';
export var REMOVE_MEMORY_INTERVAL = 'REMOVE_MEMORY_INTERVAL';
export var ADD_GENERAL_REGISTERS_INTERVAL = 'ADD_GENERAL_REGISTERS_INTERVAL';
export var REMOVE_GENERAL_REGISTERS_INTERVAL = 'REMOVE_GENERAL_REGISTERS_INTERVAL';
export var ADD_FLOATING_REGISTERS_INTERVAL = 'ADD_FLOATING_REGISTERS_INTERVAL';
export var REMOVE_FLOATING_REGISTERS_INTERVAL = 'REMOVE_FLOATING_REGISTERS_INTERVAL';
export function addRobFprInterval(data) {
    return {
        type: ADD_ROB_FPR_INTERVAL,
        value: data
    };
}
export function addRobGprInterval(data) {
    return {
        type: ADD_ROB_GPR_INTERVAL,
        value: data
    };
}
export function removeRobFprInterval(data) {
    return {
        type: REMOVE_ROB_FPR_INTERVAL,
        value: new Set(data)
    };
}
export function removeRobGprInterval(data) {
    return {
        type: REMOVE_ROB_GPR_INTERVAL,
        value: new Set(data)
    };
}
export function addMemoryInterval(data) {
    return {
        type: ADD_MEMORY_INTERVAL,
        value: data
    };
}
export function addGeneralRegistersInterval(data) {
    return {
        type: ADD_GENERAL_REGISTERS_INTERVAL,
        value: data
    };
}
export function addFloatingRegistersInterval(data) {
    return {
        type: ADD_FLOATING_REGISTERS_INTERVAL,
        value: data
    };
}
export function removeMemoryInterval(data) {
    return {
        type: REMOVE_MEMORY_INTERVAL,
        value: new Set(data)
    };
}
export function removeGeneralRegistersInterval(data) {
    return {
        type: REMOVE_GENERAL_REGISTERS_INTERVAL,
        value: new Set(data)
    };
}
export function removeFloatingRegistersInterval(data) {
    return {
        type: REMOVE_FLOATING_REGISTERS_INTERVAL,
        value: new Set(data)
    };
}
//# sourceMappingURL=intervals-actions.js.map