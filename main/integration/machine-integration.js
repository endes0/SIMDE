"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MachineIntegration = /** @class */ (function () {
    function MachineIntegration() {
    }
    MachineIntegration.prototype.calculateSpeed = function () {
        var speed = parseInt(document.getElementById('velocidad').value, 10);
        var defaultStep = 2000;
        return speed ? defaultStep / speed : 0;
    };
    MachineIntegration.prototype.calculateStandardDeviation = function (average, values) {
        var diffs = values.map(function (value) { return value - average; });
        var squareDiffs = diffs.map(function (diff) { return diff * diff; });
        var averageSquareDiff = squareDiffs.reduce(function (a, b) { return a + b; }) / squareDiffs.length;
        return Math.sqrt(averageSquareDiff);
    };
    return MachineIntegration;
}());
exports.MachineIntegration = MachineIntegration;
//# sourceMappingURL=machine-integration.js.map