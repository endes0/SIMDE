export declare class BasicBlock {
    private _id;
    private _lineNumber;
    private _next;
    private _successor;
    constructor(_id: number, _lineNumber: number, _next: BasicBlock, _successor: SuccessorBlock);
    lineNumber: number;
    id: number;
    next: BasicBlock;
    successor: SuccessorBlock;
}
export declare class SuccessorBlock {
    private _block;
    private _next;
    block: BasicBlock;
    next: SuccessorBlock;
}
