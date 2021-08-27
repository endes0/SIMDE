import { Superescalar } from '../core/Superescalar/Superescalar';
import { ExecutionStatus } from '../main-consts';
import { Code } from '../core/Common/Code';
import { SuperescalarStatus } from '../core/Superescalar/SuperescalarEnums';
import { MachineIntegration } from './machine-integration';
export declare class SuperescalarIntegration extends MachineIntegration {
    superescalar: Superescalar;
    codeLoaded: boolean;
    interval: any;
    backStep: number;
    stopCondition: ExecutionStatus;
    finishedExecution: boolean;
    executing: boolean;
    replications: number;
    cacheFailPercentage: number;
    cacheFailLatency: number;
    dispatchAllSuperescalarActions: (step?: number) => void;
    superExe: (reset?: boolean) => void;
    stepForward: () => SuperescalarStatus;
    loadCode: (code: Code) => void;
    play: () => void;
    makeBatchExecution: () => void;
    pause: () => void;
    stop: () => void;
    colorCell: (instructionId: any, color: any) => void;
    stepBack: () => void;
    setMemory: (data: {
        [k: number]: number;
    }) => void;
    setFpr: (data: {
        [k: number]: number;
    }) => void;
    setGpr: (data: {
        [k: number]: number;
    }) => void;
    executionLoop: (speed: any) => void;
    saveSuperConfig: (superConfig: any) => void;
    setBatchMode: (replications: number, cacheFailLatency: any, cacheFailPercentage: any) => void;
    private resetMachine();
    private calculateBatchStatistics(results);
    private clearBatchStateEffects();
}
declare const _default: SuperescalarIntegration;
export default _default;
