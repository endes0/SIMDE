export interface Lexema {
    value?: any;
    yytext?: any;
}
export declare enum LEX {
    INMEDIATE = 1,
    REGFP = 2,
    REGGP = 3,
    ID = 4,
    LABEL = 5,
    ADDRESS = 6,
    LINESNUMBER = 7,
}
export declare class Lexer {
    private _lexer;
    constructor();
    setInput(input: string): void;
    lex(): Lexema;
}
