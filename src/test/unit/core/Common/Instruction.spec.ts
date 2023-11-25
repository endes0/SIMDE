import { expect, beforeEach, test } from 'vitest'
import { Instruction } from '../../../../core/Common/Instruction';

let originalInstruction;

beforeEach(() => {
    originalInstruction = new Instruction();
    originalInstruction.operands = new Array(1, 2, 3);
});

test('Copied instructions should not keep the same reference', t => {
    let newInstruction = new Instruction();
    newInstruction.copy(originalInstruction);
    originalInstruction.operands = null;
    expect(newInstruction.operands).not.toBe(null);
});