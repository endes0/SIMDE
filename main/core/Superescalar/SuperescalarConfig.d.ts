export declare class FunctionalUnitConfig {
    number: number;
    latency: number;
}
export declare class SuperEscalarConfig {
    integerSum?: FunctionalUnitConfig;
    integerMult?: FunctionalUnitConfig;
    floatingSum?: FunctionalUnitConfig;
    floatingMult?: FunctionalUnitConfig;
    memory: FunctionalUnitConfig;
    cacheFailureLatency: number;
    jumpLatency: number;
    issueGrade: number;
}
