"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Constants_1 = require("../core/Constants");
var ContentIntegration = /** @class */ (function () {
    function ContentIntegration(input) {
        this.input = input;
        this.FPRContent = {};
        this.GPRContent = {};
        this.MEMContent = {};
        this.currentContent = '';
        input = this.normalizeBreakLines(input);
        this.proccessContent(input.split('\n'));
    }
    ContentIntegration.prototype.normalizeBreakLines = function (input) {
        return input.replace(/(?:\r\n|\r)/g, '\n');
    };
    ContentIntegration.prototype.proccessContent = function (lines) {
        this.currentContent = '';
        for (var i = 0; i < lines.length; i++) {
            if (lines[i].match(/^#\w+/)) {
                this.parseContent(lines[i]);
            }
            else if (lines[i].match(/^\[\d+\]/)) {
                this.parseLine(lines[i]);
            }
        }
    };
    ContentIntegration.prototype.parseContent = function (value) {
        switch (value) {
            case '#GPR':
                this.currentContent = 'GPRContent';
                break;
            case '#FPR':
                this.currentContent = 'FPRContent';
                break;
            case '#MEM':
                this.currentContent = 'MEMContent';
                break;
            default:
                throw new Error('Unexpected content type');
        }
    };
    ContentIntegration.prototype.parseLine = function (line) {
        if (this.currentContent === '') {
            throw new Error('The data has no content (MEM, REG) associated');
        }
        var startPosition = +line.match(/\[(\d+)\]/)[1];
        var values = line.split(' ');
        values.shift();
        this.validateInnerBounds(this.currentContent, startPosition, values.length);
        values = values.map(function (v) { return +v; });
        for (var i = 0; i < values.length; i++) {
            this[this.currentContent][startPosition + i] = values[i];
        }
    };
    ContentIntegration.prototype.validateInnerBounds = function (currentContent, startPosition, valuesLength) {
        if (currentContent === 'MEMContent' && startPosition + valuesLength >= Constants_1.MEMORY_SIZE ||
            currentContent !== 'MEMContent' && startPosition + valuesLength >= Constants_1.MACHINE_REGISTER_SIZE) {
            throw new Error('Setted data out of bounds');
        }
    };
    return ContentIntegration;
}());
exports.ContentIntegration = ContentIntegration;
//# sourceMappingURL=content-integration.js.map