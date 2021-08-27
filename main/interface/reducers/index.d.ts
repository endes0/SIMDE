export declare const MAX_HISTORY_SIZE = 10;
export declare const PREDICATE_SIZE = 64;
export declare const initialState: {
    prefetchUnit: any[];
    decoder: any[];
    jumpPrediction: any[];
    history: any[];
    functionalUnitIntAdd: {};
    functionalUnitIntSub: {};
    functionalUnitFloAdd: {};
    functionalUnitFloSub: {};
    functionalUnitMemory: {};
    functionalUnitJump: {};
    functionalUnitAluMem: {};
    reserveStationIntAdd: any[];
    reserveStationIntSub: any[];
    reserveStationFloAdd: any[];
    reserveStationFloSub: any[];
    reserveStationMemory: any[];
    reserveStationJump: any[];
    ROBGpr: {
        data: any[];
        visibleRangeValues: any[];
    };
    ROBFpr: {
        data: any[];
        visibleRangeValues: any[];
    };
    reorderBuffer: any[];
    generalRegisters: {
        data: any[];
        visibleRangeValues: any[];
    };
    floatingRegisters: {
        data: any[];
        visibleRangeValues: any[];
    };
    memory: {
        data: any[];
        visibleRangeValues: any[];
    };
    predicate: {
        data: any[];
        visibleRangeValues: any[];
    };
    natGpr: {
        data: any[];
        visibleRangeValues: any[];
    };
    natFpr: {
        data: any[];
        visibleRangeValues: any[];
    };
    cycle: number;
    code: any[];
    vliwCode: any[];
    vliwExecutionHeaderTable: any[];
    vliwExecutionTable: any[];
    colorBasicBlocks: boolean;
    isLoadModalOpen: boolean;
    isAuthorModalOpen: boolean;
    isOptionsModalOpen: boolean;
    isSuperConfigModalOpen: boolean;
    isVliwConfigModalOpen: boolean;
    isSuperescalarLoadContentModalOpen: boolean;
    isVliwLoadContentModalOpen: boolean;
    isBatchModalOpen: boolean;
    isBatchResultsModalOpen: boolean;
    batchResults: {};
};
export declare function SuperescalarReducers(state: {
    prefetchUnit: any[];
    decoder: any[];
    jumpPrediction: any[];
    history: any[];
    functionalUnitIntAdd: {};
    functionalUnitIntSub: {};
    functionalUnitFloAdd: {};
    functionalUnitFloSub: {};
    functionalUnitMemory: {};
    functionalUnitJump: {};
    functionalUnitAluMem: {};
    reserveStationIntAdd: any[];
    reserveStationIntSub: any[];
    reserveStationFloAdd: any[];
    reserveStationFloSub: any[];
    reserveStationMemory: any[];
    reserveStationJump: any[];
    ROBGpr: {
        data: any[];
        visibleRangeValues: any[];
    };
    ROBFpr: {
        data: any[];
        visibleRangeValues: any[];
    };
    reorderBuffer: any[];
    generalRegisters: {
        data: any[];
        visibleRangeValues: any[];
    };
    floatingRegisters: {
        data: any[];
        visibleRangeValues: any[];
    };
    memory: {
        data: any[];
        visibleRangeValues: any[];
    };
    predicate: {
        data: any[];
        visibleRangeValues: any[];
    };
    natGpr: {
        data: any[];
        visibleRangeValues: any[];
    };
    natFpr: {
        data: any[];
        visibleRangeValues: any[];
    };
    cycle: number;
    code: any[];
    vliwCode: any[];
    vliwExecutionHeaderTable: any[];
    vliwExecutionTable: any[];
    colorBasicBlocks: boolean;
    isLoadModalOpen: boolean;
    isAuthorModalOpen: boolean;
    isOptionsModalOpen: boolean;
    isSuperConfigModalOpen: boolean;
    isVliwConfigModalOpen: boolean;
    isSuperescalarLoadContentModalOpen: boolean;
    isVliwLoadContentModalOpen: boolean;
    isBatchModalOpen: boolean;
    isBatchResultsModalOpen: boolean;
    batchResults: {};
}, action: any): any;
