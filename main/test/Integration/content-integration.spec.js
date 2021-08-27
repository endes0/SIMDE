"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var content_integration_1 = require("../../integration/content-integration");
var input = "\n#FPR\n[40] 1 1\n";
var input2 = "\n[40] 1 1\n";
var input3 = "\n#GPR\n[1] 5 1 2 3 4 5 \n#MEM\n[33] 5 6 7 8 9 10 \n";
var input4 = "\n#MEM\n[1023] 2 6 7\n";
// const input5= `
// #MEM
// 1023 2 6 7
// `
ava_1.test('Current content is selected properly', function (t) {
    var contentIntegration = new content_integration_1.ContentIntegration(input);
    t.is(contentIntegration.FPRContent[40], 1, 'Should be 1 at position 40');
    t.is(contentIntegration.FPRContent[41], 1, 'Should be 1 at position 41');
});
ava_1.test('Throws error if no content is selected', function (t) {
    var error = t.throws(function () { return new content_integration_1.ContentIntegration(input2); });
    t.is(error.message, 'The data has no content (MEM, REG) associated');
});
ava_1.test('Fills proper data', function (t) {
    var contentIntegration = new content_integration_1.ContentIntegration(input3);
    t.is(contentIntegration.GPRContent[1], 5, 'Should be 1 at position 1');
    t.is(contentIntegration.GPRContent[2], 1, 'Should be 2 at position 2');
    t.is(contentIntegration.GPRContent[3], 2, 'Should be 3 at position 3');
    t.is(contentIntegration.GPRContent[4], 3, 'Should be 4 at position 4');
    t.is(contentIntegration.GPRContent[5], 4, 'Should be 5 at position 5');
    t.is(contentIntegration.GPRContent[6], 5, 'Should be 5 at position 6');
    t.is(contentIntegration.MEMContent[33], 5, 'Should be 6 at position 33');
    t.is(contentIntegration.MEMContent[34], 6, 'Should be 7 at position 34');
    t.is(contentIntegration.MEMContent[35], 7, 'Should be 8 at position 35');
    t.is(contentIntegration.MEMContent[36], 8, 'Should be 9 at position 36');
    t.is(contentIntegration.MEMContent[37], 9, 'Should be 10 at position 37');
    t.is(contentIntegration.MEMContent[38], 10, 'Should be 10 at position 38');
});
ava_1.test('Throws error when exceeding bounds', function (t) {
    var error = t.throws(function () { return new content_integration_1.ContentIntegration(input4); });
    t.is(error.message, 'Setted data out of bounds');
});
// test ('Throws error when memory address line isnt wrapped in brackets', t => {
//     let error = t.throws(() => new ContentIntegration(input5));
//     t.is(error.message, 'Unexpected line format at line 1');
// }); 
//# sourceMappingURL=content-integration.spec.js.map