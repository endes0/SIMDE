"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MachineStatus = /** @class */ (function () {
    function MachineStatus() {
    }
    Object.defineProperty(MachineStatus.prototype, "cycle", {
        get: function () {
            return this._cycle;
        },
        set: function (value) {
            this._cycle = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MachineStatus.prototype, "executing", {
        get: function () {
            return this._executing;
        },
        set: function (value) {
            this._executing = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MachineStatus.prototype, "breakPoint", {
        get: function () {
            return this._breakPoint;
        },
        set: function (value) {
            this._breakPoint = value;
        },
        enumerable: true,
        configurable: true
    });
    return MachineStatus;
}());
exports.MachineStatus = MachineStatus;
//# sourceMappingURL=MachineStatus.js.map