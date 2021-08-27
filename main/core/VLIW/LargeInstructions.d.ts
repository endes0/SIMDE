import { VLIWOperation } from './VLIWOperation';
export declare class LargeInstruction {
    private _operations;
    private _breakPoint;
    constructor();
    getOperation(index: number): VLIWOperation;
    getVLIWOperationsNumber(): number;
    setBreakPoint(value: boolean): void;
    getBreakPoint(): boolean;
    addOperation(operation: VLIWOperation): void;
}
