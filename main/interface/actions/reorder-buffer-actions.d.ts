export declare const NEXT_REORDER_BUFFER_CYCLE = "NEXT_REORDER_BUFFER_CYCLE";
export declare const COLOR_CELL = "COLOR_CELL";
import { ReorderBufferEntry } from '../../core/Superescalar/ReorderBufferEntry';
export declare function nextReorderBufferCycle(data: any): {
    type: string;
    value: {
        instruction: {
            id: string;
            value: string;
            color: string;
        };
        destinyRegister: string;
        value: string;
        address: string;
        superStage: string;
    }[];
};
export declare function mapReorderBufferData(data: ReorderBufferEntry[]): {
    instruction: {
        id: string;
        value: string;
        color: string;
    };
    destinyRegister: string;
    value: string;
    address: string;
    superStage: string;
}[];
export declare function colorCell(instructionid: any, color: any): {
    type: string;
    value: any[];
};
