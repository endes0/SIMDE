export declare class Instruction {
    protected _id: number;
    protected _basicBlock: number;
    protected _opcode: number;
    protected _operands: number[];
    protected _operandsString: string[];
    protected _label: string;
    protected _breakPoint: boolean;
    protected _color: string;
    constructor();
    copy(other: Instruction): void;
    toString(): string;
    setOperand(index: number, value: number, valueString: string): void;
    getOperand(index: number): number;
    id: number;
    basicBlock: number;
    opcode: number;
    breakPoint: boolean;
    color: string;
    operands: number[];
    label: string;
    operandsString: string[];
}
