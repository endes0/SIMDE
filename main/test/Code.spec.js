"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var Code_1 = require("../core/Common/Code");
var input = "2\nADDI\tR2 R0 #50\nADD     R3 R0 R2\n";
var inputWithComments = "// This is a comment\n// And just another comment\n2\nADDI\tR2 R0 #50\nADD     R3 R0 R2\n";
var input2 = "1\nLF F0 (R4)\n";
var input3 = "3\nLF F1 (R2)\nLOOP:\nADDF F1 F1 F0\nBNE\tR2 R5 LOOP\n";
// =============================
// PARSING ERRORS
// =============================
ava_1.test('Lines are being parsed properly', function (t) {
    var code = new Code_1.Code();
    code.load(input);
    t.deepEqual(2, code.lines, 'Lines message should have been 2');
    code = new Code_1.Code();
    code.load(input2);
    t.deepEqual(1, code.lines, 'Lines message should have been 1');
});
ava_1.test('Commentaries on top should not affect the parsing', function (t) {
    var code = new Code_1.Code();
    code.load(inputWithComments);
    t.deepEqual(2, code.lines, 'Lines message should have been 2');
});
ava_1.test('Parsing operand errors are being thrown', function (t) {
    var input = "3\n        LF F1 (R2)\n        LOOP:\n        ADDF F1 F1 H0\n        BNE\tR2 R5 LOOP\n        ";
    var code = new Code_1.Code();
    var error = t.throws(function () { return code.load(input); });
    t.is(error.message, 'Error at line 4, expected: REGFP got: H0');
});
ava_1.test('Parsing addresses errors are being throw', function (t) {
    var input = "3\n    LF F1 (R-2)\n    LOOP:\n    ADDF F1 F1 F0\n    BNE\tR2 R5 LOOP\n    ";
    var code = new Code_1.Code();
    var error = t.throws(function () { return code.load(input); });
    t.is(error.message, 'Error at line 2, expected: ADDRESS got: R');
});
ava_1.test('Parsing opcodes errors are being thrown', function (t) {
    var input = "3\n    LF F1 (R2)\n    LOOP:\n    ADF F1 F1 F0\n    BNE\tR2 R5 LOOP\n    ";
    var code = new Code_1.Code();
    var error = t.throws(function () { return code.load(input); });
    t.is(error.message, 'Error at line 4 unknown opcode ADF');
});
ava_1.test('Repeated labels errors are being thrown', function (t) {
    var input = "3\n    LF F1 (R2)\n    LOOP:\n    ADDF F1 F1 F0\n    LOOP:\n    BNE\tR2 R5 LOOP\n    ";
    var code = new Code_1.Code();
    var error = t.throws(function () { return code.load(input); });
    t.is(error.message, 'Error at line 5, label LOOP: already exists');
});
ava_1.test('Example code 1 does not throws errors', function (t) {
    var input = "11\n\tADDI\tR2 R0 #50\n\tADDI\tR3 R0 #70\n\tADDI\tR4 R0 #40\n\tLF\tF0 (R4)\n\tADDI\tR5 R2 #16\nLOOP:\n\tLF \tF1 (R2)\n\tADDF\tF1 F1 F0\n\tSF\tF1 (R3)\n\tADDI \tR2 R2 #1\n\tADDI\tR3 R3 #1\n\tBNE\tR2 R5 LOOP\n    ";
    var code = new Code_1.Code();
    var error = t.notThrows(function () { return code.load(input); });
});
ava_1.test('Example code 2 does not throws errors', function (t) {
    var input = "14\n\tADDI\tR2 R0 #50\n\tADDI\tR3 R0 #70\n\tADDI\tR4 R0 #40\n\tLF\tF0 (R4)\n\tADDI\tR5 R2 #16\nLOOP:\n\tLF \tF1 (R2)\n\tLF \tF2 1(R2)\n\tADDF\tF1 F1 F0\n\tADDF\tF2 F2 F0\n\tSF\tF1 (R3)\n\tSF\tF2 1(R3)\n\tADDI \tR2 R2 #2\n\tADDI\tR3 R3 #2\n\tBNE\tR2 R5 LOOP\n    ";
    var code = new Code_1.Code();
    t.notThrows(function () { return code.load(input); });
});
ava_1.test('Example code 3 does not throws errors', function (t) {
    var input = "20\n\tADDI\tR2 R0 #50\n\tADDI\tR3 R0 #70\n\tADDI\tR4 R0 #40\n\tLF\tF0 (R4)\n\tADDI\tR5 R2 #16\nLOOP:\n\tLF \tF1 (R2)\n\tLF \tF2 1(R2)\n\tLF\tF3 2(R2)\n\tLF\tF4 3(R2)\n\tADDF\tF1 F1 F0\n\tADDF\tF2 F2 F0\n\tADDF\tF3 F3 F0\n\tADDF\tF4 F4 F0\n\tSF\tF1 (R3)\n\tSF\tF2 1(R3)\n\tSF\tF3 2(R3)\n\tSF\tF4 3(R3)\n\tADDI \tR2 R2 #4\n\tADDI\tR3 R3 #4\n\tBNE\tR2 R5 LOOP\n    ";
    var code = new Code_1.Code();
    t.notThrows(function () { return code.load(input); });
});
ava_1.test('Example code 4 does not throws errors', function (t) {
    var input = "32\n\tADDI\tR2 R0 #50\n\tADDI\tR3 R0 #70\n\tADDI\tR4 R0 #40\n\tLF\tF0 (R4)\n\tADDI\tR5 R2 #16\nLOOP:\n\tLF \tF1 (R2)\n\tLF \tF2 1(R2)\n\tLF\tF3 2(R2)\n\tLF\tF4 3(R2)\n\tLF \tF5 4(R2)\n\tLF \tF6 5(R2)\n\tLF\tF7 6(R2)\n\tLF\tF8 7(R2)\n\tADDF\tF1 F1 F0\n\tADDF\tF2 F2 F0\n\tADDF\tF3 F3 F0\n\tADDF\tF4 F4 F0\n\tADDF\tF5 F5 F0\n\tADDF\tF6 F6 F0\n\tADDF\tF7 F7 F0\n\tADDF\tF8 F8 F0\n\tSF\tF1 (R3)\n\tSF\tF2 1(R3)\n\tSF\tF3 2(R3)\n\tSF\tF4 3(R3)\n\tSF\tF5 4(R3)\n\tSF\tF6 5(R3)\n\tSF\tF7 6(R3)\n\tSF\tF8 7(R3)\n\tADDI \tR2 R2 #8\n\tADDI\tR3 R3 #8\n\tBNE\tR2 R5 LOOP\n    ";
    var code = new Code_1.Code();
    t.notThrows(function () { return code.load(input); });
});
ava_1.test('Example code 5 does not throws errors', function (t) {
    var input = "18\n\tADDI\tR2 R0 #50\n\tADDI\tR3 R0 #70\n\tADDI\tR4 R0 #40\n\tLF\tF0 (R4)\n\tADDI\tR5 R2 #5\nLOOP:\n\tLF \tF1 (R2)\n\tADDF\tF1 F1 F0\n\tSF\t\tF1 (R3)\n\tADDI \tR2 R2 #1\n\tADDI\tR3 R3 #1\n\tBNE\tR2 R5 LOOP\n\tADDI\tR3 R0 #70\n\tADDI\tR5 R3 #5\nLOOP2:\n\tLF\t\tF1 (R3)\n\tMULTF\tF1 F1 F0\n\tSF\t\tF1 (R3)\n\tADDI\tR3 R3 #1\n\tBNE\tR3 R5 LOOP2\n    ";
    var code = new Code_1.Code();
    t.notThrows(function () { return code.load(input); });
});
ava_1.test('Example code 6 does not throws errors', function (t) {
    var input = "8\n\tADDI\tR1 R0 #1\n\tADDI\tR2 R0 #2\n\tADDI\tR3 R0 #0\n\tADDI\tR4 R0 #5\nLOOP:\n\tMULT\tR5 R1 R2\n\tADDI\tR1 R5 #3\n\tADDI\tR3 R3 #1\n\tBNE\tR3 R4 LOOP\n    ";
    var code = new Code_1.Code();
    t.notThrows(function () { return code.load(input); });
});
ava_1.test('Example code 7 does not throws errors', function (t) {
    var input = "18\n\tADDI\tR2 R0 #50\n\tADDI\tR3 R0 #70\n\tADDI\tR4 R0 #40\n\tLF\tF0 (R4)\n\tADDI\tR5 R2 #16\n// C\u00F3digo de inicializaci\u00F3n\n\tLF\tF1 (R2)\n\tADDF\tF2 F1 F0\n\tLF\tF1 1(R2)\n\tADDI\tR2 R2 #2\nLOOP:\n\tSF\tF2 (R3)\n\tADDF\tF2 F1 F0\n\tLF\tF1 (R2)\n\tADDI\tR2 R2 #1\n\tADDI\tR3 R3 #1\n\tBNE\tR2 R5 LOOP\n// C\u00F3digo de finalizaci\u00F3n\n\tSF\tF2 (R3)\n\tADDF\tF2 F1 F0\n\tSF\tF2 1(R3)\n    ";
    var code = new Code_1.Code();
    t.notThrows(function () { return code.load(input); });
});
ava_1.test('Example code 8 does not throws errors', function (t) {
    var input = "27\n\tADDI\tR2 R0 #50\n\tADDI\tR3 R0 #70\n\tADDI\tR4 R0 #40\n\tLF\tF0 (R4)\n\tADDI\tR5 R2 #16\n// C\u00F3digo de inicializaci\u00F3n\n\tLF\tF1 (R2)\n\tLF\tF3 1(R2)\n\tADDF\tF2 F1 F0\n\tADDF\tF4 F3 F0\n\tLF\tF1 2(R2)\n\tLF\tF3 3(R2)\n\tADDI\tR2 R2 #4\nLOOP:\n\tSF\tF2 (R3)\n\tSF\tF4 1(R3)\n\tADDF\tF2 F1 F0\n\tADDF\tF4 F3 F0\n\tLF\tF1 (R2)\n\tLF\tF3 1(R2)\n\tADDI\tR2 R2 #2\n\tADDI\tR3 R3 #2\n\tBNE\tR2 R5 LOOP\n// C\u00F3digo de finalizaci\u00F3n\n\tSF\tF2 (R3)\n\tSF\tF4 1(R3)\n\tADDF\tF2 F1 F0\n\tADDF\tF4 F3 F0\n\tSF\tF2 2(R3)\n\tSF\tF4 3(R3)\n    ";
    var code = new Code_1.Code();
    t.notThrows(function () { return code.load(input); });
});
ava_1.test('Example code 9 does not throws errors', function (t) {
    var input = "13\n// CODIGO:\n\tADDI\tR10, R0, #10\n\tADDI\tR1, R0, #0\n\tADDI\tR2, R0, #1\n\tLF\t\tF1, 0(R10)\n\tLF\t\tF2, 1(R10)\n\tBNE\t\tR32, R1, A\nA:\n\tADDF\tF3, F1, F0\n\tBEQ\t\tR0, R0, FIN\n\tBNE\t\tR32, R2, B\nB:\n\tADDF\tF3, F2, F0\n\tBEQ\t\tR0, R0, FIN\n\tADDF\tF3, F2, F1\nFIN:\n\tSF\t\tF3, 2(R10)\n    ";
    var code = new Code_1.Code();
    t.notThrows(function () { return code.load(input); });
});
ava_1.test('Example code 10 does not throws errors', function (t) {
    var input = "7\nADDI R2 R0 #3\nBGT R0 R2 ET1\nADDI R3 R0 #2\nET1:\nSUB R4 R3 R2\nBGT R2 R3 ET2\nSUB R5 R2 R3\nET2:\nSUB R6 R2 R3\n    ";
    var code = new Code_1.Code();
    t.notThrows(function () { return code.load(input); });
});
ava_1.test('Example code 11 does not throws errors', function (t) {
    var input = "26\n\tADDI\tR33 R0 #-1\n\tADDI\tR34 R0 #400\n\tADDI\tR1 R0 #-1\n\tADDI\tR2 R0 #10\n// Inicializaci\u00F3n de la pila\n\tADDI\tR31 R0 #500\n// Bucle principal\nINI:\n\tLW\tR3 (R2)\n\tLW\tR4 1(R2)\n// Se guarda el nodo visitado\n\tSW\tR3 (R34)\n\tADDI\tR34 R34 #1\nBUC:\n// Si no tiene hijos es un nodo hoja y no hay que recorrer nada\n\tBEQ\tR4 R0 HOJA\n// Se almacenan los valores del padre y n\u00BA de hijos en la pila\n\tSW\tR1 (R31)\n\tSW\tR4 1(R31)\n\tADDI\tR31 R31 #2\n// Se sustituye el padre por el actual y se carga la direcci\u00F3n del hijo\n\tADDI\tR1 R2 #0\n\tADD\tR5 R2 R4\n\tLW\tR2 1(R5)\n// se vuelve al principio para visitar el hijo\n\tBEQ\tR0 R0 INI\nHOJA:\n// Si al llegar aqu\u00ED se trata de la ra\u00EDz es que hemos terminado de recorrer el \u00E1rbol\n\tBEQ\tR1 R33 FIN\n// Se sustituye al nodo actual por el padre\n\tADDI\tR2 R1 #0\n// Se saca de la pila el valor del padre y el n\u00BA de hijos que quedan por visitar\n\tLW\tR1 -2(R31)\n\tLW\tR4 -1(R31)\n\tADDI\tR31 R31 #-2\n// Se decrementa en 1 el n\u00FAmero de hijos\n\tADDI\tR4 R4 #-1\n// Esta l\u00EDnea no es necesaria, simplemente vuelve a poner en R3 el ID del nodo\n\tLW\tR3 (R2)\n\tBEQ\tR0 R0 BUC\nFIN:\n\t// Operaci\u00F3n nula: Es necesaria porque el simulador exige que todas las etiquetas\n\t// vayan asociadas a una operaci\u00F3n.\n\tADDI\tR0 R0 #0";
    var code = new Code_1.Code();
    t.notThrows(function () { return code.load(input); });
});
//# sourceMappingURL=Code.spec.js.map