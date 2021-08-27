import * as LexerJs from 'lex';
export var LEX;
(function (LEX) {
    LEX[LEX["INMEDIATE"] = 1] = "INMEDIATE";
    LEX[LEX["REGFP"] = 2] = "REGFP";
    LEX[LEX["REGGP"] = 3] = "REGGP";
    LEX[LEX["ID"] = 4] = "ID";
    LEX[LEX["LABEL"] = 5] = "LABEL";
    LEX[LEX["ADDRESS"] = 6] = "ADDRESS";
    LEX[LEX["LINESNUMBER"] = 7] = "LINESNUMBER";
})(LEX || (LEX = {}));
var Lexer = /** @class */ (function () {
    function Lexer() {
        this._lexer = new LexerJs();
        this._lexer.addRule(/[Ff][0-9]+/i, function (lexeme) {
            this.yytext = lexeme;
            return LEX.REGFP;
        }).addRule(/[Rr][0-9]+/i, function (lexeme) {
            this.yytext = lexeme;
            return LEX.REGGP;
        }).addRule(/#[+-]?[0-9]+/i, function (lexeme) {
            this.yytext = lexeme;
            return LEX.INMEDIATE;
        }).addRule(/[A-Za-z][A-Za-z0-9]*\:/i, function (lexeme) {
            this.yytext = lexeme;
            return LEX.LABEL;
        }).addRule(/[A-Za-z][A-Za-z0-9]*/i, function (lexeme) {
            this.yytext = lexeme;
            return LEX.ID;
        }).addRule(/[+-]?[0-9]*\([Rr][0-9]+\)/i, function (lexeme) {
            this.yytext = lexeme;
            return LEX.ADDRESS;
        }).addRule(/[0-9]+/i, function (lexeme) {
            this.yytext = lexeme;
            return LEX.LINESNUMBER;
        }).addRule(/[ \t\v\f]+/i, function (lexeme) {
            return;
        }).addRule(/\/\/.*/, function (lexeme) {
            return;
        }).addRule(/(.|\n)/i, function (lexeme) {
            return;
        });
    }
    Lexer.prototype.setInput = function (input) {
        this._lexer.input = input;
    };
    Lexer.prototype.lex = function () {
        var value = this._lexer.lex();
        return {
            value: value,
            yytext: this._lexer.yytext
        };
    };
    return Lexer;
}());
export { Lexer };
//# sourceMappingURL=Lexer.js.map