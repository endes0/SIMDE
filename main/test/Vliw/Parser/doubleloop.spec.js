"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var VLIWCode_1 = require("../../../core/VLIW/VLIWCode");
var Code_1 = require("../../../core/Common/Code");
var FunctionalUnit_1 = require("../../../core/Common/FunctionalUnit");
var code;
var superescalarCode;
ava_1.test.beforeEach('Setup machine', function () {
    code = new VLIWCode_1.VLIWCode();
    superescalarCode = new Code_1.Code();
});
ava_1.test('Doubleloop.pla is executed properly', function (t) {
    var inputVLIW = "10\n    2\t0 0 0 0\t2 0 1 0\n    3\t1 0 0 0\t4 0 1 0\t3 4 0 0\n    1\t5 4 0 0\n    0\n    1\t8 0 0 0\n    1\t6 2 0 0\n    0\n    0\n    0\n    3\t9 0 0 0\t7 4 0 0\t10 5 0 0 2 1 2";
    var inputSuperescalar = "18\n\tADDI\tR2 R0 #50\n\tADDI\tR3 R0 #70\n\tADDI\tR4 R0 #40\n\tLF\tF0 (R4)\n\tADDI\tR5 R2 #5\nLOOP:\n\tLF \tF1 (R2)\n\tADDF\tF1 F1 F0\n\tSF\t\tF1 (R3)\n\tADDI \tR2 R2 #1\n\tADDI\tR3 R3 #1\n\tBNE\tR2 R5 LOOP\n\tADDI\tR3 R0 #70\n\tADDI\tR5 R3 #5\nLOOP2:\n\tLF\t\tF1 (R3)\n\tMULTF\tF1 F1 F0\n\tSF\t\tF1 (R3)\n\tADDI\tR3 R3 #1\n\tBNE\tR3 R5 LOOP2";
    superescalarCode.load(inputSuperescalar);
    code.load(inputVLIW, superescalarCode);
    // First Largue Instruction
    t.deepEqual(code.getLargeInstructionNumber(), 10, 'Instruction number was not parsed properly');
    t.deepEqual(code.getLargeInstruction(0).getOperation(0).getOperand(2), 50);
    t.deepEqual(code.getLargeInstruction(0).getOperation(0).getFunctionalUnitType(), FunctionalUnit_1.FunctionalUnitType.INTEGERSUM, 'Functional unit type bad parsed');
    t.deepEqual(code.getLargeInstruction(0).getOperation(0).getFunctionalUnitIndex(), 0, 'Functional unit type bad parsed');
    t.deepEqual(code.getLargeInstruction(0).getOperation(0).getPred(), 0, 'Predicate not parsed properly');
    t.deepEqual(code.getLargeInstruction(0).getOperation(1).getOperand(2), 40);
    t.deepEqual(code.getLargeInstruction(0).getOperation(1).getFunctionalUnitType(), FunctionalUnit_1.FunctionalUnitType.INTEGERSUM, 'Functional unit type bad parsed');
    t.deepEqual(code.getLargeInstruction(0).getOperation(1).getFunctionalUnitIndex(), 1, 'Functional unit type bad parsed');
    t.deepEqual(code.getLargeInstruction(0).getOperation(1).getPred(), 0, 'Predicate not parsed properly');
    // Second Largue Instruction
    t.deepEqual(code.getLargeInstruction(1).getOperation(0).getOperand(2), 70);
    t.deepEqual(code.getLargeInstruction(1).getOperation(0).getFunctionalUnitType(), FunctionalUnit_1.FunctionalUnitType.INTEGERSUM, 'Functional unit type bad parsed');
    t.deepEqual(code.getLargeInstruction(1).getOperation(0).getFunctionalUnitIndex(), 0, 'Functional unit type bad parsed');
    t.deepEqual(code.getLargeInstruction(1).getOperation(0).getPred(), 0, 'Predicate not parsed properly');
    t.deepEqual(code.getLargeInstruction(1).getOperation(1).getOperand(2), 5);
    t.deepEqual(code.getLargeInstruction(1).getOperation(1).getFunctionalUnitType(), FunctionalUnit_1.FunctionalUnitType.INTEGERSUM, 'Functional unit type bad parsed');
    t.deepEqual(code.getLargeInstruction(1).getOperation(1).getFunctionalUnitIndex(), 1, 'Functional unit type bad parsed');
    t.deepEqual(code.getLargeInstruction(1).getOperation(1).getPred(), 0, 'Predicate not parsed properly');
    t.deepEqual(code.getLargeInstruction(9).getOperation(2).getPred(), 0);
    t.deepEqual(code.getLargeInstruction(9).getOperation(2).getOperand(2), 2);
    t.deepEqual(code.getLargeInstruction(9).getOperation(2).getPredTrue(), 1);
    t.deepEqual(code.getLargeInstruction(9).getOperation(2).getPredFalse(), 2);
});
//# sourceMappingURL=doubleloop.spec.js.map