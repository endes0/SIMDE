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
ava_1.test('Bucle4.pla is executed properly', function (t) {
    var inputVLIW = "18\n    2\t0 0 0 0\t2 0 1 0\n    3\t1 0 0 0\t4 0 1 0\t3 4 0 0\n    2\t5 4 0 0\t6 4 1 0\n    2\t7 4 0 0\t8 4 1 0\n    2\t9 4 0 0\t10 4 1 0\n    2\t11 4 0 0\t12 4 1 0\n    2\t13 2 0 0\t14 2 1 0\n    2\t15 2 0 0\t16 2 1 0\n    2\t17 2 0 0\t18 2 1 0\n    2\t19 2 0 0\t20 2 1 0\n    2\t21 4 0 0\t22 4 1 0\n    2\t23 4 0 0\t24 4 1 0\n    2\t25 4 0 0\t26 4 1 0\n    2\t27 4 0 0\t28 4 1 0\n    1\t29 0 0 0\n    0\n    1\t31 5 0 0 2 1 2\n    1\t30 0 0 0";
    var inputSuperescalar = "32\n\tADDI\tR2 R0 #50\n\tADDI\tR3 R0 #70\n\tADDI\tR4 R0 #40\n\tLF\tF0 (R4)\n\tADDI\tR5 R2 #16\nLOOP:\n\tLF \tF1 (R2)\n\tLF \tF2 1(R2)\n\tLF\tF3 2(R2)\n\tLF\tF4 3(R2)\n\tLF \tF5 4(R2)\n\tLF \tF6 5(R2)\n\tLF\tF7 6(R2)\n\tLF\tF8 7(R2)\n\tADDF\tF1 F1 F0\n\tADDF\tF2 F2 F0\n\tADDF\tF3 F3 F0\n\tADDF\tF4 F4 F0\n\tADDF\tF5 F5 F0\n\tADDF\tF6 F6 F0\n\tADDF\tF7 F7 F0\n\tADDF\tF8 F8 F0\n\tSF\tF1 (R3)\n\tSF\tF2 1(R3)\n\tSF\tF3 2(R3)\n\tSF\tF4 3(R3)\n\tSF\tF5 4(R3)\n\tSF\tF6 5(R3)\n\tSF\tF7 6(R3)\n\tSF\tF8 7(R3)\n\tADDI \tR2 R2 #8\n\tADDI\tR3 R3 #8\n\tBNE\tR2 R5 LOOP";
    superescalarCode.load(inputSuperescalar);
    code.load(inputVLIW, superescalarCode);
    vliw.code = code;
    while (vliw.tic() !== VLIWError_1.VLIWError.ENDEXE) { }
    t.deepEqual(vliw.status.cycle, 36, 'Loop4: Bad pc at finish');
});
//# sourceMappingURL=loop4.spec.js.map