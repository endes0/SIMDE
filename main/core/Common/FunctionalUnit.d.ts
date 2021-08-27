import { Instruction } from './Instruction';
import { Status } from './Status';
export declare enum FunctionalUnitType {
    INTEGERSUM = 0,
    INTEGERMULTIPLY = 1,
    FLOATINGSUM = 2,
    FLOATINGMULTIPLY = 3,
    MEMORY = 4,
    JUMP = 5,
}
export declare const FUNCTIONALUNITTYPESQUANTITY: number;
export declare class FunctionalUnit {
    private _status;
    private _type;
    private _latency;
    private _flow;
    constructor();
    status: Status;
    type: FunctionalUnitType;
    latency: number;
    flow: Instruction[];
    tic(): void;
    fillFlow(instruction: Instruction): number;
    clean(): void;
    isFree(): boolean;
    hasPendingInstruction(): boolean;
    getTopInstruction(): Instruction;
    getInstructionByIndex(index: number): Instruction;
    getLast(): number;
}
