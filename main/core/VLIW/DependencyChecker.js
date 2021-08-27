"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Opcodes_1 = require("../Common/Opcodes");
var FunctionalUnit_1 = require("../Common/FunctionalUnit");
var DependencyChecker = /** @class */ (function () {
    function DependencyChecker() {
    }
    DependencyChecker.checkTargetOperation = function (operation, checkGPR, checkFPR, functionalUnitLatencies) {
        switch (operation.opcode) {
            case Opcodes_1.Opcodes.ADD:
            case Opcodes_1.Opcodes.ADDI:
                if (checkGPR[operation.getOperand(0)].latency < functionalUnitLatencies[FunctionalUnit_1.FunctionalUnitType.INTEGERSUM]) {
                    checkGPR[operation.getOperand(0)].latency = functionalUnitLatencies[FunctionalUnit_1.FunctionalUnitType.INTEGERSUM];
                    checkGPR[operation.getOperand(0)].register = operation.id;
                }
                break;
            case Opcodes_1.Opcodes.MULT:
                if (checkGPR[operation.getOperand(0)].latency < functionalUnitLatencies[FunctionalUnit_1.FunctionalUnitType.INTEGERMULTIPLY]) {
                    checkGPR[operation.getOperand(0)].latency = functionalUnitLatencies[FunctionalUnit_1.FunctionalUnitType.INTEGERMULTIPLY];
                    checkGPR[operation.getOperand(0)].register = operation.id;
                }
                break;
            case Opcodes_1.Opcodes.ADDF:
                if (checkFPR[operation.getOperand(0)].latency < functionalUnitLatencies[FunctionalUnit_1.FunctionalUnitType.FLOATINGSUM]) {
                    checkFPR[operation.getOperand(0)].latency = functionalUnitLatencies[FunctionalUnit_1.FunctionalUnitType.FLOATINGSUM];
                    checkFPR[operation.getOperand(0)].register = operation.id;
                }
                break;
            case Opcodes_1.Opcodes.MULTF:
                if (checkFPR[operation.getOperand(0)].latency < functionalUnitLatencies[FunctionalUnit_1.FunctionalUnitType.FLOATINGMULTIPLY]) {
                    checkFPR[operation.getOperand(0)].latency = functionalUnitLatencies[FunctionalUnit_1.FunctionalUnitType.FLOATINGMULTIPLY];
                    checkFPR[operation.getOperand(0)].register = operation.id;
                }
                break;
            case Opcodes_1.Opcodes.LW:
                if (checkGPR[operation.getOperand(0)].latency < functionalUnitLatencies[FunctionalUnit_1.FunctionalUnitType.MEMORY]) {
                    checkGPR[operation.getOperand(0)].latency = functionalUnitLatencies[FunctionalUnit_1.FunctionalUnitType.MEMORY];
                    checkGPR[operation.getOperand(0)].register = operation.id;
                }
                break;
            case Opcodes_1.Opcodes.LF:
                if (checkFPR[operation.getOperand(0)].latency < functionalUnitLatencies[FunctionalUnit_1.FunctionalUnitType.MEMORY]) {
                    checkFPR[operation.getOperand(0)].latency = functionalUnitLatencies[FunctionalUnit_1.FunctionalUnitType.MEMORY];
                    checkFPR[operation.getOperand(0)].register = operation.id;
                }
                break;
            case Opcodes_1.Opcodes.SW:
            case Opcodes_1.Opcodes.SF:
            case Opcodes_1.Opcodes.BEQ:
            case Opcodes_1.Opcodes.BNE:
            default:
                break;
        }
    };
    DependencyChecker.checkSourceOperands = function (operation, checkGPR, checkFPR) {
        var result = true;
        switch (operation.opcode) {
            case Opcodes_1.Opcodes.ADD:
            case Opcodes_1.Opcodes.MULT:
                if (((checkGPR[operation.getOperand(1)].latency > 0) && (checkGPR[operation.getOperand(1)].register < operation.id))
                    || ((checkGPR[operation.getOperand(2)].latency > 0) && (checkGPR[operation.getOperand(2)].register < operation.id))) {
                    result = false;
                }
                break;
            case Opcodes_1.Opcodes.ADDI:
                if ((checkGPR[operation.getOperand(1)].latency > 0) && (checkGPR[operation.getOperand(1)].register < operation.id)) {
                    result = false;
                }
                break;
            case Opcodes_1.Opcodes.ADDF:
            case Opcodes_1.Opcodes.MULTF:
                if (((checkFPR[operation.getOperand(1)].latency > 0) && (checkFPR[operation.getOperand(1)].register < operation.id))
                    || ((checkFPR[operation.getOperand(2)].latency > 0) && (checkFPR[operation.getOperand(2)].register < operation.id))) {
                    result = false;
                }
                break;
            case Opcodes_1.Opcodes.LW:
            case Opcodes_1.Opcodes.LF:
                if ((checkGPR[operation.getOperand(2)].latency > 0) && (checkGPR[operation.getOperand(2)].register < operation.id)) {
                    result = false;
                }
                break;
            case Opcodes_1.Opcodes.SW:
                if (((checkGPR[operation.getOperand(0)].latency > 0) && (checkGPR[operation.getOperand(0)].register < operation.id))
                    || ((checkGPR[operation.getOperand(2)].latency > 0) && (checkGPR[operation.getOperand(2)].register < operation.id))) {
                    result = false;
                }
                break;
            case Opcodes_1.Opcodes.SF:
                if (((checkFPR[operation.getOperand(0)].latency > 0) && (checkFPR[operation.getOperand(0)].register < operation.id))
                    || ((checkGPR[operation.getOperand(2)].latency > 0) && (checkGPR[operation.getOperand(2)].register < operation.id))) {
                    result = false;
                }
                break;
            case Opcodes_1.Opcodes.BEQ:
            case Opcodes_1.Opcodes.BNE:
                if (((checkGPR[operation.getOperand(0)].latency > 0) && (checkGPR[operation.getOperand(0)].register < operation.id))
                    || ((checkGPR[operation.getOperand(1)].latency > 0) && (checkGPR[operation.getOperand(1)].register < operation.id))) {
                    result = false;
                }
                break;
            default:
                result = true;
                break;
        }
        return result;
    };
    DependencyChecker.checkNat = function (operation, NaTGP, NaTFP) {
        var result;
        switch (operation.opcode) {
            case Opcodes_1.Opcodes.ADD:
            case Opcodes_1.Opcodes.MULT:
                result = NaTGP[operation.getOperand(1)] || NaTGP[operation.getOperand(2)];
                break;
            case Opcodes_1.Opcodes.ADDI:
                result = NaTGP[operation.getOperand(1)];
                break;
            case Opcodes_1.Opcodes.ADDF:
            case Opcodes_1.Opcodes.MULTF:
                result = NaTFP[operation.getOperand(1)] || NaTFP[operation.getOperand(2)];
                break;
            case Opcodes_1.Opcodes.SW:
                result = NaTGP[operation.getOperand(0)] || NaTGP[operation.getOperand(2)];
                break;
            case Opcodes_1.Opcodes.SF:
                result = NaTFP[operation.getOperand(0)] || NaTGP[operation.getOperand(2)];
                break;
            case Opcodes_1.Opcodes.LW:
            case Opcodes_1.Opcodes.LF:
                result = NaTGP[operation.getOperand(2)];
                break;
            case Opcodes_1.Opcodes.BEQ:
            case Opcodes_1.Opcodes.BNE:
                result = NaTGP[operation.getOperand(0)] || NaTGP[operation.getOperand(1)];
                break;
            default:
                result = true;
                break;
        }
        return result;
    };
    return DependencyChecker;
}());
exports.DependencyChecker = DependencyChecker;
//# sourceMappingURL=DependencyChecker.js.map