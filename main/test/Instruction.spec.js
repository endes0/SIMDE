"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var Instruction_1 = require("../core/Common/Instruction");
var originalInstruction;
ava_1.test.beforeEach(function () {
    originalInstruction = new Instruction_1.Instruction();
    originalInstruction.operands = new Array(1, 2, 3);
});
ava_1.test('Copied instructions should not keep the same reference', function (t) {
    var newInstruction = new Instruction_1.Instruction();
    newInstruction.copy(originalInstruction);
    originalInstruction.operands = null;
    t.not(newInstruction.operands, null);
});
//# sourceMappingURL=Instruction.spec.js.map