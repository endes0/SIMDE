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
ava_1.test('multiwayvliw.pla is executed properly', function (t) {
    var inputVLIW = "11\n    2\t0 0 0 0\t1 0 1 0\n    3\t2 0 0 0\t3 4 0 0\t4 4 1 0\n    0\n    0\n    1\t5 5 0 0 6 1 2\n    2\t6 2 0 2\t8 5 0 1 7 3 4\n    2\t9 2 0 4\t11 2 1 3\n    0\n    0\n    0\n    1\t12 4 0 0";
    var inputSuperescalar = "13\n        ADDI\tR10, R0, #10\n        ADDI\tR1, R0, #0\n        ADDI\tR2, R0, #1\n        LF\t\t\tF1, 0(R10)\n        LF\t\t\tF2, 1(R10)\n        BNE\t\tR32, R1, A\n        ADDF\t\tF3, F1, F0\n        BEQ\t\tR0, R0, FIN\n    A:\n        BNE\t\tR32, R2, B\n        ADDF\t\tF3, F2, F0\n        BEQ\t\tR0, R0, FIN\n    B:\n        ADDF\t\tF3, F2, F1\n    FIN:\n        SF\t\t\tF3, 2(R10)";
    superescalarCode.load(inputSuperescalar);
    code.load(inputVLIW, superescalarCode);
    vliw.code = code;
    while (vliw.tic() !== VLIWError_1.VLIWError.ENDEXE) { }
    t.deepEqual(vliw.status.cycle, 16, 'multiwayvliw: Bad pc at finish');
});
//# sourceMappingURL=multiwayvliw.spec.js.map