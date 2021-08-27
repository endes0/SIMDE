import { Machine } from '../Common/Machine';
import { VLIWCode } from './VLIWCode';
import { VLIWError } from './VLIWError';
export declare class VLIW extends Machine {
    private static NPR;
    private _predR;
    private _NaTGP;
    private _NaTFP;
    private _code;
    constructor();
    getPredReg(index?: number): boolean[] | boolean;
    getNaTGP(index?: number): boolean[] | boolean;
    getNaTFP(index?: number): boolean[] | boolean;
    code: VLIWCode;
    setPredReg(index: number, p: boolean): void;
    setNaTGP(index: number, n: boolean): void;
    setNaTFP(index: number, n: boolean): void;
    setNUF(index: number, n: number): void;
    checkCode(): void;
    checkDependenciesError(row: number, id: number): VLIWError;
    checkPredicateError(row: number, id: number): VLIWError;
    tic(): VLIWError.PCOUTOFRANGE | VLIWError.ENDEXE | VLIWError.BREAKPOINT | VLIWError.OK;
    init(reset: boolean): void;
    private runOperation(operation, functionalUnit);
    private runJump(operation);
    private checkDependencies(row, id);
    private checkPredicate(row, id);
}
