import { randomNumber } from '../Utils/Random';
import { MEMORY_SIZE } from '../Constants';
var Memory = /** @class */ (function () {
    function Memory() {
        this.data = new Array(Memory.MEMORY_NUMBER);
        this.fail = new Array(Memory.MEMORY_NUMBER);
        this.failProbability = 0;
    }
    Memory.prototype.getDatum = function (address) {
        if (address < 0) {
            address = 0;
        }
        var valueToReturn = {
            datum: this.data[address],
            got: true
        };
        var failValue = randomNumber(100);
        // There will be a fail only if there wasn't a previous fail on the same position
        if ((failValue < this.failProbability) && !this.fail[address]) {
            this.fail[address] = true;
            valueToReturn.got = false;
            return valueToReturn;
        }
        this.fail[address] = true;
        return valueToReturn;
    };
    Memory.prototype.setDatum = function (address, value) {
        if (address < 0) {
            address = 0;
        }
        this.data[address] = value;
    };
    Memory.prototype.setMem = function (datum) {
        this.data.fill(datum);
    };
    Object.defineProperty(Memory.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Memory.prototype, "fail", {
        get: function () {
            return this._fail;
        },
        set: function (value) {
            this._fail = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Memory.prototype, "failProbability", {
        get: function () {
            return this._failProbability;
        },
        set: function (value) {
            this._failProbability = value;
        },
        enumerable: true,
        configurable: true
    });
    Memory.MEMORY_NUMBER = MEMORY_SIZE;
    return Memory;
}());
export { Memory };
//# sourceMappingURL=Memory.js.map