export declare enum CommitStatus {
    SUPER_COMMITOK = 0,
    SUPER_COMMITEND = 1,
    SUPER_COMMITMISS = 2,
    SUPER_COMMITNO = 3,
}
export declare enum SuperStage {
    SUPER_ISSUE = 0,
    SUPER_EXECUTE = 1,
    SUPER_WRITERESULT = 2,
    SUPER_COMMIT = 3,
}
export declare enum SuperescalarStatus {
    SUPER_ENDEXE = -2,
    SUPER_BREAKPOINT = -1,
    SUPER_OK = 0,
}
export declare function stageToString(index: number): string;
