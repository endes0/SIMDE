import { ContentIntegration } from './content-integration';
export declare abstract class MachineIntegration {
    contentIntegration: ContentIntegration;
    abstract loadCode: (code: any) => void;
    abstract makeBatchExecution: () => void;
    abstract play: () => void;
    abstract pause: () => void;
    abstract stop: () => void;
    abstract stepBack: () => void;
    abstract stepForward: () => void;
    abstract setBatchMode: (...config) => void;
    abstract setMemory: (data: number[]) => void;
    abstract setFpr: (data: number[]) => void;
    abstract setGpr: (data: number[]) => void;
    calculateSpeed(): number;
    calculateStandardDeviation(average: any, values: any): number;
}
