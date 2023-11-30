export const codeInput = `// SWMDE v1.0
// Autor: Iván Castilla Rodríguez
// Utilidad: Programa de testeo de SWMDE
// Comentarios: El programa presupone q en la posición 50 (R2) de memoria tienes
// un vector de de 16 elementos y quieres sumar a cada elemento una cantidad 
// fija (en la posición de memoria 40). El resultado se coloca a partir de la 
// posición 70 (R3) de memoria.
// Este fichero es el mismo bucle de "bucle.pla" pero desenrollado para que en 
// cada iteración se hagan ocho pasadas del bucle
//
32
	ADDI	R2 R0 #50
	ADDI	R3 R0 #70
	ADDI	R4 R0 #40
	LF	F0 (R4)
	ADDI	R5 R2 #16
LOOP:
	LF 	F1 (R2)
	LF 	F2 1(R2)
	LF	F3 2(R2)
	LF	F4 3(R2)
	LF 	F5 4(R2)
	LF 	F6 5(R2)
	LF	F7 6(R2)
	LF	F8 7(R2)
	ADDF	F1 F1 F0
	ADDF	F2 F2 F0
	ADDF	F3 F3 F0
	ADDF	F4 F4 F0
	ADDF	F5 F5 F0
	ADDF	F6 F6 F0
	ADDF	F7 F7 F0
	ADDF	F8 F8 F0
	SF	F1 (R3)
	SF	F2 1(R3)
	SF	F3 2(R3)
	SF	F4 3(R3)
	SF	F5 4(R3)
	SF	F6 5(R3)
	SF	F7 6(R3)
	SF	F8 7(R3)
	ADDI 	R2 R2 #8
	ADDI	R3 R3 #8
	BNE	R2 R5 LOOP`;

export const vliwCodeInput = `18
2	0 0 0 0	2 0 1 0
3	1 0 0 0	4 0 1 0	3 4 0 0
2	5 4 0 0	6 4 1 0
2	7 4 0 0	8 4 1 0
2	9 4 0 0	10 4 1 0
2	11 4 0 0	12 4 1 0
2	13 2 0 0	14 2 1 0
2	15 2 0 0	16 2 1 0
2	17 2 0 0	18 2 1 0
2	19 2 0 0	20 2 1 0
2	21 4 0 0	22 4 1 0
2	23 4 0 0	24 4 1 0
2	25 4 0 0	26 4 1 0
2	27 4 0 0	28 4 1 0
1	29 0 0 0
0
1	31 5 0 0 2 1 2
1	30 0 0 0`;