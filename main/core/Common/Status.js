"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Status = /** @class */ (function () {
    function Status() {
    }
    Object.defineProperty(Status.prototype, "instructionNumber", {
        get: function () {
            return this._instructionNumber;
        },
        set: function (value) {
            this._instructionNumber = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Status.prototype, "lastInstruction", {
        get: function () {
            return this._lastInstruction;
        },
        set: function (value) {
            this._lastInstruction = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Status.prototype, "stall", {
        get: function () {
            return this._stall;
        },
        set: function (value) {
            this._stall = value;
        },
        enumerable: true,
        configurable: true
    });
    return Status;
}());
exports.Status = Status;
//# sourceMappingURL=Status.js.map