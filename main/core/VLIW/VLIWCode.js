"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LargeInstructions_1 = require("./LargeInstructions");
var VLIWParser_1 = require("./VLIWParser");
var VLIWCode = /** @class */ (function () {
    function VLIWCode(n) {
        if (n) {
            this.instructions = new Array(n);
            this.instructions.fill(new LargeInstructions_1.LargeInstruction());
        }
        else {
            this.instructions = [];
        }
        this._largeInstructionNumber = 0;
    }
    // Getters
    VLIWCode.prototype.getLargeInstructionNumber = function () {
        return this._largeInstructionNumber;
    };
    VLIWCode.prototype.getLargeInstruction = function (index) {
        if ((index < 0) || (index >= this._largeInstructionNumber)) {
            return null;
        }
        return this.instructions[index];
    };
    VLIWCode.prototype.getBreakPoint = function (index) {
        return this.instructions[index].getBreakPoint();
    };
    // Setters
    VLIWCode.prototype.setInstructionNumber = function (index) {
        this.instructions = new Array(index);
        this._largeInstructionNumber = index;
    };
    VLIWCode.prototype.setBreakPoint = function (index, b) {
        this.instructions[index].setBreakPoint(b);
    };
    VLIWCode.prototype.addOperacion = function (index, oper) {
        this.instructions[index].addOperation(oper);
    };
    Object.defineProperty(VLIWCode.prototype, "superescalarCode", {
        get: function () {
            return this._superescalarCode;
        },
        set: function (code) {
            this._superescalarCode = code;
        },
        enumerable: true,
        configurable: true
    });
    VLIWCode.prototype.clear = function () {
        this.instructions = null;
        this._largeInstructionNumber = 0;
    };
    VLIWCode.prototype.save = function () {
        return VLIWParser_1.VLIWParser.ExportAsString(this._largeInstructionNumber, this.instructions);
    };
    VLIWCode.prototype.load = function (input, code) {
        this.instructions = VLIWParser_1.VLIWParser.Parse(input, code);
        this._largeInstructionNumber = this.instructions.length;
        this._superescalarCode = code;
    };
    return VLIWCode;
}());
exports.VLIWCode = VLIWCode;
//# sourceMappingURL=VLIWCode.js.map