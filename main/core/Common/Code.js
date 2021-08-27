"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Instruction_1 = require("./Instruction");
var Blocks_1 = require("./Blocks");
var Lexer_1 = require("./Lexer");
var Label_1 = require("./Label");
var Opcodes_1 = require("./Opcodes");
var Parser_1 = require("./Parser");
var FunctionalUnit_1 = require("./FunctionalUnit");
var Code = /** @class */ (function () {
    function Code() {
        this._labels = new Array();
        this._numberOfBlocks = 0;
        this._basicBlocks = null;
        this._instructions = new Array();
        this._lexer = new Lexer_1.Lexer();
        this._parser = new Parser_1.Parser(this._lexer, this.checkLexema.bind(this));
    }
    Code.prototype.checkLabel = function (str, actual) {
        var index = -1;
        var basicBlock;
        var nextSucessor = new Blocks_1.SuccessorBlock();
        actual.successor = nextSucessor;
        actual.successor.next = null;
        // TODO Why + ':'?
        str += ':';
        for (var i = 0; i < this._labels.length; i++) {
            if (this._labels[i].name === str) {
                index = i;
                i = this._labels.length + 1;
            }
        }
        if (index !== -1) {
            basicBlock = this.labels[index].blocks;
        }
        else {
            basicBlock = new Blocks_1.BasicBlock(null, -1, null, null);
            // Add the label
            var label = new Label_1.Label();
            label.name = str;
            label.blocks = basicBlock;
            this._labels.push(label);
            index = this._labels.length - 1;
        }
        actual.successor.block = basicBlock;
        return index;
    };
    Code.prototype.addLabel = function (str, lineNumber, actual) {
        var index = -1;
        var basicBlock;
        for (var i = 0; i < this._labels.length; i++) {
            if (this._labels[i].name === str) {
                index = i;
                // Break loop
                i = this._labels.length;
            }
        }
        if (index !== -1) {
            basicBlock = this.labels[index].blocks;
            if (basicBlock.lineNumber !== -1) {
                // Repeated label
                basicBlock = null;
            }
            else {
                basicBlock.lineNumber = lineNumber;
                basicBlock.id = this._numberOfBlocks - 1;
                actual.next = basicBlock;
            }
        }
        else {
            // New label, need to create a new basicBlock
            basicBlock = new Blocks_1.BasicBlock(this.numberOfBlocks - 1, lineNumber, null, null);
            var label = new Label_1.Label();
            label.name = str;
            label.blocks = basicBlock;
            this.labels.push(label);
            index = this.labels.length - 1;
            if (this._basicBlocks == null) {
                this._basicBlocks = basicBlock;
            }
            else {
                actual.next = basicBlock;
                var sucessor = new Blocks_1.SuccessorBlock();
                sucessor.block = basicBlock;
                sucessor.next = actual.successor;
                actual.successor = sucessor;
            }
        }
        return basicBlock;
    };
    Code.prototype.replaceLabels = function () {
        for (var i = 0; i < this._lines; i++) {
            if (this.isJump(this._instructions[i].opcode)) {
                var basicBlock = this._labels[this._instructions[i].getOperand(2)].blocks;
                if (basicBlock.lineNumber === -1) {
                    return -1;
                }
                this._instructions[i].setOperand(2, basicBlock.id, '');
            }
        }
    };
    Code.prototype.load = function (input) {
        this._lexer.setInput(input);
        var lexema;
        var actual;
        var newBlock = true;
        // First we need the number of code lines
        lexema = this._lexer.lex();
        if (lexema.value !== Lexer_1.LEX.LINESNUMBER) {
            throw new Error('Error parsing lines number');
        }
        this._lines = +lexema.yytext;
        this.instructions.length = this._lines;
        for (var i = 0; i < this._lines; i++) {
            this.instructions[i] = new Instruction_1.Instruction();
            this.instructions[i].id = i;
            lexema = this._lexer.lex();
            if (lexema.value === Lexer_1.LEX.LABEL) {
                this._numberOfBlocks++;
                this.instructions[i].label = lexema.yytext;
                actual = this.addLabel(lexema.yytext, i, actual);
                if (actual == null) {
                    throw new Error("Error at line " + (i + this.numberOfBlocks) + ", label " + lexema.yytext + " already exists");
                }
                lexema = this._lexer.lex();
            }
            else {
                this.instructions[i].label = '';
                if (newBlock) {
                    this._numberOfBlocks++;
                    var basicBlock = new Blocks_1.BasicBlock(this._numberOfBlocks - 1, i, null, null);
                    if (this._basicBlocks == null) {
                        this._basicBlocks = actual = basicBlock;
                    }
                    else {
                        actual.next = basicBlock;
                        var successor = new Blocks_1.SuccessorBlock();
                        successor.block = basicBlock;
                        successor.next = actual.successor;
                        actual.successor = successor;
                        actual = actual.next;
                    }
                }
            }
            newBlock = false;
            this.checkLexema(lexema, Lexer_1.LEX.ID, i);
            var opcode = this._parser.stringToOpcode(lexema.yytext);
            this._instructions[i].opcode = opcode;
            this._instructions[i].basicBlock = this._numberOfBlocks - 1;
            switch (opcode) {
                case Opcodes_1.Opcodes.NOP:
                    this._parser.parseNooP(this._instructions[i]);
                    break;
                case Opcodes_1.Opcodes.ADD:
                case Opcodes_1.Opcodes.SUB:
                case Opcodes_1.Opcodes.MULT:
                case Opcodes_1.Opcodes.OR:
                case Opcodes_1.Opcodes.AND:
                case Opcodes_1.Opcodes.XOR:
                case Opcodes_1.Opcodes.NOR:
                case Opcodes_1.Opcodes.SLLV:
                case Opcodes_1.Opcodes.SRLV:
                    this._parser.parseOperationWithTwoGeneralRegisters(i, this._instructions[i]);
                    break;
                case Opcodes_1.Opcodes.ADDF:
                case Opcodes_1.Opcodes.SUBF:
                case Opcodes_1.Opcodes.MULTF:
                    this._parser.parseOperationWithTwoFloatingRegisters(i, this._instructions[i]);
                    break;
                case Opcodes_1.Opcodes.ADDI:
                    this._parser.parseOperationWithGeneralRegisterAndInmediate(i, this._instructions[i]);
                    break;
                case Opcodes_1.Opcodes.SW:
                case Opcodes_1.Opcodes.LW:
                    this._parser.parseGeneralLoadStoreOperation(i, this._instructions[i]);
                    break;
                case Opcodes_1.Opcodes.SF:
                case Opcodes_1.Opcodes.LF:
                    this._parser.parseFloatingLoadStoreOperation(i, this._instructions[i]);
                    break;
                case Opcodes_1.Opcodes.BNE:
                case Opcodes_1.Opcodes.BEQ:
                case Opcodes_1.Opcodes.BGT:
                    this._parser.parseJumpOperation(i, this._instructions[i], actual, this.checkLabel.bind(this));
                    newBlock = true;
                    break;
                case Opcodes_1.Opcodes.OPERROR:
                    throw new Error("Error at line " + (i + this.numberOfBlocks + 1) + " unknown opcode " + lexema.yytext);
                default:
                    throw new Error("Error at line " + (i + this.numberOfBlocks + 1) + " unknown opcode " + lexema.yytext);
            }
        }
        this.replaceLabels();
    };
    Code.prototype.checkLexema = function (lexema, expectedLexema, i) {
        if (lexema.value !== expectedLexema) {
            throw new Error("Error at line " + (i + this.numberOfBlocks + 1) + ", expected: " + Lexer_1.LEX[expectedLexema] + " got: " + lexema.yytext);
        }
    };
    Code.prototype.getBasicBlockInstruction = function (basicBlockIndex) {
        if (basicBlockIndex > this._numberOfBlocks) {
            return -1;
        }
        var actual = this._basicBlocks;
        for (var i = 0; i < basicBlockIndex; i++) {
            actual = actual.next;
        }
        return actual.lineNumber;
    };
    Object.defineProperty(Code.prototype, "instructions", {
        /*
        * SETTERS Y GETTERS
        */
        get: function () {
            return this._instructions;
        },
        set: function (value) {
            this._instructions = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Code.prototype, "lines", {
        get: function () {
            return this._lines;
        },
        set: function (value) {
            this._lines = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Code.prototype, "labels", {
        get: function () {
            return this._labels;
        },
        set: function (value) {
            this._labels = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Code.prototype, "numberOfBlocks", {
        get: function () {
            return this._numberOfBlocks;
        },
        set: function (value) {
            this._numberOfBlocks = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Code.prototype, "basicBlocks", {
        get: function () {
            return this._basicBlocks;
        },
        set: function (value) {
            this._basicBlocks = value;
        },
        enumerable: true,
        configurable: true
    });
    Code.prototype.getFunctionalUnitType = function (index) {
        // TODO bgt not implemented
        switch (this._instructions[index].opcode) {
            case Opcodes_1.Opcodes.ADD:
            case Opcodes_1.Opcodes.ADDI:
                return FunctionalUnit_1.FunctionalUnitType.INTEGERSUM;
            case Opcodes_1.Opcodes.ADDF:
                return FunctionalUnit_1.FunctionalUnitType.FLOATINGSUM;
            case Opcodes_1.Opcodes.MULT:
                return FunctionalUnit_1.FunctionalUnitType.INTEGERMULTIPLY;
            case Opcodes_1.Opcodes.MULTF:
                return FunctionalUnit_1.FunctionalUnitType.FLOATINGMULTIPLY;
            case Opcodes_1.Opcodes.SW:
            case Opcodes_1.Opcodes.SF:
            case Opcodes_1.Opcodes.LW:
            case Opcodes_1.Opcodes.LF:
                return FunctionalUnit_1.FunctionalUnitType.MEMORY;
            case Opcodes_1.Opcodes.BNE:
            case Opcodes_1.Opcodes.BEQ:
                return FunctionalUnit_1.FunctionalUnitType.JUMP;
            default:
                return FunctionalUnit_1.FunctionalUnitType.INTEGERSUM;
        }
    };
    Code.prototype.isJump = function (opcode) {
        return (opcode === Opcodes_1.Opcodes.BEQ) || (opcode === Opcodes_1.Opcodes.BGT) || (opcode === Opcodes_1.Opcodes.BNE);
    };
    return Code;
}());
exports.Code = Code;
//# sourceMappingURL=Code.js.map