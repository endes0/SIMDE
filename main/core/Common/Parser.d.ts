import { Lexer } from './Lexer';
import { FunctionalUnitType } from './FunctionalUnit';
import { Instruction } from './Instruction';
import { BasicBlock } from './Blocks';
export declare class Parser {
    private _lexer;
    private checkLexema;
    constructor(_lexer: Lexer, checkLexema: Function);
    static opcodeToFunctionalUnitType(opcode: number): FunctionalUnitType;
    parseNooP(instruction: Instruction): void;
    parseOperationWithTwoGeneralRegisters(index: number, instruction: Instruction): void;
    parseOperationWithTwoFloatingRegisters(index: number, instruction: Instruction): void;
    parseOperationWithGeneralRegisterAndInmediate(index: number, instruction: Instruction): void;
    parseGeneralLoadStoreOperation(index: number, instruction: Instruction): void;
    parseFloatingLoadStoreOperation(index: number, instruction: Instruction): void;
    parseJumpOperation(index: number, instruction: Instruction, actual: BasicBlock, checkLabel: Function): void;
    stringToOpcode(stringOpcode: string): number;
    stringToAddress(stringAddress: string): number[];
    stringToRegister(stringRegister: string): number;
    stringToInmediate(stringInmediate: string): number;
}
