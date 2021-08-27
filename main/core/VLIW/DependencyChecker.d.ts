import { VLIWOperation } from './VLIWOperation';
export interface Check {
    latency: number;
    register: number;
}
export declare class DependencyChecker {
    static checkTargetOperation(operation: VLIWOperation, checkGPR: Check[], checkFPR: Check[], functionalUnitLatencies: number[]): void;
    static checkSourceOperands(operation: VLIWOperation, checkGPR: Check[], checkFPR: Check[]): boolean;
    static checkNat(operation: VLIWOperation, NaTGP: boolean[], NaTFP: boolean[]): boolean;
}
