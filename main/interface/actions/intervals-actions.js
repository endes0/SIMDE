"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADD_ROB_FPR_INTERVAL = 'ADD_ROB_FPR_INTERVAL';
exports.ADD_ROB_GPR_INTERVAL = 'ADD_ROB_GPR_INTERVAL';
exports.REMOVE_ROB_FPR_INTERVAL = 'REMOVE_ROB_FPR_INTERVAL';
exports.REMOVE_ROB_GPR_INTERVAL = 'REMOVE_ROB_GPR_INTERVAL';
exports.ADD_MEMORY_INTERVAL = 'ADD_MEMORY_INTERVAL';
exports.REMOVE_MEMORY_INTERVAL = 'REMOVE_MEMORY_INTERVAL';
exports.ADD_GENERAL_REGISTERS_INTERVAL = 'ADD_GENERAL_REGISTERS_INTERVAL';
exports.REMOVE_GENERAL_REGISTERS_INTERVAL = 'REMOVE_GENERAL_REGISTERS_INTERVAL';
exports.ADD_FLOATING_REGISTERS_INTERVAL = 'ADD_FLOATING_REGISTERS_INTERVAL';
exports.REMOVE_FLOATING_REGISTERS_INTERVAL = 'REMOVE_FLOATING_REGISTERS_INTERVAL';
function addRobFprInterval(data) {
    return {
        type: exports.ADD_ROB_FPR_INTERVAL,
        value: data
    };
}
exports.addRobFprInterval = addRobFprInterval;
function addRobGprInterval(data) {
    return {
        type: exports.ADD_ROB_GPR_INTERVAL,
        value: data
    };
}
exports.addRobGprInterval = addRobGprInterval;
function removeRobFprInterval(data) {
    return {
        type: exports.REMOVE_ROB_FPR_INTERVAL,
        value: new Set(data)
    };
}
exports.removeRobFprInterval = removeRobFprInterval;
function removeRobGprInterval(data) {
    return {
        type: exports.REMOVE_ROB_GPR_INTERVAL,
        value: new Set(data)
    };
}
exports.removeRobGprInterval = removeRobGprInterval;
function addMemoryInterval(data) {
    return {
        type: exports.ADD_MEMORY_INTERVAL,
        value: data
    };
}
exports.addMemoryInterval = addMemoryInterval;
function addGeneralRegistersInterval(data) {
    return {
        type: exports.ADD_GENERAL_REGISTERS_INTERVAL,
        value: data
    };
}
exports.addGeneralRegistersInterval = addGeneralRegistersInterval;
function addFloatingRegistersInterval(data) {
    return {
        type: exports.ADD_FLOATING_REGISTERS_INTERVAL,
        value: data
    };
}
exports.addFloatingRegistersInterval = addFloatingRegistersInterval;
function removeMemoryInterval(data) {
    return {
        type: exports.REMOVE_MEMORY_INTERVAL,
        value: new Set(data)
    };
}
exports.removeMemoryInterval = removeMemoryInterval;
function removeGeneralRegistersInterval(data) {
    return {
        type: exports.REMOVE_GENERAL_REGISTERS_INTERVAL,
        value: new Set(data)
    };
}
exports.removeGeneralRegistersInterval = removeGeneralRegistersInterval;
function removeFloatingRegistersInterval(data) {
    return {
        type: exports.REMOVE_FLOATING_REGISTERS_INTERVAL,
        value: new Set(data)
    };
}
exports.removeFloatingRegistersInterval = removeFloatingRegistersInterval;
//# sourceMappingURL=intervals-actions.js.map