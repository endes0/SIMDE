"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateIntervalFromImput(input, max) {
    var newInterval = new Set();
    if (!input) {
        throw new Error('noEmptyInput');
    }
    input.split(',').map(function (value) {
        if (value.includes('-')) {
            var range = value.split('-');
            var num1 = parseInt(range[0]);
            var num2 = parseInt(range[1]);
            if (isNaN(num1) || isNaN(num2)) {
                throw new Error('noInputNumber');
            }
            if (num1 >= max || num2 >= max) {
                throw new Error("inputOutOfRange");
            }
            if (num1 >= max) {
                num1 = max - 1;
            }
            if (num2 >= max) {
                num2 = max - 1;
            }
            if (num1 < num2) {
                for (; num1 <= num2; num1++) {
                    newInterval.add(num1);
                }
            }
            else {
                for (; num2 <= num1; num2++) {
                    newInterval.add(num2);
                }
            }
        }
        else {
            var num = parseInt(value);
            if (isNaN(num)) {
                throw new Error('noInputNumber');
            }
            if (num >= max) {
                throw new Error("inputOutOfRange");
            }
            newInterval.add(num);
        }
    });
    return Array.from(newInterval);
}
exports.generateIntervalFromImput = generateIntervalFromImput;
function generateRangeArray(size) {
    if (size < 0) {
        throw new Error('Invalid array range');
    }
    var range = [];
    for (var i = 0; i < size; i++) {
        range.push(i);
    }
    return range;
}
exports.generateRangeArray = generateRangeArray;
//# sourceMappingURL=interval.js.map