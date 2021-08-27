"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var VLIW_1 = require("../../core/VLIW/VLIW");
var VLIWCode_1 = require("../../core/VLIW/VLIWCode");
var Code_1 = require("../../core/Common/Code");
var VLIWError_1 = require("../../core/VLIW/VLIWError");
var vliw;
var code;
var superescalarCode;
ava_1.test.beforeEach('Setup machine', function () {
    vliw = new VLIW_1.VLIW();
    vliw.init(true);
    code = new VLIWCode_1.VLIWCode();
    superescalarCode = new Code_1.Code();
});
ava_1.test('Bucle.pla is executed properly', function (t) {
    var inputVLIW = "15\n    2\t0 0 0 0\t2 0 1 0\n    3\t1 0 0 0\t4 0 1 0\t3 4 0 0\n    1\t5 4 0 0\n    0\n    0\n    0\n    1\t6 2 0 0\n    1\t8 0 0 0\n    0\n    0\n    1\t7 4 1 0\n    0\n    0\n    1\t10 5 0 0 2 1 2\n    1\t9 0 1 0";
    var inputSuperescalar = "11\n\tADDI\tR2 R0 #50\n\tADDI\tR3 R0 #70\n\tADDI\tR4 R0 #40\n\tLF\tF0 (R4)\n\tADDI\tR5 R2 #16\nLOOP:\n\tLF \tF1 (R2)\n\tADDF\tF1 F1 F0\n\tSF\tF1 (R3)\n\tADDI \tR2 R2 #1\n\tADDI\tR3 R3 #1\n\tBNE\tR2 R5 LOOP";
    superescalarCode.load(inputSuperescalar);
    code.load(inputVLIW, superescalarCode);
    vliw.code = code;
    while (vliw.tic() !== VLIWError_1.VLIWError.ENDEXE) { }
    t.deepEqual(vliw.status.cycle, 212, 'Bad pc at finish');
});
//# sourceMappingURL=loop.spec.js.map