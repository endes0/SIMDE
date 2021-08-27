export declare const HEADER_TABLE_CYCLE = "HEADER_TABLE_CYCLE";
export declare const TABLE_CYCLE = "TABLE_CYCLE";
export declare function nextVLIWHeaderTableCycle(functionalUnitNumbers: number[]): {
    type: string;
    value: any;
};
export declare function nextVLIWExecutionTableCycle(data: any, functionalUnitNumbers: number[]): {
    type: string;
    value: any;
};
