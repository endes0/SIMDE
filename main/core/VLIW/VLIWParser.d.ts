import { LargeInstruction } from './LargeInstructions';
import { Code } from '../Common/Code';
export declare class VLIWParser {
    static Parse(input: string, code: Code): LargeInstruction[];
    static ExportAsString(_instructionNumber: number, _instructions: LargeInstruction[]): string;
}
