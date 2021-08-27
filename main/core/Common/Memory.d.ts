export interface Datum {
    datum: number;
    got: boolean;
}
export declare class Memory {
    private static MEMORY_NUMBER;
    private _data;
    private _fail;
    private _failProbability;
    constructor();
    getDatum(address: number): Datum;
    setDatum(address: number, value: number): void;
    setMem(datum: number): void;
    data: number[];
    fail: boolean[];
    failProbability: number;
}
