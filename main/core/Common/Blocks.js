"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BasicBlock = /** @class */ (function () {
    function BasicBlock(_id, _lineNumber, _next, _successor) {
        this._id = _id;
        this._lineNumber = _lineNumber;
        this._next = _next;
        this._successor = _successor;
    }
    Object.defineProperty(BasicBlock.prototype, "lineNumber", {
        get: function () {
            return this._lineNumber;
        },
        set: function (value) {
            this._lineNumber = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasicBlock.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasicBlock.prototype, "next", {
        get: function () {
            return this._next;
        },
        set: function (value) {
            this._next = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasicBlock.prototype, "successor", {
        get: function () {
            return this._successor;
        },
        set: function (value) {
            this._successor = value;
        },
        enumerable: true,
        configurable: true
    });
    return BasicBlock;
}());
exports.BasicBlock = BasicBlock;
var SuccessorBlock = /** @class */ (function () {
    function SuccessorBlock() {
    }
    Object.defineProperty(SuccessorBlock.prototype, "block", {
        get: function () {
            return this._block;
        },
        set: function (value) {
            this._block = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuccessorBlock.prototype, "next", {
        get: function () {
            return this._next;
        },
        set: function (value) {
            this._next = value;
        },
        enumerable: true,
        configurable: true
    });
    return SuccessorBlock;
}());
exports.SuccessorBlock = SuccessorBlock;
//# sourceMappingURL=Blocks.js.map