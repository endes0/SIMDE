import { Instruction } from '../Common/Instruction';
import { FunctionalUnitType } from '../Common/FunctionalUnit';
export declare class VLIWOperation extends Instruction {
    private _functionalUnitType;
    private _functionalUnitIndex;
    private _predicate;
    private _predicateTrue;
    private _predicateFalse;
    constructor(operation?: VLIWOperation, instruction?: Instruction, type?: FunctionalUnitType, functionalUnitIndex?: number);
    buildFromVLIWOperation(operation: VLIWOperation): void;
    buildFromInstruction(instruction: Instruction, functionalUnitType: FunctionalUnitType, functionalUnitIndex: number): void;
    getFunctionalUnitType(): FunctionalUnitType;
    getFunctionalUnitIndex(): number;
    getPred(): number;
    getPredTrue(): number;
    getPredFalse(): number;
    setFunctionalUnitType(t: FunctionalUnitType): void;
    setFunctionalUnitNumber(n: number): void;
    setPred(p: number): void;
    setPredTrue(p: number): void;
    setPredFalse(p: number): void;
    isJump(): boolean;
}
