import { Instruction } from './Instruction';
import { BasicBlock } from './Blocks';
import { Lexema } from './Lexer';
import { Label } from './Label';
import { FunctionalUnitType } from './FunctionalUnit';
export declare class Code {
    private _lines;
    private _instructions;
    private _labels;
    private _basicBlocks;
    private _numberOfBlocks;
    private _lexer;
    private _parser;
    constructor();
    checkLabel(str: string, actual: BasicBlock): number;
    addLabel(str: string, lineNumber: number, actual: BasicBlock): BasicBlock;
    replaceLabels(): number;
    load(input: string): void;
    checkLexema(lexema: Lexema, expectedLexema: number, i: number): void;
    getBasicBlockInstruction(basicBlockIndex: number): number;
    instructions: Instruction[];
    lines: number;
    labels: Label[];
    numberOfBlocks: number;
    basicBlocks: BasicBlock;
    getFunctionalUnitType(index: number): FunctionalUnitType;
    private isJump(opcode);
}
