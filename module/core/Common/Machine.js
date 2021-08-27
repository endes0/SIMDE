import { Register } from './Register';
import { FunctionalUnit, FUNCTIONALUNITTYPESQUANTITY, FunctionalUnitType } from './FunctionalUnit';
import { Memory } from './Memory';
import { MachineStatus } from './MachineStatus';
import { MACHINE_REGISTER_SIZE } from '../Constants';
var Machine = /** @class */ (function () {
    function Machine() {
        this.functionalUnitLatencies = Machine.LAT_DEF.slice();
        this.functionalUnitNumbers = Machine.NUF_DEF.slice();
        this.memoryFailLatency = Machine.MEMORYFAILLATENCYDEF;
        // Init val
        this.status = new MachineStatus();
        this.memory = new Memory();
        this._gpr = new Register();
        this._fpr = new Register();
        this.functionalUnit = new Array(FUNCTIONALUNITTYPESQUANTITY);
        this.functionalUnit.fill(null);
        // this.init(true);
    }
    Machine.prototype.init = function (reset) {
        this.pc = 0;
        this.functionalUnit.fill(null);
        for (var i = 0; i < FUNCTIONALUNITTYPESQUANTITY; i++) {
            this.functionalUnit[i] = new Array(this._functionalUnitNumbers[i]);
            for (var j = 0; j < this.functionalUnitNumbers[i]; j++) {
                this.functionalUnit[i][j] = new FunctionalUnit();
                this.functionalUnit[i][j].type = FunctionalUnitType[FunctionalUnitType[i]];
                this.functionalUnit[i][j].latency = this.functionalUnitLatencies[i];
            }
        }
        this.status.cycle = 0;
        this.status.breakPoint = false;
        this.status.executing = false;
        if (reset) {
            this.reset();
        }
    };
    Machine.prototype.execute = function () {
        this.status.executing = true;
        this.status.breakPoint = false;
    };
    Machine.prototype.stop = function () {
        this.status.executing = false;
    };
    Machine.prototype.reset = function () {
        this._gpr.content.fill(0);
        this._fpr.content.fill(0);
        this.memory.setMem(0);
        this.memory.fail.fill(false);
    };
    Machine.prototype.getTotalFunctionalUnit = function () {
        var sum = 0;
        for (var i = 0; i < FUNCTIONALUNITTYPESQUANTITY; i++) {
            sum += this.functionalUnitNumbers[i];
        }
        return sum;
    };
    Object.defineProperty(Machine.prototype, "functionalUnitNumbers", {
        get: function () {
            return this._functionalUnitNumbers;
        },
        set: function (value) {
            this._functionalUnitNumbers = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Machine.prototype, "functionalUnitLatencies", {
        get: function () {
            return this._functionalUnitLatencies;
        },
        set: function (value) {
            this._functionalUnitLatencies = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Machine.prototype, "memoryFailLatency", {
        get: function () {
            return this._memoryFailLatency;
        },
        set: function (value) {
            this._memoryFailLatency = value;
        },
        enumerable: true,
        configurable: true
    });
    Machine.prototype.getGpr = function (index) {
        return (index >= Machine.NGP || index < 0) ? -1 : this._gpr.getContent(index);
    };
    Machine.prototype.setGpr = function (index, value) {
        if (index < Machine.NGP && index >= 0) {
            this._gpr.setContent(index, value, false);
        }
    };
    Machine.prototype.getFpr = function (index) {
        return (index >= Machine.NGP || index < 0) ? -1 : this._fpr.getContent(index);
    };
    Machine.prototype.setFpr = function (index, value) {
        if (index < Machine.NGP && index >= 0) {
            this._fpr.setContent(index, value, false);
        }
    };
    Object.defineProperty(Machine.prototype, "functionalUnit", {
        get: function () {
            return this._functionalUnit;
        },
        set: function (value) {
            this._functionalUnit = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Machine.prototype, "memory", {
        get: function () {
            return this._memory;
        },
        set: function (value) {
            this._memory = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Machine.prototype, "pc", {
        get: function () {
            return this._pc;
        },
        set: function (value) {
            this._pc = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Machine.prototype, "status", {
        get: function () {
            return this._status;
        },
        set: function (value) {
            this._status = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Machine.prototype, "gpr", {
        get: function () {
            return this._gpr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Machine.prototype, "fpr", {
        get: function () {
            return this._fpr;
        },
        enumerable: true,
        configurable: true
    });
    Machine.prototype.setFunctionalUnitNumber = function (index, quantity) {
        this.functionalUnitNumbers[index] = quantity;
    };
    Machine.prototype.setFunctionalUnitLatency = function (index, latency) {
        this.functionalUnitLatencies[index] = latency;
    };
    // Const properties
    Machine.LAT_MAX = [100, 100, 100, 100, 100, 100];
    Machine.LAT_MIN = [1, 1, 1, 1, 1, 1];
    Machine.LAT_DEF = [1, 2, 4, 6, 4, 2];
    Machine.NUF_MAX = [10, 10, 10, 10, 10, 10];
    Machine.NUF_MIN = [1, 1, 1, 1, 1, 1];
    Machine.NUF_DEF = [2, 2, 2, 2, 2, 1];
    Machine.MEMORYFAILLATENCYDEF = 9;
    Machine.MEMORYFAILLATENCYMIN = 0;
    Machine.MEMORYFAILLATENCYMAX = 100;
    Machine.WORD_SIZE = 32;
    Machine.NGP = MACHINE_REGISTER_SIZE;
    Machine.NFP = MACHINE_REGISTER_SIZE;
    return Machine;
}());
export { Machine };
//# sourceMappingURL=Machine.js.map