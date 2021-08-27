export declare class ContentIntegration {
    private input;
    FPRContent: {
        [k: number]: number;
    };
    GPRContent: {
        [k: number]: number;
    };
    MEMContent: {
        [k: number]: number;
    };
    private currentContent;
    private _currentSelected;
    constructor(input: string);
    normalizeBreakLines(input: string): string;
    proccessContent(lines: string[]): void;
    parseContent(value: string): void;
    parseLine(line: string): void;
    private validateInnerBounds(currentContent, startPosition, valuesLength);
}
