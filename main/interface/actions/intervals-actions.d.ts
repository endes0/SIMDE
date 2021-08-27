export declare const ADD_ROB_FPR_INTERVAL = "ADD_ROB_FPR_INTERVAL";
export declare const ADD_ROB_GPR_INTERVAL = "ADD_ROB_GPR_INTERVAL";
export declare const REMOVE_ROB_FPR_INTERVAL = "REMOVE_ROB_FPR_INTERVAL";
export declare const REMOVE_ROB_GPR_INTERVAL = "REMOVE_ROB_GPR_INTERVAL";
export declare const ADD_MEMORY_INTERVAL = "ADD_MEMORY_INTERVAL";
export declare const REMOVE_MEMORY_INTERVAL = "REMOVE_MEMORY_INTERVAL";
export declare const ADD_GENERAL_REGISTERS_INTERVAL = "ADD_GENERAL_REGISTERS_INTERVAL";
export declare const REMOVE_GENERAL_REGISTERS_INTERVAL = "REMOVE_GENERAL_REGISTERS_INTERVAL";
export declare const ADD_FLOATING_REGISTERS_INTERVAL = "ADD_FLOATING_REGISTERS_INTERVAL";
export declare const REMOVE_FLOATING_REGISTERS_INTERVAL = "REMOVE_FLOATING_REGISTERS_INTERVAL";
export declare function addRobFprInterval(data: any): {
    type: string;
    value: any;
};
export declare function addRobGprInterval(data: any): {
    type: string;
    value: any;
};
export declare function removeRobFprInterval(data: any): {
    type: string;
    value: Set<{}>;
};
export declare function removeRobGprInterval(data: any): {
    type: string;
    value: Set<{}>;
};
export declare function addMemoryInterval(data: any): {
    type: string;
    value: any;
};
export declare function addGeneralRegistersInterval(data: any): {
    type: string;
    value: any;
};
export declare function addFloatingRegistersInterval(data: any): {
    type: string;
    value: any;
};
export declare function removeMemoryInterval(data: any): {
    type: string;
    value: Set<{}>;
};
export declare function removeGeneralRegistersInterval(data: any): {
    type: string;
    value: Set<{}>;
};
export declare function removeFloatingRegistersInterval(data: any): {
    type: string;
    value: Set<{}>;
};
