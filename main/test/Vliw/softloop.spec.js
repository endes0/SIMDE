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
ava_1.test('Buclesoft.pla is executed properly', function (t) {
    var inputVLIW = "18\n    2\t0 0 0 0\t2 0 1 0\n    4\t1 0 0 0\t4 0 1 0\t3 4 0 0\t5 4 1 0\n    0\n    0\n    0\n    2\t6 2 1 0\t7 4 0 0\n    0\n    0\n    1\t8 0 0 0\n    3\t10 2 1 0\t9 4 0 0\t11 4 1 0\n    0\n    0\n    2\t12 0 0 0\t13 0 1 0\n    3\t16 2 1 2\t15 4 0 2\t14 5 0 0 9 1 2\n    0\n    0\n    0\n    1\t17 4 0 0";
    var inputSuperescalar = "18\n\tADDI\tR2 R0 #50\n\tADDI\tR3 R0 #70\n\tADDI\tR4 R0 #40\n\tLF\tF0 (R4)\n\tADDI\tR5 R2 #16\n\tLF\tF1 (R2)\n\tADDF\tF2 F1 F0\n\tLF\tF1 1(R2)\n\tADDI\tR2 R2 #2\nLOOP:\n\tSF\tF2 (R3)\n\tADDF\tF2 F1 F0\n\tLF\tF1 (R2)\n\tADDI\tR2 R2 #1\n\tADDI\tR3 R3 #1\n\tBNE\tR2 R5 LOOP\n\tSF\tF2 (R3)\n\tADDF\tF2 F1 F0\n\tSF\tF2 1(R3)";
    superescalarCode.load(inputSuperescalar);
    code.load(inputVLIW, superescalarCode);
    vliw.code = code;
    while (vliw.tic() !== VLIWError_1.VLIWError.ENDEXE) { }
    t.deepEqual(vliw.status.cycle, 101, 'softloop: Bad pc at finish');
});
//# sourceMappingURL=softloop.spec.js.map