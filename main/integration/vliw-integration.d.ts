import { ExecutionStatus } from '../main-consts';
import { MachineIntegration } from './machine-integration';
import { VLIW, VLIWCode, VLIWError } from '../core/VLIW';
export declare class VLIWIntegration extends MachineIntegration {
    vliw: VLIW;
    codeLoaded: boolean;
    interval: any;
    backStep: number;
    stopCondition: ExecutionStatus;
    finishedExecution: boolean;
    executing: boolean;
    replications: number;
    cacheFailPercentage: number;
    cacheFailLatency: number;
    dispatchAllVLIWActions: (step?: number) => void;
    vliwExe: () => void;
    stepForward: () => VLIWError.PCOUTOFRANGE | VLIWError.ENDEXE | VLIWError.BREAKPOINT | VLIWError.OK;
    loadCode: (vliwCode: VLIWCode) => void;
    play: () => void;
    makeBatchExecution: () => void;
    pause: () => void;
    stop: () => void;
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
    saveVliwConfig: (vliwConfig: any) => void;
    setBatchMode: (replications: number, cacheFailLatency: any, cacheFailPercentage: any) => void;
    private resetMachine();
    private calculateBatchStatistics(results);
    private clearBatchStateEffects();
}
declare const _default: VLIWIntegration;
export default _default;
