"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReorderBufferEntry = /** @class */ (function () {
    function ReorderBufferEntry() {
    }
    Object.defineProperty(ReorderBufferEntry.prototype, "instruction", {
        get: function () {
            return this._instruction;
        },
        set: function (value) {
            this._instruction = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReorderBufferEntry.prototype, "ready", {
        get: function () {
            return this._ready;
        },
        set: function (value) {
            this._ready = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReorderBufferEntry.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReorderBufferEntry.prototype, "destinyRegister", {
        get: function () {
            return this._destinyRegister;
        },
        set: function (value) {
            this._destinyRegister = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReorderBufferEntry.prototype, "address", {
        get: function () {
            return this._address;
        },
        set: function (value) {
            this._address = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReorderBufferEntry.prototype, "superStage", {
        get: function () {
            return this._superStage;
        },
        set: function (value) {
            this._superStage = value;
        },
        enumerable: true,
        configurable: true
    });
    return ReorderBufferEntry;
}());
exports.ReorderBufferEntry = ReorderBufferEntry;
//# sourceMappingURL=ReorderBufferEntry.js.map