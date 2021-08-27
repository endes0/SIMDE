export declare class Queue<T> {
    private _size;
    private _elements;
    private _last;
    private _first;
    constructor(size?: number);
    size: number;
    last: number;
    first: number;
    top(): T;
    isEmpty(): boolean;
    isFull(): boolean;
    getCount(): number;
    end(): number;
    nextIterator(i: number): number;
    init(n: number): void;
    add(value: T): number;
    remove(position?: number): T;
    elements: T[];
    getElement(index: number): T;
    private removeFirst();
}
