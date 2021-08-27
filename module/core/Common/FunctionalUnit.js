import { Status } from './Status';
export var FunctionalUnitType;
(function (FunctionalUnitType) {
    FunctionalUnitType[FunctionalUnitType["INTEGERSUM"] = 0] = "INTEGERSUM";
    FunctionalUnitType[FunctionalUnitType["INTEGERMULTIPLY"] = 1] = "INTEGERMULTIPLY";
    FunctionalUnitType[FunctionalUnitType["FLOATINGSUM"] = 2] = "FLOATINGSUM";
    FunctionalUnitType[FunctionalUnitType["FLOATINGMULTIPLY"] = 3] = "FLOATINGMULTIPLY";
    FunctionalUnitType[FunctionalUnitType["MEMORY"] = 4] = "MEMORY";
    FunctionalUnitType[FunctionalUnitType["JUMP"] = 5] = "JUMP";
})(FunctionalUnitType || (FunctionalUnitType = {}));
export var FUNCTIONALUNITTYPESQUANTITY = FunctionalUnitType.JUMP - FunctionalUnitType.INTEGERSUM + 1;
var FunctionalUnit = /** @class */ (function () {
    function FunctionalUnit() {
        this._flow = null;
        this._status = new Status();
        this._status.lastInstruction = 0;
        this._status.stall = 0;
        this._status.instructionNumber = 0;
    }
    Object.defineProperty(FunctionalUnit.prototype, "status", {
        get: function () {
            return this._status;
        },
        set: function (value) {
            this._status = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FunctionalUnit.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            this._type = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FunctionalUnit.prototype, "latency", {
        get: function () {
            return this._latency;
        },
        set: function (value) {
            this._latency = value;
            this._status.lastInstruction = value - 1;
            this._status.instructionNumber = 0;
            this._flow = new Array(value);
            this._flow.fill(null);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FunctionalUnit.prototype, "flow", {
        get: function () {
            return this._flow;
        },
        set: function (value) {
            this._flow = value;
        },
        enumerable: true,
        configurable: true
    });
    FunctionalUnit.prototype.tic = function () {
        if (this._status.stall === 0) {
            if (this._flow[this._status.lastInstruction] != null) {
                this._flow[this._status.lastInstruction] = null;
                this._status.instructionNumber--;
            }
            this._status.lastInstruction = (this._latency + this._status.lastInstruction - 1) % this._latency;
        }
        else {
            this._status.stall--;
        }
    };
    FunctionalUnit.prototype.fillFlow = function (instruction) {
        this._flow[(this._status.lastInstruction + 1) % this._latency] = instruction;
        if (instruction != null) {
            this._status.instructionNumber++;
        }
        return (this._status.lastInstruction + 1) % this._latency;
    };
    FunctionalUnit.prototype.clean = function () {
        this._flow = new Array(this._latency);
        this._flow.fill(null);
        this._status.lastInstruction = this._latency - 1;
        this._status.stall = 0;
        this._status.instructionNumber = 0;
    };
    FunctionalUnit.prototype.isFree = function () {
        return (this.flow[(this.status.lastInstruction + 1) % this.latency] == null);
    };
    FunctionalUnit.prototype.hasPendingInstruction = function () {
        return (this._status.instructionNumber !== 0);
    };
    FunctionalUnit.prototype.getTopInstruction = function () {
        return this._flow[this._status.lastInstruction];
    };
    FunctionalUnit.prototype.getInstructionByIndex = function (index) {
        return this._flow[(this._status.lastInstruction + index + 1) % this._latency];
    };
    FunctionalUnit.prototype.getLast = function () {
        return this._status.lastInstruction;
    };
    return FunctionalUnit;
}());
export { FunctionalUnit };
//# sourceMappingURL=FunctionalUnit.js.map