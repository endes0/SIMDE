"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Label = /** @class */ (function () {
    function Label() {
    }
    Object.defineProperty(Label.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Label.prototype, "blocks", {
        get: function () {
            return this._blocks;
        },
        set: function (value) {
            this._blocks = value;
        },
        enumerable: true,
        configurable: true
    });
    return Label;
}());
exports.Label = Label;
//# sourceMappingURL=Label.js.map