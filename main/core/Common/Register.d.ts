export declare class Register {
    private static REGISTRY_NUMBER;
    private _content;
    private _bufferIn;
    private _busy;
    constructor();
    content: number[];
    bufferIn: number[];
    busy: boolean[];
    setContent(index: number, value: number, useBuffer: boolean): void;
    getContent(index: number): number;
    getRegistryNumber(): number;
    setBusy(index: number, value: boolean): void;
    setAllBusy(value: boolean): void;
    setAllContent(value: number): void;
    tic(): void;
}
