import { LargeInstruction } from './LargeInstructions';
import { VLIWOperation } from './VLIWOperation';
import { Code } from '../Common/Code';
export declare class VLIWCode {
    instructions: LargeInstruction[];
    private _largeInstructionNumber;
    private _superescalarCode;
    constructor(n?: number);
    getLargeInstructionNumber(): number;
    getLargeInstruction(index: number): LargeInstruction;
    getBreakPoint(index: number): boolean;
    setInstructionNumber(index: number): void;
    setBreakPoint(index: number, b: boolean): void;
    addOperacion(index: number, oper: VLIWOperation): void;
    superescalarCode: Code;
    clear(): void;
    save(): string;
    load(input: string, code: Code): void;
}
