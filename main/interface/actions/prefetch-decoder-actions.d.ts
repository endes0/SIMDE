export declare const NEXT_PREFETCH_CYCLE = "NEXT_PREFETCH_CYCLE";
export declare const NEXT_DECODER_CYCLE = "NEXT_DECODER_CYCLE";
export declare function nextPrefetchCycle(data: any): {
    type: string;
    value: any[];
};
export declare function nextDecoderCycle(data: any): {
    type: string;
    value: any[];
};
export declare function mapPrefetchDecoderData(data: any): any[];
