export const codeInput = `10
ADDI R1 R0 #3
ADDI R2 R0 #2
SLLV R3 R1 R2
SRLV R4 R1 R2
ADDI R5 R0 #11
ADDI R6 R0 #6
OR   R7 R5 R6
AND  R8 R5 R6
NOR  R9 R5 R6
XOR  R10 R5 R6`;

export const resultContent = [3, 2, 12, 0, 11, 6, 15, 2, -16, 13];