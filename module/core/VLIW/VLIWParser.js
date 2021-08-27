import { LargeInstruction } from './LargeInstructions';
import { VLIWOperation } from './VLIWOperation';
var VLIWParser = /** @class */ (function () {
    function VLIWParser() {
    }
    VLIWParser.Parse = function (input, code) {
        var splittedInputInRows = input.split('\n');
        var linesNumber;
        var index;
        var predicate;
        var functionalUnitType;
        var functionalUnitIndex;
        // Let's extract the amount of lines
        linesNumber = +splittedInputInRows[0];
        var instructions = new Array(linesNumber);
        splittedInputInRows.shift();
        if (linesNumber !== splittedInputInRows.length) {
            throw new Error('The lines number does not match the program amount of lines');
        }
        for (var i = 0; i < splittedInputInRows.length; i++) {
            instructions[i] = new LargeInstruction();
            // TODO replace this for the proper regexp
            var splittedRow = splittedInputInRows[i].trim().split(/[\t+|\s+]/);
            var instructionsAmount = +splittedRow.shift();
            if (instructionsAmount > 0) {
                for (var j = 0; j < instructionsAmount; j++) {
                    index = +splittedRow.shift();
                    functionalUnitType = +splittedRow.shift();
                    functionalUnitIndex = +splittedRow.shift();
                    predicate = +splittedRow.shift();
                    if (code.getFunctionalUnitType(index) !== functionalUnitType) {
                        throw new Error("Functional unit type at line " + (i + 1) + " mismatch, expected " + code.getFunctionalUnitType(index) + " got " + functionalUnitType);
                    }
                    var operation = new VLIWOperation(null, code.instructions[index], functionalUnitType, functionalUnitIndex);
                    operation.setPred(predicate);
                    // TODO y el bgt?
                    if (operation.isJump()) {
                        var destiny = void 0;
                        var predTrue = void 0;
                        var predFalse = void 0;
                        destiny = +splittedRow.shift();
                        operation.setOperand(2, destiny, '');
                        predTrue = +splittedRow.shift();
                        predFalse = +splittedRow.shift();
                        operation.setPredTrue(predTrue);
                        operation.setPredFalse(predFalse);
                    }
                    instructions[i].addOperation(operation);
                }
            }
        }
        return instructions;
    };
    VLIWParser.ExportAsString = function (_instructionNumber, _instructions) {
        var outputString;
        outputString += _instructionNumber;
        for (var i = 0; i < _instructionNumber; i++) {
            var operationAmount = _instructions[i].getVLIWOperationsNumber();
            outputString += operationAmount;
            for (var j = 0; j < operationAmount; j++) {
                var operation = _instructions[i].getOperation(j);
                outputString += '\t';
                outputString += operation.id;
                outputString += ' ';
                outputString += operation.getFunctionalUnitType();
                outputString += ' ';
                outputString += operation.getFunctionalUnitType();
                outputString += ' ';
                outputString += operation.getPred();
                if (operation.isJump()) {
                    outputString += ' ';
                    outputString += operation.getOperand(2);
                    outputString += ' ';
                    outputString += operation.getPredTrue();
                    outputString += ' ';
                    outputString += operation.getPredFalse();
                }
            }
            outputString += '\n';
        }
        return outputString;
    };
    return VLIWParser;
}());
export { VLIWParser };
//# sourceMappingURL=VLIWParser.js.map