export declare const RESET_HISTORY = "RESET_HISTORY";
export declare const PUSH_HISTORY = "PUSH_HISTORY";
export declare const TAKE_HISTORY = "TAKE_HISTORY";
export declare function takeHistory(index: any): {
    type: string;
    value: any;
};
export declare function pushHistory(): {
    type: string;
    value: boolean;
};
export declare function resetHistory(): {
    type: string;
    value: boolean;
};
