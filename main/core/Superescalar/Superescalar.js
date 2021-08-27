"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Machine_1 = require("../Common/Machine");
var Opcodes_1 = require("../Common/Opcodes");
var Parser_1 = require("../Common/Parser");
var ReorderBufferEntry_1 = require("./ReorderBufferEntry");
var PrefetchEntry_1 = require("./PrefetchEntry");
var DecoderEntry_1 = require("./DecoderEntry");
var ReserveStationEntry_1 = require("./ReserveStationEntry");
var FunctionalUnit_1 = require("../Common/FunctionalUnit");
var Queue_1 = require("../Collections/Queue");
var Instruction_1 = require("../Common/Instruction");
var SuperescalarEnums_1 = require("./SuperescalarEnums");
var Superescalar = /** @class */ (function (_super) {
    tslib_1.__extends(Superescalar, _super);
    function Superescalar() {
        var _this = _super.call(this) || this;
        _this.issue = Superescalar.ISSUE_DEF;
        _this.ROBFpr = new Array(Machine_1.Machine.NFP);
        _this.ROBFpr.fill(-1);
        _this.ROBGpr = new Array(Machine_1.Machine.NGP);
        _this.ROBGpr.fill(-1);
        _this.jumpPrediction = new Array(Superescalar.PREDTABLESIZE).fill(0);
        _this.reserveStationEntry = new Array(FunctionalUnit_1.FUNCTIONALUNITTYPESQUANTITY).fill(null);
        // Calculate total ROB size
        var total = 0;
        for (var i = 0; i < FunctionalUnit_1.FUNCTIONALUNITTYPESQUANTITY; i++) {
            _this.reserveStationEntry[i] = new Array();
            total += _this.getReserveStationSize(i);
        }
        _this.reorderBuffer = new Queue_1.Queue();
        _this.prefetchUnit = new Queue_1.Queue();
        _this.decoder = new Queue_1.Queue();
        _this.reorderBuffer.init(total);
        _this.decoder.init(_this.issue);
        _this.prefetchUnit.init(2 * _this.issue);
        _this._code = null;
        _this.aluMem = new Array(_this.functionalUnitNumbers[FunctionalUnit_1.FunctionalUnitType.MEMORY]);
        for (var j = 0; j < _this.functionalUnitNumbers[FunctionalUnit_1.FunctionalUnitType.MEMORY]; j++) {
            _this.aluMem[j] = new FunctionalUnit_1.FunctionalUnit();
            _this.aluMem[j].type = FunctionalUnit_1.FunctionalUnitType.INTEGERSUM;
            _this.aluMem[j].latency = _this.functionalUnitLatencies[FunctionalUnit_1.FunctionalUnitType.INTEGERSUM];
        }
        return _this;
    }
    Superescalar.prototype.init = function (reset) {
        _super.prototype.init.call(this, reset);
        // Clean Gpr, Fpr, predSalto
        this.ROBGpr.fill(-1);
        this.ROBFpr.fill(-1);
        this.jumpPrediction.fill(0);
        // Calculate ROB size
        var total = 0;
        for (var i = 0; i < FunctionalUnit_1.FUNCTIONALUNITTYPESQUANTITY; i++) {
            this.reserveStationEntry[i] = new Array();
            total += this.getReserveStationSize(i);
        }
        this.reorderBuffer.init(total);
        this.decoder.init(this.issue);
        this.prefetchUnit.init(2 * this.issue);
        this._code = null;
        this.aluMem = new Array(this.functionalUnitNumbers[FunctionalUnit_1.FunctionalUnitType.MEMORY]).fill(new FunctionalUnit_1.FunctionalUnit());
        for (var j = 0; j < this.functionalUnitNumbers[FunctionalUnit_1.FunctionalUnitType.MEMORY]; j++) {
            this.aluMem[j] = new FunctionalUnit_1.FunctionalUnit();
            this.aluMem[j].type = FunctionalUnit_1.FunctionalUnitType.INTEGERSUM;
            this.aluMem[j].latency = this.functionalUnitLatencies[FunctionalUnit_1.FunctionalUnitType.INTEGERSUM];
        }
    };
    Superescalar.prototype.ticPrefetch = function () {
        while (!this.prefetchUnit.isFull() && (this.pc < this.code.lines)) {
            var aux = new PrefetchEntry_1.PrefetchEntry();
            // Importante: Hago una copia de la instrucción original para distinguir
            // las distintas apariciones de una misma inst.
            aux.instruction = new Instruction_1.Instruction();
            aux.instruction.copy(this.code.instructions[this.pc]);
            if (((aux.instruction.opcode === Opcodes_1.Opcodes.BEQ
                || aux.instruction.opcode === Opcodes_1.Opcodes.BNE
                || aux.instruction.opcode === Opcodes_1.Opcodes.BGT)
                && this.prediction(this.pc))) {
                this.pc = this.code.getBasicBlockInstruction(aux.instruction.getOperand(2));
            }
            else {
                this.pc++;
            }
            this.prefetchUnit.add(aux);
        }
        return this.prefetchUnit.getCount();
    };
    Superescalar.prototype.getReserveStationSize = function (type) {
        return this.functionalUnitNumbers[type] * (this._functionalUnitLatencies[type] + 1);
    };
    Superescalar.prototype.ticDecoder = function () {
        for (var i = this.prefetchUnit.first; !this.decoder.isFull() && i !== this.prefetchUnit.end(); i = this.prefetchUnit.nextIterator(i)) {
            var aux = this.prefetchUnit.elements[i];
            this.prefetchUnit.remove(i);
            var newDecoderEntry = new DecoderEntry_1.DecoderEntry();
            newDecoderEntry.instruction = aux.instruction;
            this.decoder.add(newDecoderEntry);
        }
        return this.decoder.getCount();
    };
    Superescalar.prototype.checkRegister = function (register, floatingPoint, reserveStationEntry, j) {
        var q = -1;
        var v = 0;
        if (floatingPoint) {
            // The register has the value ready
            if (!this._fpr.busy[register]) {
                v = this._fpr.content[register];
            }
            else if (this.reorderBuffer.elements[this.ROBFpr[register]].ready) {
                v = this.reorderBuffer.elements[this.ROBFpr[register]].value;
            }
            else {
                // The value is still being calculated
                q = this.ROBFpr[register];
            }
        }
        else {
            if (!this._gpr.busy[register]) {
                v = this._gpr.content[register];
            }
            else if (this.reorderBuffer.elements[this.ROBGpr[register]].ready) {
                v = this.reorderBuffer.elements[this.ROBGpr[register]].value;
            }
            else {
                // The value is still being calculated
                q = this.ROBGpr[register];
            }
        }
        if (j) {
            reserveStationEntry.Qj = q;
            reserveStationEntry.Vj = v;
        }
        else {
            reserveStationEntry.Qk = q;
            reserveStationEntry.Vk = v;
        }
    };
    Superescalar.prototype.issueInstruction = function (instruction, type, robIndex) {
        var actualReserveStation = this.reserveStationEntry[type];
        actualReserveStation[actualReserveStation.length - 1].instruction = instruction;
        actualReserveStation[actualReserveStation.length - 1].ROB = robIndex;
        actualReserveStation[actualReserveStation.length - 1].FUNum = -1;
        actualReserveStation[actualReserveStation.length - 1].A = -1;
        /* tslint:disable:ter-indent */
        switch (instruction.opcode) {
            case Opcodes_1.Opcodes.ADD:
            case Opcodes_1.Opcodes.SUB:
            case Opcodes_1.Opcodes.MULT:
            case Opcodes_1.Opcodes.OR:
            case Opcodes_1.Opcodes.AND:
            case Opcodes_1.Opcodes.NOR:
            case Opcodes_1.Opcodes.XOR:
            case Opcodes_1.Opcodes.SLLV:
            case Opcodes_1.Opcodes.SRLV:
                this.checkRegister(instruction.getOperand(1), false, actualReserveStation[actualReserveStation.length - 1], true);
                this.checkRegister(instruction.getOperand(2), false, actualReserveStation[actualReserveStation.length - 1], false);
                this.ROBGpr[instruction.getOperand(0)] = robIndex;
                this._gpr.setBusy(instruction.getOperand(0), true);
                this.reorderBuffer.elements[robIndex].destinyRegister = instruction.getOperand(0);
                break;
            case Opcodes_1.Opcodes.ADDI:
                this.checkRegister(instruction.getOperand(1), false, actualReserveStation[actualReserveStation.length - 1], true);
                actualReserveStation[actualReserveStation.length - 1].Qk = -1;
                actualReserveStation[actualReserveStation.length - 1].Vk = instruction.getOperand(2);
                this.ROBGpr[instruction.getOperand(0)] = robIndex;
                this._gpr.setBusy(instruction.getOperand(0), true);
                this.reorderBuffer.elements[robIndex].destinyRegister = instruction.getOperand(0);
                break;
            case Opcodes_1.Opcodes.ADDF:
            case Opcodes_1.Opcodes.SUBF:
            case Opcodes_1.Opcodes.MULTF:
                this.checkRegister(instruction.getOperand(1), true, actualReserveStation[actualReserveStation.length - 1], true);
                this.checkRegister(instruction.getOperand(2), true, actualReserveStation[actualReserveStation.length - 1], false);
                this.ROBFpr[instruction.getOperand(0)] = robIndex;
                this._fpr.setBusy(instruction.getOperand(0), true);
                this.reorderBuffer.elements[robIndex].destinyRegister = instruction.getOperand(0);
                break;
            case Opcodes_1.Opcodes.SW:
                this.checkRegister(instruction.getOperand(0), false, actualReserveStation[actualReserveStation.length - 1], true);
                this.checkRegister(instruction.getOperand(2), false, actualReserveStation[actualReserveStation.length - 1], false);
                actualReserveStation[actualReserveStation.length - 1].A = instruction.getOperand(1);
                this.reorderBuffer.elements[robIndex].address = -1;
                break;
            case Opcodes_1.Opcodes.SF:
                this.checkRegister(instruction.getOperand(0), true, actualReserveStation[actualReserveStation.length - 1], true);
                this.checkRegister(instruction.getOperand(2), false, actualReserveStation[actualReserveStation.length - 1], false);
                actualReserveStation[actualReserveStation.length - 1].A = instruction.getOperand(1);
                this.reorderBuffer.elements[robIndex].address = -1;
                break;
            case Opcodes_1.Opcodes.LW:
                this.checkRegister(instruction.getOperand(2), false, actualReserveStation[actualReserveStation.length - 1], false);
                actualReserveStation[actualReserveStation.length - 1].Qj = -1;
                actualReserveStation[actualReserveStation.length - 1].Vj = 0;
                actualReserveStation[actualReserveStation.length - 1].A = instruction.getOperand(1);
                this.ROBGpr[instruction.getOperand(0)] = robIndex;
                this._gpr.setBusy(instruction.getOperand(0), true);
                this.reorderBuffer.elements[robIndex].destinyRegister = instruction.getOperand(0);
                this.reorderBuffer.elements[robIndex].address = -1;
                break;
            case Opcodes_1.Opcodes.LF:
                this.checkRegister(instruction.getOperand(2), false, actualReserveStation[actualReserveStation.length - 1], false);
                actualReserveStation[actualReserveStation.length - 1].Qj = -1;
                actualReserveStation[actualReserveStation.length - 1].Vj = 0;
                actualReserveStation[actualReserveStation.length - 1].A = instruction.getOperand(1);
                this.ROBFpr[instruction.getOperand(0)] = robIndex;
                this._fpr.setBusy(instruction.getOperand(0), true);
                this.reorderBuffer.elements[robIndex].destinyRegister = instruction.getOperand(0);
                this.reorderBuffer.elements[robIndex].address = -1;
                break;
            case Opcodes_1.Opcodes.BEQ:
            case Opcodes_1.Opcodes.BNE:
            case Opcodes_1.Opcodes.BGT:
                this.checkRegister(instruction.getOperand(0), false, actualReserveStation[actualReserveStation.length - 1], true);
                this.checkRegister(instruction.getOperand(1), false, actualReserveStation[actualReserveStation.length - 1], false);
                actualReserveStation[actualReserveStation.length - 1].A = instruction.getOperand(2);
                break;
            default:
                break;
        }
        /* tslint:enable:ter-indent */
    };
    Superescalar.prototype.ticIssue = function () {
        var cont = 0;
        for (var i = this.decoder.first; i !== this.decoder.end(); i = this.decoder.nextIterator(i), cont++) {
            var instruction = this.decoder.elements[i].instruction;
            if (this.reorderBuffer.isFull()) {
                break;
            }
            var fuType = Parser_1.Parser.opcodeToFunctionalUnitType(instruction.opcode);
            if (this.reserveStationEntry[fuType].length === this.getReserveStationSize(fuType)) {
                break;
            }
            var newROB = new ReorderBufferEntry_1.ReorderBufferEntry();
            newROB.value = 0.0;
            newROB.destinyRegister = -1;
            newROB.address = -1;
            var robPos = this.reorderBuffer.add(newROB);
            var newER = new ReserveStationEntry_1.ReserveStationEntry();
            this.reserveStationEntry[fuType].push(newER);
            this.issueInstruction(instruction, fuType, robPos);
            this.reorderBuffer.elements[robPos].instruction = instruction;
            this.reorderBuffer.elements[robPos].ready = false;
            this.reorderBuffer.elements[robPos].superStage = SuperescalarEnums_1.SuperStage.SUPER_ISSUE;
            this.decoder.remove(i);
        }
        return cont;
    };
    Superescalar.prototype.checkStore = function (robIndex, address) {
        // Check for previous stores
        var i;
        for (i = this.reorderBuffer.first; i !== robIndex; i = this.reorderBuffer.nextIterator(i)) {
            var opcode = this.reorderBuffer.elements[i].instruction.opcode;
            if ((opcode === Opcodes_1.Opcodes.SW) || (opcode === Opcodes_1.Opcodes.SF)) {
                // without calculated address...
                if (this.reorderBuffer.elements[i].address === -1) {
                    break;
                    // ...or with the same address.
                }
                else if (this.reorderBuffer.elements[i].address === address) {
                    break;
                }
            }
        }
        return i === robIndex;
    };
    Superescalar.prototype.executeInstruction = function (type, num) {
        var i = 0;
        /* tslint:disable:ter-indent */
        switch (type) {
            case FunctionalUnit_1.FunctionalUnitType.INTEGERSUM:
            case FunctionalUnit_1.FunctionalUnitType.INTEGERMULTIPLY:
            case FunctionalUnit_1.FunctionalUnitType.FLOATINGSUM:
            case FunctionalUnit_1.FunctionalUnitType.FLOATINGMULTIPLY:
            case FunctionalUnit_1.FunctionalUnitType.JUMP:
                // Operandos disponibles
                while (i !== this.reserveStationEntry[type].length &&
                    !((this.reserveStationEntry[type][i].Qj === -1)
                        && (this.reserveStationEntry[type][i].Qk === -1) &&
                        (this.reserveStationEntry[type][i].FUNum === -1))) {
                    i++;
                }
                if (i !== this.reserveStationEntry[type].length) {
                    this.reserveStationEntry[type][i].FUNum = num;
                    this.reserveStationEntry[type][i].FUPos = this.functionalUnit[type][num].fillFlow(this.reserveStationEntry[type][i].instruction);
                    this.reorderBuffer.elements[this.reserveStationEntry[type][i].ROB].superStage = SuperescalarEnums_1.SuperStage.SUPER_EXECUTE;
                }
                break;
            case FunctionalUnit_1.FunctionalUnitType.MEMORY:
                // Fase 2 (Sólo los LOAD): Poner a ejecutar
                for (; i !== this.reserveStationEntry[type].length; i++) {
                    var opcode = this.reserveStationEntry[type][i].instruction.opcode;
                    if ((opcode === Opcodes_1.Opcodes.LW || opcode === Opcodes_1.Opcodes.LF)
                        && (this.reserveStationEntry[type][i].FUNum === -1)
                        && this.reorderBuffer.elements[this.reserveStationEntry[type][i].ROB].address !== -1
                        && this.checkStore(this.reserveStationEntry[type][i].ROB, this.reorderBuffer.elements[this.reserveStationEntry[type][i].ROB].address)) {
                        break;
                    }
                }
                if (i !== this.reserveStationEntry[type].length) {
                    this.reserveStationEntry[type][i].FUNum = num;
                    this.reserveStationEntry[type][i].FUPos = this.functionalUnit[type][num].fillFlow(this.reserveStationEntry[type][i].instruction);
                }
                break;
            default:
                break;
        }
        /* tslint:enable:ter-indent */
    };
    Superescalar.prototype.ticExecute = function () {
        // Go through all the Functional Unit
        for (var i = 0; i < FunctionalUnit_1.FUNCTIONALUNITTYPESQUANTITY; i++) {
            for (var j = 0; j < this.functionalUnitNumbers[i]; j++) {
                if (this.functionalUnit[i][j].isFree()) {
                    this.executeInstruction(i, j);
                }
            }
        }
        // Steb b of address calculation
        // Now it's time to gi through the FU of Address Calc
        for (var i = 0; i < this.functionalUnitNumbers[FunctionalUnit_1.FunctionalUnitType.MEMORY]; i++) {
            if (this.aluMem[i].getTopInstruction() != null) {
                // Look the entry of the Reserve station that matchs this instruction
                var j = 0;
                while ((this.reserveStationEntry[FunctionalUnit_1.FunctionalUnitType.MEMORY][j].FUNum !== (this.functionalUnitNumbers[FunctionalUnit_1.FunctionalUnitType.MEMORY] + i))
                    || (this.reserveStationEntry[FunctionalUnit_1.FunctionalUnitType.MEMORY][j].FUPos !== this.aluMem[i].getLast())) {
                    j++;
                }
                this.reorderBuffer.elements[this.reserveStationEntry[FunctionalUnit_1.FunctionalUnitType.MEMORY][j].ROB].address = this.reserveStationEntry[FunctionalUnit_1.FunctionalUnitType.MEMORY][j].Vk + this.reserveStationEntry[FunctionalUnit_1.FunctionalUnitType.MEMORY][j].A;
                this.reserveStationEntry[FunctionalUnit_1.FunctionalUnitType.MEMORY][j].A = this.reorderBuffer.elements[this.reserveStationEntry[FunctionalUnit_1.FunctionalUnitType.MEMORY][j].ROB].address;
                this.reserveStationEntry[FunctionalUnit_1.FunctionalUnitType.MEMORY][j].FUNum = -1; // Vuelve a no tener una UF asociada
            }
            this.aluMem[i].tic();
        }
        // Step a of address calculation
        // Fil the ALU of address calculations related to this FU
        for (var i = 0; i < this.functionalUnitNumbers[FunctionalUnit_1.FunctionalUnitType.MEMORY]; i++) {
            var j = 0;
            for (; j !== this.reserveStationEntry[FunctionalUnit_1.FunctionalUnitType.MEMORY].length; j++) {
                // Operand value available AND address not calculated yet AND is being calculated right now
                if ((this.reserveStationEntry[FunctionalUnit_1.FunctionalUnitType.MEMORY][j].Qk === -1)
                    && (this.reorderBuffer.elements[this.reserveStationEntry[FunctionalUnit_1.FunctionalUnitType.MEMORY][j].ROB].address === -1)
                    && (this.reserveStationEntry[FunctionalUnit_1.FunctionalUnitType.MEMORY][j].FUNum === -1)) {
                    break;
                }
            }
            if (j !== this.reserveStationEntry[FunctionalUnit_1.FunctionalUnitType.MEMORY].length) {
                this.reserveStationEntry[FunctionalUnit_1.FunctionalUnitType.MEMORY][j].FUNum = i + this.functionalUnitNumbers[FunctionalUnit_1.FunctionalUnitType.MEMORY]; // Así las distingo de las UF de Memoria
                this.reserveStationEntry[FunctionalUnit_1.FunctionalUnitType.MEMORY][j].FUPos = this.aluMem[i].fillFlow(this.reserveStationEntry[FunctionalUnit_1.FunctionalUnitType.MEMORY][j].instruction);
                this.reorderBuffer.elements[this.reserveStationEntry[FunctionalUnit_1.FunctionalUnitType.MEMORY][j].ROB].superStage = SuperescalarEnums_1.SuperStage.SUPER_EXECUTE;
            }
        }
    };
    Superescalar.prototype.writeInstruction = function (type, num) {
        var resul;
        var inst = this.functionalUnit[type][num].getTopInstruction();
        if (inst != null) {
            var i = 0;
            while ((this.reserveStationEntry[type][i].FUNum !== num) ||
                (this.reserveStationEntry[type][i].FUPos !== this.functionalUnit[type][num].getLast())) {
                i++;
            }
            var opcode = inst.opcode;
            /* tslint:disable:ter-indent */
            switch (opcode) {
                case Opcodes_1.Opcodes.ADD:
                case Opcodes_1.Opcodes.ADDI:
                case Opcodes_1.Opcodes.ADDF:
                    resul = this.reserveStationEntry[type][i].Vj + this.reserveStationEntry[type][i].Vk;
                    break;
                case Opcodes_1.Opcodes.SUB:
                case Opcodes_1.Opcodes.SUBF:
                    resul = this.reserveStationEntry[type][i].Vj - this.reserveStationEntry[type][i].Vk;
                    break;
                case Opcodes_1.Opcodes.OR:
                    resul = this.reserveStationEntry[type][i].Vj | this.reserveStationEntry[type][i].Vk;
                    break;
                case Opcodes_1.Opcodes.AND:
                    resul = this.reserveStationEntry[type][i].Vj & this.reserveStationEntry[type][i].Vk;
                    break;
                case Opcodes_1.Opcodes.XOR:
                    resul = this.reserveStationEntry[type][i].Vj ^ this.reserveStationEntry[type][i].Vk;
                    break;
                case Opcodes_1.Opcodes.NOR:
                    resul = ~(this.reserveStationEntry[type][i].Vj | this.reserveStationEntry[type][i].Vk);
                    break;
                case Opcodes_1.Opcodes.SRLV:
                    resul = this.reserveStationEntry[type][i].Vj >> this.reserveStationEntry[type][i].Vk;
                    break;
                case Opcodes_1.Opcodes.SLLV:
                    resul = this.reserveStationEntry[type][i].Vj << this.reserveStationEntry[type][i].Vk;
                    break;
                case Opcodes_1.Opcodes.MULT:
                case Opcodes_1.Opcodes.MULTF:
                    resul = this.reserveStationEntry[type][i].Vj * this.reserveStationEntry[type][i].Vk;
                    break;
                // En esta fase no se hace nada con los STORES
                case Opcodes_1.Opcodes.LW:
                case Opcodes_1.Opcodes.LF:
                    var a = this.memory.getDatum(this.reserveStationEntry[type][i].A);
                    resul = a.datum;
                    if (!a.got) {
                        this.functionalUnit[type][num].status.stall = this.memoryFailLatency - this.functionalUnit[type][num].latency;
                    }
                    break;
                case Opcodes_1.Opcodes.BEQ:
                    resul = (this.reserveStationEntry[type][i].Vj === this.reserveStationEntry[type][i].Vk) ? 1 : 0;
                    break;
                case Opcodes_1.Opcodes.BNE:
                    resul = (this.reserveStationEntry[type][i].Vj !== this.reserveStationEntry[type][i].Vk) ? 1 : 0;
                    break;
                case Opcodes_1.Opcodes.BGT:
                    resul = (this.reserveStationEntry[type][i].Vj > this.reserveStationEntry[type][i].Vk) ? 1 : 0;
                    break;
            }
            // Finish the instruction execution
            if (this.functionalUnit[type][num].status.stall === 0) {
                if ((opcode !== Opcodes_1.Opcodes.BNE) && (opcode !== Opcodes_1.Opcodes.BEQ) && (opcode !== Opcodes_1.Opcodes.BGT)) {
                    // Update all the reserve stations
                    for (var j = 0; j < FunctionalUnit_1.FUNCTIONALUNITTYPESQUANTITY; j++) {
                        for (var k = 0; k < this.reserveStationEntry[j].length; k++) {
                            if (this.reserveStationEntry[j][k].Qj === this.reserveStationEntry[type][i].ROB) {
                                this.reserveStationEntry[j][k].Vj = resul;
                                this.reserveStationEntry[j][k].Qj = -1;
                            }
                            if (this.reserveStationEntry[j][k].Qk === this.reserveStationEntry[type][i].ROB) {
                                this.reserveStationEntry[j][k].Vk = resul;
                                this.reserveStationEntry[j][k].Qk = -1;
                            }
                        }
                    }
                }
                this.reorderBuffer.elements[this.reserveStationEntry[type][i].ROB].value = resul;
                this.reorderBuffer.elements[this.reserveStationEntry[type][i].ROB].superStage = SuperescalarEnums_1.SuperStage.SUPER_WRITERESULT;
                this.reorderBuffer.elements[this.reserveStationEntry[type][i].ROB].ready = true;
                // Elimino la entrada de la ER
                this.reserveStationEntry[type].splice(i, 1);
            }
        }
    };
    Superescalar.prototype.ticWriteResult = function () {
        // First check for STORES that are ready
        var i = 0;
        while (i !== this.reserveStationEntry[FunctionalUnit_1.FunctionalUnitType.MEMORY].length) {
            var opcode = this.reorderBuffer.elements[this.reserveStationEntry[FunctionalUnit_1.FunctionalUnitType.MEMORY][i].ROB].instruction.opcode;
            if (((opcode === Opcodes_1.Opcodes.SW) || (opcode === Opcodes_1.Opcodes.SF))
                && (this.reserveStationEntry[FunctionalUnit_1.FunctionalUnitType.MEMORY][i].Qj === -1)
                && (this.reorderBuffer.elements[this.reserveStationEntry[FunctionalUnit_1.FunctionalUnitType.MEMORY][i].ROB].address !== -1)) {
                this.reorderBuffer.elements[this.reserveStationEntry[FunctionalUnit_1.FunctionalUnitType.MEMORY][i].ROB].value = this.reserveStationEntry[FunctionalUnit_1.FunctionalUnitType.MEMORY][i].Vj;
                this.reorderBuffer.elements[this.reserveStationEntry[FunctionalUnit_1.FunctionalUnitType.MEMORY][i].ROB].superStage = SuperescalarEnums_1.SuperStage.SUPER_WRITERESULT;
                this.reorderBuffer.elements[this.reserveStationEntry[FunctionalUnit_1.FunctionalUnitType.MEMORY][i].ROB].ready = true;
                // Remove the Reserve Station entry
                if (i === 0) {
                    this.reserveStationEntry[FunctionalUnit_1.FunctionalUnitType.MEMORY].splice(i, 1);
                    i = 0;
                }
                else {
                    this.reserveStationEntry[FunctionalUnit_1.FunctionalUnitType.MEMORY].splice(i, 1);
                }
            }
            else {
                i++;
            }
        }
        // Now it's time to retrieve all the results from the UF
        for (var i_1 = 0; i_1 < FunctionalUnit_1.FUNCTIONALUNITTYPESQUANTITY; i_1++) {
            for (var j = 0; j < this.functionalUnitNumbers[i_1]; j++) {
                if (this.functionalUnit[i_1][j].status.stall === 0) {
                    this.writeInstruction(i_1, j);
                }
                // Update clocks of the uf
                this.functionalUnit[i_1][j].tic();
            }
        }
    };
    Superescalar.prototype.checkJump = function (rob) {
        // Check if the prediction was correct
        // Typescript does not support ^ operator for boolean
        if (+this.prediction(rob.instruction.id) ^ +(!!rob.value)) {
            this.changePrediction(rob.instruction.id, !!rob.value);
            // Change pc
            if (rob.value) {
                this.pc = this.code.getBasicBlockInstruction(rob.instruction.getOperand(2));
            }
            else {
                this.pc = rob.instruction.id + 1;
            }
            // Clean functional Units and Reserve Stations,
            // the total will help for clean the next objects
            var total = 0;
            for (var i = 0; i < FunctionalUnit_1.FUNCTIONALUNITTYPESQUANTITY; i++) {
                for (var j = 0; j < this.functionalUnitNumbers[i]; j++) {
                    this.functionalUnit[i][j].clean();
                    this.reserveStationEntry[i] = new Array();
                }
                total += this.getReserveStationSize(i);
            }
            // Clean the alus for the address calculus
            for (var i = 0; i < this.functionalUnitNumbers[FunctionalUnit_1.FunctionalUnitType.MEMORY]; i++) {
                this.aluMem[i].clean();
            }
            // Clean prefetch, decoder and reorder buffer, the simplest way is
            // to rebuild the objects
            this.prefetchUnit = new Queue_1.Queue();
            this.decoder = new Queue_1.Queue();
            this.reorderBuffer = new Queue_1.Queue();
            this.reorderBuffer.init(total);
            this.decoder.init(this.issue);
            this.prefetchUnit.init(2 * this.issue);
            // Clean the structures related to the registers
            this.ROBGpr.fill(-1);
            this.ROBFpr.fill(-1);
            this._gpr.setAllBusy(false);
            this._fpr.setAllBusy(false);
            return false;
        }
        this.changePrediction(rob.instruction.id, !!rob.value);
        return true;
    };
    Superescalar.prototype.ticCommit = function () {
        for (var i = 0; i < this.issue; i++) {
            if (this.reorderBuffer.isEmpty()) {
                return SuperescalarEnums_1.CommitStatus.SUPER_COMMITEND;
            }
            else if (!this.reorderBuffer.top().ready) {
                return SuperescalarEnums_1.CommitStatus.SUPER_COMMITNO;
            }
            else {
                var h = this.reorderBuffer.first;
                var aux = this.reorderBuffer.remove();
                /* tslint:disable ter-indent */
                switch (aux.instruction.opcode) {
                    case Opcodes_1.Opcodes.SW:
                    case Opcodes_1.Opcodes.SF:
                        this.memory.setDatum(aux.address, aux.value);
                        break;
                    case Opcodes_1.Opcodes.BEQ:
                    case Opcodes_1.Opcodes.BNE:
                    case Opcodes_1.Opcodes.BGT:
                        if (!this.checkJump(aux)) {
                            return SuperescalarEnums_1.CommitStatus.SUPER_COMMITMISS;
                        }
                        break;
                    case Opcodes_1.Opcodes.ADD:
                    case Opcodes_1.Opcodes.ADDI:
                    case Opcodes_1.Opcodes.SUB:
                    case Opcodes_1.Opcodes.OR:
                    case Opcodes_1.Opcodes.AND:
                    case Opcodes_1.Opcodes.NOR:
                    case Opcodes_1.Opcodes.XOR:
                    case Opcodes_1.Opcodes.SLLV:
                    case Opcodes_1.Opcodes.SRLV:
                    case Opcodes_1.Opcodes.MULT:
                    case Opcodes_1.Opcodes.LW:
                        this._gpr.setContent(aux.destinyRegister, aux.value, false);
                        // R0 value is always 0
                        this._gpr.setContent(0, 0, false);
                        if (this.ROBGpr[aux.destinyRegister] === h) {
                            this._gpr.setBusy(aux.destinyRegister, false);
                        }
                        break;
                    case Opcodes_1.Opcodes.ADDF:
                    case Opcodes_1.Opcodes.MULTF:
                    case Opcodes_1.Opcodes.SUBF:
                    case Opcodes_1.Opcodes.LF:
                        this._fpr.setContent(aux.destinyRegister, aux.value, false);
                        if (this.ROBFpr[aux.destinyRegister] === h) {
                            this._fpr.setBusy(aux.destinyRegister, false);
                        }
                        break;
                    default:
                        break;
                }
                /* tslint:enable ter-indent */
            }
        }
        return SuperescalarEnums_1.CommitStatus.SUPER_COMMITOK;
    };
    Superescalar.prototype.tic = function () {
        this.status.cycle++;
        var commit = this.ticCommit();
        if (commit !== SuperescalarEnums_1.CommitStatus.SUPER_COMMITEND && commit !== SuperescalarEnums_1.CommitStatus.SUPER_COMMITMISS) {
            this.ticWriteResult();
            this.ticExecute();
        }
        var resultIssue = this.ticIssue();
        var resultDecoder = this.ticDecoder();
        var resultPrefetch = this.ticPrefetch();
        if ((resultIssue + resultDecoder + resultPrefetch === 0) &&
            (commit === SuperescalarEnums_1.CommitStatus.SUPER_COMMITEND)) {
            return SuperescalarEnums_1.SuperescalarStatus.SUPER_ENDEXE;
        }
        for (var i = this.prefetchUnit.first; i !== this.prefetchUnit.last; i = this.prefetchUnit.nextIterator(i)) {
            if (this.prefetchUnit.elements[i].instruction.breakPoint) {
                this.status.breakPoint = true;
                return SuperescalarEnums_1.SuperescalarStatus.SUPER_BREAKPOINT;
            }
        }
        return SuperescalarEnums_1.SuperescalarStatus.SUPER_OK;
    };
    Superescalar.prototype.changePrediction = function (address, result) {
        address = address % Superescalar.PREDTABLESIZE;
        /* tslint:disable ter-indent */
        switch (this.jumpPrediction[address]) {
            case 0:
                this.jumpPrediction[address] = (result) ? 1 : 0;
                break;
            case 1:
                this.jumpPrediction[address] = (result) ? 3 : 0;
                break;
            case 2:
                this.jumpPrediction[address] = (result) ? 3 : 0;
                break;
            case 3:
                this.jumpPrediction[address] = (result) ? 3 : 2;
                break;
            default:
                this.jumpPrediction[address] = 0;
                break;
        }
        /* tslint:enable ter-indent */
    };
    Superescalar.prototype.prediction = function (address) {
        return (this.jumpPrediction[address % Superescalar.PREDTABLESIZE] >= 2);
    };
    Object.defineProperty(Superescalar.prototype, "code", {
        get: function () {
            return this._code;
        },
        set: function (value) {
            this._code = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Superescalar.prototype, "issue", {
        get: function () {
            return this._issue;
        },
        set: function (value) {
            this._issue = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Superescalar.prototype, "ROBGpr", {
        get: function () {
            return this._ROBGpr;
        },
        set: function (value) {
            this._ROBGpr = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Superescalar.prototype, "ROBFpr", {
        get: function () {
            return this._ROBFpr;
        },
        set: function (value) {
            this._ROBFpr = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Superescalar.prototype, "reserveStationEntry", {
        get: function () {
            return this._reserveStationEntry;
        },
        set: function (value) {
            this._reserveStationEntry = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Superescalar.prototype, "reorderBuffer", {
        get: function () {
            return this._reorderBuffer;
        },
        set: function (value) {
            this._reorderBuffer = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Superescalar.prototype, "prefetchUnit", {
        get: function () {
            return this._prefetchUnit;
        },
        set: function (value) {
            this._prefetchUnit = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Superescalar.prototype, "decoder", {
        get: function () {
            return this._decoder;
        },
        set: function (value) {
            this._decoder = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Superescalar.prototype, "aluMem", {
        get: function () {
            return this._aluMem;
        },
        set: function (value) {
            this._aluMem = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Superescalar.prototype, "jumpPrediction", {
        get: function () {
            return this._jumpPrediction;
        },
        set: function (value) {
            this._jumpPrediction = value;
        },
        enumerable: true,
        configurable: true
    });
    Superescalar.PREDTABLEBITS = 4;
    Superescalar.PREDTABLESIZE = 1 << Superescalar.PREDTABLEBITS;
    Superescalar.ISSUE_DEF = 4;
    return Superescalar;
}(Machine_1.Machine));
exports.Superescalar = Superescalar;
//# sourceMappingURL=Superescalar.js.map