import { LEX } from './Lexer';
import { Opcodes, OpcodesNames } from './Opcodes';
import { FunctionalUnitType } from './FunctionalUnit';
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
            case Opcodes.ADD:
            case Opcodes.ADDI:
            case Opcodes.SUB:
            case Opcodes.OR:
            case Opcodes.AND:
            case Opcodes.NOR:
            case Opcodes.XOR:
            case Opcodes.SLLV:
            case Opcodes.SRLV: return FunctionalUnitType.INTEGERSUM;
            case Opcodes.ADDF:
            case Opcodes.SUBF: return FunctionalUnitType.FLOATINGSUM;
            case Opcodes.MULT: return FunctionalUnitType.INTEGERMULTIPLY;
            case Opcodes.MULTF: return FunctionalUnitType.FLOATINGMULTIPLY;
            case Opcodes.SW:
            case Opcodes.SF:
            case Opcodes.LW:
            case Opcodes.LF: return FunctionalUnitType.MEMORY;
            case Opcodes.BNE:
            case Opcodes.BEQ:
            case Opcodes.BGT: return FunctionalUnitType.JUMP;
            default: return FunctionalUnitType.INTEGERSUM;
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
        this.checkLexema(lexema, LEX.REGGP, index);
        instruction.setOperand(0, this.stringToRegister(lexema.yytext), lexema.yytext);
        lexema = this._lexer.lex();
        this.checkLexema(lexema, LEX.REGGP, index);
        instruction.setOperand(1, this.stringToRegister(lexema.yytext), lexema.yytext);
        lexema = this._lexer.lex();
        this.checkLexema(lexema, LEX.REGGP, index);
        instruction.setOperand(2, this.stringToRegister(lexema.yytext), lexema.yytext);
    };
    Parser.prototype.parseOperationWithTwoFloatingRegisters = function (index, instruction) {
        var lexema = this._lexer.lex();
        this.checkLexema(lexema, LEX.REGFP, index);
        instruction.setOperand(0, this.stringToRegister(lexema.yytext), lexema.yytext);
        lexema = this._lexer.lex();
        this.checkLexema(lexema, LEX.REGFP, index);
        instruction.setOperand(1, this.stringToRegister(lexema.yytext), lexema.yytext);
        lexema = this._lexer.lex();
        this.checkLexema(lexema, LEX.REGFP, index);
        instruction.setOperand(2, this.stringToRegister(lexema.yytext), lexema.yytext);
    };
    Parser.prototype.parseOperationWithGeneralRegisterAndInmediate = function (index, instruction) {
        var lexema = this._lexer.lex();
        this.checkLexema(lexema, LEX.REGGP, index);
        instruction.setOperand(0, this.stringToRegister(lexema.yytext), lexema.yytext);
        lexema = this._lexer.lex();
        this.checkLexema(lexema, LEX.REGGP, index);
        instruction.setOperand(1, this.stringToRegister(lexema.yytext), lexema.yytext);
        lexema = this._lexer.lex();
        this.checkLexema(lexema, LEX.INMEDIATE, index);
        instruction.setOperand(2, this.stringToInmediate(lexema.yytext), lexema.yytext);
    };
    Parser.prototype.parseGeneralLoadStoreOperation = function (index, instruction) {
        var lexema = this._lexer.lex();
        this.checkLexema(lexema, LEX.REGGP, index);
        instruction.setOperand(0, this.stringToRegister(lexema.yytext), lexema.yytext);
        lexema = this._lexer.lex();
        this.checkLexema(lexema, LEX.ADDRESS, index);
        var result = this.stringToAddress(lexema.yytext);
        instruction.setOperand(1, result[0], lexema.yytext);
        instruction.setOperand(2, result[1], '');
    };
    Parser.prototype.parseFloatingLoadStoreOperation = function (index, instruction) {
        var lexema = this._lexer.lex();
        this.checkLexema(lexema, LEX.REGFP, index);
        instruction.setOperand(0, this.stringToRegister(lexema.yytext), lexema.yytext);
        lexema = this._lexer.lex();
        this.checkLexema(lexema, LEX.ADDRESS, index);
        var result2 = this.stringToAddress(lexema.yytext);
        instruction.setOperand(1, result2[0], lexema.yytext);
        instruction.setOperand(2, result2[1], '');
    };
    Parser.prototype.parseJumpOperation = function (index, instruction, actual, checkLabel) {
        var lexema = this._lexer.lex();
        this.checkLexema(lexema, LEX.REGGP, index);
        instruction.setOperand(0, this.stringToRegister(lexema.yytext), lexema.yytext);
        lexema = this._lexer.lex();
        this.checkLexema(lexema, LEX.REGGP, index);
        instruction.setOperand(1, this.stringToRegister(lexema.yytext), lexema.yytext);
        lexema = this._lexer.lex();
        this.checkLexema(lexema, LEX.ID, index);
        instruction.setOperand(2, checkLabel(lexema.yytext, actual), lexema.yytext);
    };
    Parser.prototype.stringToOpcode = function (stringOpcode) {
        var opcode = OpcodesNames.indexOf(stringOpcode);
        if (opcode !== -1) {
            return opcode;
        }
        else {
            return Opcodes.OPERROR;
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
export { Parser };
//# sourceMappingURL=Parser.js.map