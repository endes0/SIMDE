"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Lexer_1 = require("./Lexer");
var Opcodes_1 = require("./Opcodes");
var FunctionalUnit_1 = require("./FunctionalUnit");
var Parser = /** @class */ (function () {
    /*
    * PARSE STEPS
    */
    function Parser(_lexer, checkLexema) {
        this._lexer = _lexer;
        this.checkLexema = checkLexema;
    }
    Parser.opcodeToFunctionalUnitType = function (opcode) {
        /* tslint:disable:ter-indent */
        switch (opcode) {
            case Opcodes_1.Opcodes.ADD:
            case Opcodes_1.Opcodes.ADDI:
            case Opcodes_1.Opcodes.SUB:
            case Opcodes_1.Opcodes.OR:
            case Opcodes_1.Opcodes.AND:
            case Opcodes_1.Opcodes.NOR:
            case Opcodes_1.Opcodes.XOR:
            case Opcodes_1.Opcodes.SLLV:
            case Opcodes_1.Opcodes.SRLV: return FunctionalUnit_1.FunctionalUnitType.INTEGERSUM;
            case Opcodes_1.Opcodes.ADDF:
            case Opcodes_1.Opcodes.SUBF: return FunctionalUnit_1.FunctionalUnitType.FLOATINGSUM;
            case Opcodes_1.Opcodes.MULT: return FunctionalUnit_1.FunctionalUnitType.INTEGERMULTIPLY;
            case Opcodes_1.Opcodes.MULTF: return FunctionalUnit_1.FunctionalUnitType.FLOATINGMULTIPLY;
            case Opcodes_1.Opcodes.SW:
            case Opcodes_1.Opcodes.SF:
            case Opcodes_1.Opcodes.LW:
            case Opcodes_1.Opcodes.LF: return FunctionalUnit_1.FunctionalUnitType.MEMORY;
            case Opcodes_1.Opcodes.BNE:
            case Opcodes_1.Opcodes.BEQ:
            case Opcodes_1.Opcodes.BGT: return FunctionalUnit_1.FunctionalUnitType.JUMP;
            default: return FunctionalUnit_1.FunctionalUnitType.INTEGERSUM;
        }
        /* tslint:enable:ter-indent */
    };
    Parser.prototype.parseNooP = function (instruction) {
        instruction.setOperand(0, 0, '');
        instruction.setOperand(1, 0, '');
        instruction.setOperand(2, 0, '');
    };
    Parser.prototype.parseOperationWithTwoGeneralRegisters = function (index, instruction) {
        var lexema = this._lexer.lex();
        this.checkLexema(lexema, Lexer_1.LEX.REGGP, index);
        instruction.setOperand(0, this.stringToRegister(lexema.yytext), lexema.yytext);
        lexema = this._lexer.lex();
        this.checkLexema(lexema, Lexer_1.LEX.REGGP, index);
        instruction.setOperand(1, this.stringToRegister(lexema.yytext), lexema.yytext);
        lexema = this._lexer.lex();
        this.checkLexema(lexema, Lexer_1.LEX.REGGP, index);
        instruction.setOperand(2, this.stringToRegister(lexema.yytext), lexema.yytext);
    };
    Parser.prototype.parseOperationWithTwoFloatingRegisters = function (index, instruction) {
        var lexema = this._lexer.lex();
        this.checkLexema(lexema, Lexer_1.LEX.REGFP, index);
        instruction.setOperand(0, this.stringToRegister(lexema.yytext), lexema.yytext);
        lexema = this._lexer.lex();
        this.checkLexema(lexema, Lexer_1.LEX.REGFP, index);
        instruction.setOperand(1, this.stringToRegister(lexema.yytext), lexema.yytext);
        lexema = this._lexer.lex();
        this.checkLexema(lexema, Lexer_1.LEX.REGFP, index);
        instruction.setOperand(2, this.stringToRegister(lexema.yytext), lexema.yytext);
    };
    Parser.prototype.parseOperationWithGeneralRegisterAndInmediate = function (index, instruction) {
        var lexema = this._lexer.lex();
        this.checkLexema(lexema, Lexer_1.LEX.REGGP, index);
        instruction.setOperand(0, this.stringToRegister(lexema.yytext), lexema.yytext);
        lexema = this._lexer.lex();
        this.checkLexema(lexema, Lexer_1.LEX.REGGP, index);
        instruction.setOperand(1, this.stringToRegister(lexema.yytext), lexema.yytext);
        lexema = this._lexer.lex();
        this.checkLexema(lexema, Lexer_1.LEX.INMEDIATE, index);
        instruction.setOperand(2, this.stringToInmediate(lexema.yytext), lexema.yytext);
    };
    Parser.prototype.parseGeneralLoadStoreOperation = function (index, instruction) {
        var lexema = this._lexer.lex();
        this.checkLexema(lexema, Lexer_1.LEX.REGGP, index);
        instruction.setOperand(0, this.stringToRegister(lexema.yytext), lexema.yytext);
        lexema = this._lexer.lex();
        this.checkLexema(lexema, Lexer_1.LEX.ADDRESS, index);
        var result = this.stringToAddress(lexema.yytext);
        instruction.setOperand(1, result[0], lexema.yytext);
        instruction.setOperand(2, result[1], '');
    };
    Parser.prototype.parseFloatingLoadStoreOperation = function (index, instruction) {
        var lexema = this._lexer.lex();
        this.checkLexema(lexema, Lexer_1.LEX.REGFP, index);
        instruction.setOperand(0, this.stringToRegister(lexema.yytext), lexema.yytext);
        lexema = this._lexer.lex();
        this.checkLexema(lexema, Lexer_1.LEX.ADDRESS, index);
        var result2 = this.stringToAddress(lexema.yytext);
        instruction.setOperand(1, result2[0], lexema.yytext);
        instruction.setOperand(2, result2[1], '');
    };
    Parser.prototype.parseJumpOperation = function (index, instruction, actual, checkLabel) {
        var lexema = this._lexer.lex();
        this.checkLexema(lexema, Lexer_1.LEX.REGGP, index);
        instruction.setOperand(0, this.stringToRegister(lexema.yytext), lexema.yytext);
        lexema = this._lexer.lex();
        this.checkLexema(lexema, Lexer_1.LEX.REGGP, index);
        instruction.setOperand(1, this.stringToRegister(lexema.yytext), lexema.yytext);
        lexema = this._lexer.lex();
        this.checkLexema(lexema, Lexer_1.LEX.ID, index);
        instruction.setOperand(2, checkLabel(lexema.yytext, actual), lexema.yytext);
    };
    Parser.prototype.stringToOpcode = function (stringOpcode) {
        var opcode = Opcodes_1.OpcodesNames.indexOf(stringOpcode);
        if (opcode !== -1) {
            return opcode;
        }
        else {
            return Opcodes_1.Opcodes.OPERROR;
        }
    };
    Parser.prototype.stringToAddress = function (stringAddress) {
        var result = new Array(2);
        var position = stringAddress.indexOf('(');
        if (position === 0) {
            result[0] = 0;
        }
        else {
            result[0] = +stringAddress.substring(0, position);
        }
        result[1] = this.stringToRegister(stringAddress.substr(position + 1, stringAddress.length - position - 2));
        return result;
    };
    Parser.prototype.stringToRegister = function (stringRegister) {
        return +stringRegister.substring(1, stringRegister.length);
    };
    Parser.prototype.stringToInmediate = function (stringInmediate) {
        return +stringInmediate.substring(1, stringInmediate.length);
    };
    return Parser;
}());
exports.Parser = Parser;
//# sourceMappingURL=Parser.js.map