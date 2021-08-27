"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Constants_1 = require("../Constants");
var Register = /** @class */ (function () {
    function Register() {
        this.busy = new Array(Register.REGISTRY_NUMBER);
        this.content = new Array(Register.REGISTRY_NUMBER);
        this.bufferIn = new Array(Register.REGISTRY_NUMBER);
    }
    Object.defineProperty(Register.prototype, "content", {
        get: function () {
            return this._content;
        },
        set: function (value) {
            this._content = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Register.prototype, "bufferIn", {
        get: function () {
            return this._bufferIn;
        },
        set: function (value) {
            this._bufferIn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Register.prototype, "busy", {
        get: function () {
            return this._busy;
        },
        set: function (value) {
            this._busy = value;
        },
        enumerable: true,
        configurable: true
    });
    Register.prototype.setContent = function (index, value, useBuffer) {
        if (useBuffer) {
            this.bufferIn[index] = value;
            this.busy[index] = true;
        }
        else {
            this.content[index] = value;
        }
    };
    Register.prototype.getContent = function (index) {
        return this.content[index];
    };
    Register.prototype.getRegistryNumber = function () {
        return Register.REGISTRY_NUMBER;
    };
    Register.prototype.setBusy = function (index, value) {
        this.busy[index] = value;
    };
    Register.prototype.setAllBusy = function (value) {
        this.busy.fill(value);
    };
    Register.prototype.setAllContent = function (value) {
        this.content.fill(value);
        this.setAllBusy(false);
    };
    Register.prototype.tic = function () {
        for (var i = 0; i < Register.REGISTRY_NUMBER; i++) {
            if (this.busy[i]) {
                this.busy[i] = false;
                this.content[i] = this.bufferIn[i];
            }
        }
    };
    Register.REGISTRY_NUMBER = Constants_1.MACHINE_REGISTER_SIZE;
    return Register;
}());
exports.Register = Register;
//# sourceMappingURL=Register.js.map