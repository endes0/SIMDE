export declare const NEXT_NAT_FPR_CYCLE = "NEXT_NAT_FPR_CYCLE";
export declare const NEXT_NAT_GPR_CYCLE = "NEXT_NAT_GPR_CYCLE";
export declare const NEXT_PREDICATE_CYCLE = "NEXT_PREDICATE_CYCLE";
export declare const ADD_NAT_FPR_INTERVAL = "ADD_NAT_FPR_INTERVAL";
export declare const ADD_NAT_GPR_INTERVAL = "ADD_NAT_GPR_INTERVAL";
export declare const REMOVE_NAT_FPR_INTERVAL = "REMOVE_NAT_FPR_INTERVAL";
export declare const REMOVE_NAT_GPR_INTERVAL = "REMOVE_NAT_GPR_INTERVAL";
export declare const ADD_PREDICATE_INTERVAL = "ADD_PREDICATE_INTERVAL";
export declare const REMOVE_PREDICATE_INTERVAL = "REMOVE_PREDICATE_INTERVAL";
export declare function addNatFprInterval(data: any): {
    type: string;
    value: any;
};
export declare function addNatGprInterval(data: any): {
    type: string;
    value: any;
};
export declare function removeNatFprInterval(data: any): {
    type: string;
    value: Set<{}>;
};
export declare function removeNatGprInterval(data: any): {
    type: string;
    value: Set<{}>;
};
export declare function addMemoryInterval(data: any): {
    type: string;
    value: any;
};
export declare function removeMemoryInterval(data: any): {
    type: string;
    value: Set<{}>;
};
export declare function nextNatFprCycle(data: any): {
    type: string;
    value: any;
};
export declare function nextNatGprCycle(data: any): {
    type: string;
    value: any;
};
export declare function nextPredicateCycle(data: any): {
    type: string;
    value: any;
};
