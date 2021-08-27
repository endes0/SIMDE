import { Instruction } from '../Common/Instruction';
import { SuperStage } from './SuperescalarEnums';
export declare class ReorderBufferEntry {
    private _instruction;
    private _ready;
    private _value;
    private _destinyRegister;
    private _address;
    private _superStage;
    instruction: Instruction;
    ready: boolean;
    value: number;
    destinyRegister: number;
    address: number;
    superStage: SuperStage;
}
