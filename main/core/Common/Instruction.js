"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Opcodes_1 = require("./Opcodes");
var Instruction = /** @class */ (function () {
    function Instruction() {
        this._breakPoint = false;
        this._color = 'white';
        this._operands = new Array(3);
        this._operandsString = new Array(3);
    }
    Instruction.prototype.copy = function (other) {
        this._id = other.id;
        this._basicBlock = other.basicBlock;
        this._opcode = other.opcode;
        this._operands = other.operands.slice();
        this._operandsString = other.operandsString.slice();
        this._breakPoint = other.breakPoint;
        this._color = other.color;
    };
    Instruction.prototype.toString = function () {
        var aux = '';
        if (this._operandsString[1]) {
            aux += ' ' + this._operandsString[1];
        }
        if (this._operandsString[2]) {
            aux += ' ' + this._operandsString[2];
        }
        return Opcodes_1.OpcodesNames[this._opcode] + " " + this._operandsString[0] + " " + aux;
    };
    Instruction.prototype.setOperand = function (index, value, valueString) {
        this._operands[index] = value;
        this.operandsString[index] = valueString;
    };
    Instruction.prototype.getOperand = function (index) {
        return this._operands[index];
    };
    Object.defineProperty(Instruction.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Instruction.prototype, "basicBlock", {
        get: function () {
            return this._basicBlock;
        },
        set: function (value) {
            this._basicBlock = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Instruction.prototype, "opcode", {
        get: function () {
            return this._opcode;
        },
        set: function (value) {
            this._opcode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Instruction.prototype, "breakPoint", {
        get: function () {
            return this._breakPoint;
        },
        set: function (value) {
            this._breakPoint = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Instruction.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (value) {
            this._color = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Instruction.prototype, "operands", {
        get: function () {
            return this._operands;
        },
        set: function (value) {
            this._operands = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Instruction.prototype, "label", {
        get: function () {
            return this._label;
        },
        set: function (value) {
            this._label = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Instruction.prototype, "operandsString", {
        get: function () {
            return this._operandsString;
        },
        set: function (value) {
            this._operandsString = value;
        },
        enumerable: true,
        configurable: true
    });
    return Instruction;
}());
exports.Instruction = Instruction;
//# sourceMappingURL=Instruction.js.map