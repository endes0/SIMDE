"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var FunctionalUnit_1 = require("../core/Common/FunctionalUnit");
var Instruction_1 = require("../core/Common/Instruction");
var functionalUnit;
var instructions;
ava_1.test.before('Create instructions', function () {
    instructions = new Array(3);
    instructions.fill(new Instruction_1.Instruction());
});
ava_1.test.beforeEach('Setup FunctionalUnit', function () {
    functionalUnit = new FunctionalUnit_1.FunctionalUnit();
    functionalUnit.type = FunctionalUnit_1.FunctionalUnitType.INTEGERSUM;
    functionalUnit.latency = 4;
    instructions.map(function (instruction) { return functionalUnit.fillFlow(instruction); });
});
ava_1.test('It should decrease the stall counter after a tic while stalling', function (t) {
    functionalUnit.status.stall = 2;
    functionalUnit.tic();
    t.deepEqual(functionalUnit.status.stall, 1);
});
ava_1.test('Last instruction should not change if stalling', function (t) {
    var instructionBefore = functionalUnit.status.lastInstruction;
    functionalUnit.status.stall = 2;
    functionalUnit.tic();
    t.deepEqual(functionalUnit.status.lastInstruction, instructionBefore);
});
ava_1.test('Should set appropiate values when filling', function (t) {
    functionalUnit.latency = 4;
    // 0, 1 , 2 <--- 3
    t.deepEqual(functionalUnit.fillFlow(new Instruction_1.Instruction()), 0);
    t.deepEqual(functionalUnit.status.lastInstruction, 3);
});
//# sourceMappingURL=FunctionalUnit.spec.js.map