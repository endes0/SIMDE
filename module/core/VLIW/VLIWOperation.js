import * as tslib_1 from "tslib";
import { Instruction } from '../Common/Instruction';
import { Opcodes } from '../Common/Opcodes';
var VLIWOperation = /** @class */ (function (_super) {
    tslib_1.__extends(VLIWOperation, _super);
    function VLIWOperation(operation, instruction, type, functionalUnitIndex) {
        var _this = _super.call(this) || this;
        if (operation) {
            _this.buildFromVLIWOperation(operation);
        }
        else if (instruction) {
            _this.buildFromInstruction(instruction, type, functionalUnitIndex);
        }
        else {
            _this._predicate = 0;
            _this._predicateTrue = 0;
            _this._predicateFalse = 0;
        }
        return _this;
    }
    VLIWOperation.prototype.buildFromVLIWOperation = function (operation) {
        this.copy(operation);
        this._functionalUnitType = operation._functionalUnitType;
        this._functionalUnitIndex = operation._functionalUnitIndex;
        this._predicate = operation._predicate;
        this._predicateTrue = operation._predicateTrue;
        this._predicateFalse = operation._predicateFalse;
    };
    VLIWOperation.prototype.buildFromInstruction = function (instruction, functionalUnitType, functionalUnitIndex) {
        this.copy(instruction);
        this._functionalUnitType = functionalUnitType;
        this._functionalUnitIndex = functionalUnitIndex;
        this._predicate = 0;
        this._predicateTrue = 0;
        this._predicateFalse = 0;
    };
    // Getters
    VLIWOperation.prototype.getFunctionalUnitType = function () {
        return this._functionalUnitType;
    };
    VLIWOperation.prototype.getFunctionalUnitIndex = function () {
        return this._functionalUnitIndex;
    };
    VLIWOperation.prototype.getPred = function () {
        return this._predicate;
    };
    VLIWOperation.prototype.getPredTrue = function () {
        return this._predicateTrue;
    };
    VLIWOperation.prototype.getPredFalse = function () {
        return this._predicateFalse;
    };
    // Setters
    VLIWOperation.prototype.setFunctionalUnitType = function (t) {
        this._functionalUnitType = t;
    };
    VLIWOperation.prototype.setFunctionalUnitNumber = function (n) {
        this._functionalUnitIndex = n;
    };
    VLIWOperation.prototype.setPred = function (p) {
        this._predicate = p;
    };
    VLIWOperation.prototype.setPredTrue = function (p) {
        this._predicateTrue = p;
    };
    VLIWOperation.prototype.setPredFalse = function (p) {
        this._predicateFalse = p;
    };
    VLIWOperation.prototype.isJump = function () {
        return (this._opcode === Opcodes.BEQ) || (this._opcode === Opcodes.BGT) || (this._opcode === Opcodes.BNE);
    };
    return VLIWOperation;
}(Instruction));
export { VLIWOperation };
//# sourceMappingURL=VLIWOperation.js.map