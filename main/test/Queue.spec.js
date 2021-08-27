"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var Queue_1 = require("../core/Collections/Queue");
ava_1.test('Queue size behaces as expected', function (t) {
    var queue = new Queue_1.Queue(3);
    queue.add(1);
    queue.add(2);
    queue.add(3);
    // Size should be fixed to 3 + 1
    t.is(queue.size, 4);
});
ava_1.test('Queue has fixed size', function (t) {
    var queue = new Queue_1.Queue(1);
    queue.add(1);
    queue.add(2);
    queue.add(3);
    // Size should be 1 + 1
    t.is(queue.size, 2);
});
ava_1.test('Queue does not let you add extra elements', function (t) {
    var queue = new Queue_1.Queue(3);
    queue.add(1);
    queue.add(2);
    queue.add(3);
    // Size should be 3 + 1
    t.is(queue.add(3), -1);
});
ava_1.test('Queue keeps its size after removing elements', function (t) {
    var queue = new Queue_1.Queue(3);
    queue.add(1);
    queue.add(2);
    queue.add(3);
    queue.remove(1);
    t.is(queue.size, 4);
});
ava_1.test('Queue standard behavior', function (t) {
    var queue = new Queue_1.Queue(3);
    var index = queue.add(1);
    t.is(index, 0);
});
ava_1.test('Queue behavior', function (t) {
    var queue = new Queue_1.Queue(2);
    queue.add(1);
    queue.add(2);
    queue.remove(0);
    queue.add(3);
    queue.remove();
    t.is(queue.top(), 3);
});
//# sourceMappingURL=Queue.spec.js.map