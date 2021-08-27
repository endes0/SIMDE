"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Machine_1 = require("../Common/Machine");
var Opcodes_1 = require("../Common/Opcodes");
var VLIWCode_1 = require("./VLIWCode");
var FunctionalUnit_1 = require("../Common/FunctionalUnit");
var DependencyChecker_1 = require("./DependencyChecker");
var VLIWError_1 = require("./VLIWError");
var VLIW = /** @class */ (function (_super) {
    tslib_1.__extends(VLIW, _super);
    function VLIW() {
        var _this = _super.call(this) || this;
        _this._predR = new Array(VLIW.NPR);
        _this._NaTGP = new Array(Machine_1.Machine.NGP);
        _this._NaTFP = new Array(Machine_1.Machine.NFP);
        _this._code = new VLIWCode_1.VLIWCode();
        _this._predR = new Array(VLIW.NPR);
        _this._predR.fill(false);
        _this._predR[0] = true;
        _this._NaTGP = new Array(Machine_1.Machine.NGP);
        _this._NaTGP.fill(false);
        _this._NaTFP = new Array(Machine_1.Machine.NFP);
        _this._NaTFP.fill(false);
        return _this;
    }
    VLIW.prototype.getPredReg = function (index) {
        return index ? this._predR[index] : this._predR;
    };
    VLIW.prototype.getNaTGP = function (index) {
        return index ? this._NaTGP[index] : this._NaTGP;
    };
    VLIW.prototype.getNaTFP = function (index) {
        return (index) ? this._NaTFP[index] : this._NaTFP;
    };
    Object.defineProperty(VLIW.prototype, "code", {
        get: function () {
            return this._code;
        },
        set: function (code) {
            this._code = code;
        },
        enumerable: true,
        configurable: true
    });
    //  Setters
    VLIW.prototype.setPredReg = function (index, p) {
        this._predR[index] = p;
    };
    VLIW.prototype.setNaTGP = function (index, n) {
        this._NaTGP[index] = n;
    };
    VLIW.prototype.setNaTFP = function (index, n) {
        this._NaTFP[index] = n;
    };
    VLIW.prototype.setNUF = function (index, n) {
        this._functionalUnitNumbers[index] = (index === FunctionalUnit_1.FunctionalUnitType.JUMP) ? 1 : n;
    };
    VLIW.prototype.checkCode = function () {
        for (var i = 0; i < this._code.getLargeInstructionNumber(); i++) {
            var instruction = this._code.getLargeInstruction(i);
            for (var j = 0; j < instruction.getVLIWOperationsNumber(); j++) {
                var operation = instruction.getOperation(j);
                if (operation.getFunctionalUnitIndex() >= this.functionalUnitNumbers[operation.getFunctionalUnitType()]) {
                    throw VLIWError_1.VLIWError.ERRHARD; // VLIW_ERRHARD;
                }
            }
        }
        throw VLIWError_1.VLIWError.ERRNO; // VLIW_ERRNO;
    };
    VLIW.prototype.checkDependenciesError = function (row, id) {
        try {
            this.checkDependencies(row, id);
        }
        catch (error) {
            if (error !== VLIWError_1.VLIWError.ERRNO) {
                throw new Error('Dependencies Error: ' + error);
            }
            else {
                return VLIWError_1.VLIWError.ERRNO;
            }
        }
    };
    VLIW.prototype.checkPredicateError = function (row, id) {
        try {
            this.checkPredicate(row, id);
        }
        catch (error) {
            if (error !== VLIWError_1.VLIWError.ERRNO) {
                throw new Error('Predicate Error: ' + error);
                ;
            }
            else {
                return VLIWError_1.VLIWError.ERRNO;
            }
        }
    };
    VLIW.prototype.tic = function () {
        var i;
        var j;
        var pending = false;
        var stopFlow = false;
        this.status.cycle++;
        if (this.functionalUnit[FunctionalUnit_1.FunctionalUnitType.JUMP][0].hasPendingInstruction()) {
            pending = true;
        }
        if (this.functionalUnit[FunctionalUnit_1.FunctionalUnitType.JUMP][0].status.stall === 0) {
            var operation = this.functionalUnit[FunctionalUnit_1.FunctionalUnitType.JUMP][0].getTopInstruction();
            if (operation != null) {
                if (this._predR[operation.getPred()]) {
                    this.pc = this.runJump(operation);
                }
            }
        }
        this.functionalUnit[FunctionalUnit_1.FunctionalUnitType.JUMP][0].tic();
        for (i = 0; i < FunctionalUnit_1.FUNCTIONALUNITTYPESQUANTITY - 1; i++) {
            for (j = 0; j < this._functionalUnitNumbers[i]; j++) {
                if (this.functionalUnit[i][j].hasPendingInstruction()) {
                    pending = true;
                }
                if (this._functionalUnit[i][j].status.stall === 0) {
                    var operation = this.functionalUnit[i][j].getTopInstruction();
                    if (operation != null) {
                        if (this._predR[operation.getPred()]) {
                            this.runOperation(operation, this.functionalUnit[i][j]);
                        }
                    }
                }
                this.functionalUnit[i][j].tic();
            }
        }
        this._gpr.tic();
        this._fpr.tic();
        if (!stopFlow) {
            var instruction = this._code.getLargeInstruction(this.pc);
            if (!instruction) {
                if (pending) {
                    return VLIWError_1.VLIWError.PCOUTOFRANGE;
                }
                return VLIWError_1.VLIWError.ENDEXE;
            }
            for (i = 0; i < instruction.getVLIWOperationsNumber(); i++) {
                var type = instruction.getOperation(i).getFunctionalUnitType();
                var index = instruction.getOperation(i).getFunctionalUnitIndex();
                if (!this.functionalUnit[type][index].isFree() ||
                    DependencyChecker_1.DependencyChecker.checkNat(instruction.getOperation(i), this._NaTGP, this._NaTFP)) {
                    stopFlow = true;
                    break;
                }
            }
            if (!stopFlow) {
                for (i = 0; i < instruction.getVLIWOperationsNumber(); i++) {
                    var operation = instruction.getOperation(i);
                    this.functionalUnit[operation.getFunctionalUnitType()][operation.getFunctionalUnitIndex()].fillFlow(operation);
                    if (operation.opcode === Opcodes_1.Opcodes.LW) {
                        this._NaTGP[operation.getOperand(0)] = true;
                    }
                    if (operation.opcode === Opcodes_1.Opcodes.LF) {
                        this._NaTFP[operation.getOperand(0)] = true;
                    }
                    if (operation.getFunctionalUnitType() === FunctionalUnit_1.FunctionalUnitType.JUMP) {
                        this._predR[operation.getPredTrue()] = false;
                        this._predR[operation.getPredFalse()] = false;
                    }
                }
                this.pc++;
            }
            if (instruction.getBreakPoint()) {
                this.status.breakPoint = true;
                return VLIWError_1.VLIWError.BREAKPOINT;
            }
        }
        return VLIWError_1.VLIWError.OK;
    };
    VLIW.prototype.init = function (reset) {
        _super.prototype.init.call(this, reset);
        this._NaTGP = new Array(Machine_1.Machine.NGP);
        this._NaTGP.fill(false);
        this._NaTFP = new Array(Machine_1.Machine.NFP);
        this._NaTFP.fill(false);
        this._predR = new Array(VLIW.NPR);
        this._predR.fill(false);
        this._predR[0] = true;
    };
    VLIW.prototype.runOperation = function (operation, functionalUnit) {
        switch (operation.opcode) {
            case Opcodes_1.Opcodes.ADD:
                this._gpr.setContent(operation.getOperand(0), this._gpr.getContent(operation.getOperand(1)) + this._gpr.getContent(operation.getOperand(2)), true);
                break;
            case Opcodes_1.Opcodes.MULT:
                this._gpr.setContent(operation.getOperand(0), this._gpr.getContent(operation.getOperand(1)) * this._gpr.getContent(operation.getOperand(2)), true);
                break;
            case Opcodes_1.Opcodes.ADDI:
                this._gpr.setContent(operation.getOperand(0), this._gpr.getContent(operation.getOperand(1)) + operation.getOperand(2), true);
                break;
            case Opcodes_1.Opcodes.ADDF:
                this._fpr.setContent(operation.getOperand(0), this._fpr.getContent(operation.getOperand(1)) + this._fpr.getContent(operation.getOperand(2)), true);
                break;
            case Opcodes_1.Opcodes.MULTF:
                this._fpr.setContent(operation.getOperand(0), this._fpr.getContent(operation.getOperand(1)) * this._fpr.getContent(operation.getOperand(2)), true);
                break;
            case Opcodes_1.Opcodes.SW:
                this._memory.setDatum(this._gpr.getContent(operation.getOperand(2)) + operation.getOperand(1), this._gpr.getContent(operation.getOperand(0)));
                break;
            case Opcodes_1.Opcodes.SF:
                this._memory.setDatum(this._gpr.getContent(operation.getOperand(2)) + operation.getOperand(1), this._fpr.getContent(operation.getOperand(0)));
                break;
            case Opcodes_1.Opcodes.LW:
                var datumInteger = this._memory.getDatum(this._gpr.getContent(operation.getOperand(2)) + operation.getOperand(1));
                if (!datumInteger.got) {
                    functionalUnit.status.stall = this._memoryFailLatency - functionalUnit.latency;
                }
                else {
                    this._gpr.setContent(operation.getOperand(0), datumInteger.datum, true);
                    this._NaTGP[operation.getOperand(0)] = false;
                }
                break;
            case Opcodes_1.Opcodes.LF:
                var datumFloat = this._memory.getDatum(this._gpr.getContent(operation.getOperand(2)) + operation.getOperand(1));
                if (!datumFloat.got) {
                    functionalUnit.status.stall = this._memoryFailLatency - functionalUnit.latency;
                }
                else {
                    this._fpr.setContent(operation.getOperand(0), datumFloat.datum, true);
                    this._NaTFP[operation.getOperand(0)] = false;
                }
                break;
            default:
                break;
        }
        this._gpr.setContent(0, 0, true);
        this._predR[0] = true;
    };
    VLIW.prototype.runJump = function (operation) {
        var newPC = this.pc;
        if (operation.opcode === Opcodes_1.Opcodes.BEQ) {
            if (this._gpr.getContent(operation.getOperand(0)) === this._gpr.getContent(operation.getOperand(1))) {
                newPC = operation.getOperand(2);
                this._predR[operation.getPredTrue()] = true;
                this._predR[operation.getPredFalse()] = false;
            }
            else {
                this._predR[operation.getPredTrue()] = false;
                this._predR[operation.getPredFalse()] = true;
            }
        }
        else if (operation.opcode === Opcodes_1.Opcodes.BNE) {
            if (this._gpr.getContent(operation.getOperand(0)) !== this._gpr.getContent(operation.getOperand(1))) {
                newPC = operation.getOperand(2);
                this._predR[operation.getPredTrue()] = true;
                this._predR[operation.getPredFalse()] = false;
            }
            else {
                this._predR[operation.getPredTrue()] = false;
                this._predR[operation.getPredFalse()] = true;
            }
        }
        return newPC;
    };
    VLIW.prototype.checkDependencies = function (row, id) {
        var checkGPR = new Array(Machine_1.Machine.NGP);
        var checkFPR = new Array(Machine_1.Machine.NFP);
        for (var i = 0; i < Machine_1.Machine.NGP; i++) {
            checkGPR[i].latency = 0;
        }
        for (var i = 0; i < Machine_1.Machine.NFP; i++) {
            checkFPR[i].latency = 0;
        }
        for (row = 0; row < this._code.getLargeInstructionNumber(); row++) {
            var instruction = this._code.getLargeInstruction(row);
            for (var j = 0; j < instruction.getVLIWOperationsNumber(); j++) {
                DependencyChecker_1.DependencyChecker.checkTargetOperation(instruction.getOperation(j), checkGPR, checkFPR, this._functionalUnitLatencies);
            }
            for (var j = 0; j < instruction.getVLIWOperationsNumber(); j++) {
                if (!DependencyChecker_1.DependencyChecker.checkSourceOperands(instruction.getOperation(j), checkGPR, checkFPR)) {
                    id = instruction.getOperation(j).id;
                    throw VLIWError_1.VLIWError.ERRRAW; // VLIW_ERRRA;
                }
            }
            for (var i = 0; i < VLIW.NGP; i++) {
                if (checkGPR[i].latency > 0) {
                    checkGPR[i].latency--;
                }
            }
            for (var i = 0; i < VLIW.NFP; i++) {
                if (checkFPR[i].latency > 0) {
                    checkFPR[i].latency--;
                }
            }
        }
        throw VLIWError_1.VLIWError.ERRNO; // VLIW_ERRNO;
    };
    VLIW.prototype.checkPredicate = function (row, id) {
        var controlCheckList; // list<TChequeo> checkPredicate;
        for (row = 0; row < this._code.getLargeInstructionNumber(); row++) {
            var index = 0;
            while (index < controlCheckList.length) {
                if (controlCheckList[index].latency === 1) {
                    controlCheckList.splice(index, 1);
                }
                else {
                    controlCheckList[index].latency--;
                    index++;
                }
            }
            var instruction = this._code.getLargeInstruction(row);
            for (var j = 0; j < instruction.getVLIWOperationsNumber(); j++) {
                if (instruction.getOperation(j).getFunctionalUnitType() === FunctionalUnit_1.FunctionalUnitType.JUMP) {
                    var check1 = void 0;
                    var check2 = void 0;
                    check1.latency = this._functionalUnitLatencies[FunctionalUnit_1.FunctionalUnitType.JUMP];
                    check2.latency = this._functionalUnitLatencies[FunctionalUnit_1.FunctionalUnitType.JUMP];
                    check1.register = instruction.getOperation(j).getPredTrue();
                    check2.register = instruction.getOperation(j).getPredFalse();
                    controlCheckList.push(check1);
                    controlCheckList.push(check2);
                }
            }
            for (var j = 0; j < instruction.getVLIWOperationsNumber(); j++) {
                if (instruction.getOperation(j).getPred() !== 0) {
                    for (index = 0; index < controlCheckList.length; index++) {
                        if (instruction.getOperation(j).getPred() === controlCheckList[index].register) {
                            break;
                        }
                    }
                    if (index === controlCheckList.length) {
                        id = instruction.getOperation(j).id;
                        for (var i = 0; i < controlCheckList.length; i++) {
                            controlCheckList[i].latency = 0;
                            controlCheckList[i].register = 0;
                        }
                        throw VLIWError_1.VLIWError.ERRPRED; // VLIW_ERRPRED;
                    }
                    else if (this._functionalUnitLatencies[instruction.getOperation(j).getFunctionalUnitType()] < controlCheckList[index].latency) {
                        id = instruction.getOperation(j).id;
                        for (var i = 0; i < controlCheckList.length; i++) {
                            controlCheckList[i].latency = 0;
                            controlCheckList[i].register = 0;
                        }
                        throw VLIWError_1.VLIWError.ERRBRANCHDEP; // VLIW_ERRBRANCHDEP;
                    }
                }
            }
        }
        for (var i = 0; i < controlCheckList.length; i++) {
            controlCheckList[i].latency = 0;
            controlCheckList[i].register = 0;
        }
        throw VLIWError_1.VLIWError.ERRNO; // VLIW_ERRNO;
    };
    VLIW.NPR = 64;
    return VLIW;
}(Machine_1.Machine));
exports.VLIW = VLIW;
//# sourceMappingURL=VLIW.js.map