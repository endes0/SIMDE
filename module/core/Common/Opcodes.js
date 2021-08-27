export var Opcodes;
(function (Opcodes) {
    Opcodes[Opcodes["NOP"] = 0] = "NOP";
    Opcodes[Opcodes["ADD"] = 1] = "ADD";
    Opcodes[Opcodes["ADDI"] = 2] = "ADDI";
    Opcodes[Opcodes["SUB"] = 3] = "SUB";
    Opcodes[Opcodes["ADDF"] = 4] = "ADDF";
    Opcodes[Opcodes["SUBF"] = 5] = "SUBF";
    Opcodes[Opcodes["MULT"] = 6] = "MULT";
    Opcodes[Opcodes["MULTF"] = 7] = "MULTF";
    Opcodes[Opcodes["OR"] = 8] = "OR";
    Opcodes[Opcodes["AND"] = 9] = "AND";
    Opcodes[Opcodes["XOR"] = 10] = "XOR";
    Opcodes[Opcodes["NOR"] = 11] = "NOR";
    Opcodes[Opcodes["SLLV"] = 12] = "SLLV";
    Opcodes[Opcodes["SRLV"] = 13] = "SRLV";
    Opcodes[Opcodes["SW"] = 14] = "SW";
    Opcodes[Opcodes["SF"] = 15] = "SF";
    Opcodes[Opcodes["LW"] = 16] = "LW";
    Opcodes[Opcodes["LF"] = 17] = "LF";
    Opcodes[Opcodes["BNE"] = 18] = "BNE";
    Opcodes[Opcodes["BEQ"] = 19] = "BEQ";
    Opcodes[Opcodes["BGT"] = 20] = "BGT";
    Opcodes[Opcodes["OPERROR"] = 21] = "OPERROR";
})(Opcodes || (Opcodes = {}));
export var OpcodesNames = ['NOP', 'ADD', 'ADDI', 'SUB', 'ADDF', 'SUBF', 'MULT', 'MULTF', 'OR', 'AND', 'XOR', 'NOR', 'SLLV', 'SRLV', 'SW', 'SF', 'LW', 'LF', 'BNE', 'BEQ', 'BGT'];
//# sourceMappingURL=Opcodes.js.map