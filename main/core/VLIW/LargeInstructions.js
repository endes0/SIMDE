"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LargeInstruction = /** @class */ (function () {
    function LargeInstruction() {
        this._operations = [];
        this._breakPoint = false;
    }
    LargeInstruction.prototype.getOperation = function (index) {
        if (index > this._operations.length) {
            throw new Error('Index out of bounds at operations');
        }
        return this._operations[index];
    };
    LargeInstruction.prototype.getVLIWOperationsNumber = function () {
        return this._operations.length;
    };
    LargeInstruction.prototype.setBreakPoint = function (value) {
        this._breakPoint = value;
    };
    LargeInstruction.prototype.getBreakPoint = function () {
        return this._breakPoint;
    };
    LargeInstruction.prototype.addOperation = function (operation) {
        this._operations.push(operation);
    };
    return LargeInstruction;
}());
exports.LargeInstruction = LargeInstruction;
//# sourceMappingURL=LargeInstructions.js.map