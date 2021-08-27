"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Queue = /** @class */ (function () {
    function Queue(size) {
        if (size) {
            this.size = size + 1;
            this.elements = new Array(size + 1);
            this.elements.fill(null);
        }
        else {
            this.size = 0;
            this.elements = null;
        }
        this.last = 0;
        this.first = 0;
    }
    Object.defineProperty(Queue.prototype, "size", {
        get: function () {
            return this._size;
        },
        set: function (value) {
            this._size = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Queue.prototype, "last", {
        get: function () {
            return this._last;
        },
        set: function (value) {
            this._last = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Queue.prototype, "first", {
        get: function () {
            return this._first;
        },
        set: function (value) {
            this._first = value;
        },
        enumerable: true,
        configurable: true
    });
    Queue.prototype.top = function () {
        return this._elements[this.first];
    };
    Queue.prototype.isEmpty = function () {
        return this.first === this.last;
    };
    Queue.prototype.isFull = function () {
        return ((this.last + 1) % this.size === this.first);
    };
    Queue.prototype.getCount = function () {
        return (this.last >= this.first) ? (this.last - this.first) : (this.last + this.size - this.first);
    };
    Queue.prototype.end = function () {
        return this.last;
    };
    Queue.prototype.nextIterator = function (i) {
        return (i + 1) % this.size;
    };
    Queue.prototype.init = function (n) {
        this.size = n + 1;
        this._elements = new Array(n + 1);
        this._elements.fill(null);
        this.first = 0;
        this.last = 0;
    };
    Queue.prototype.add = function (value) {
        if (this.isFull()) {
            return -1;
        }
        var oldLast = this.last;
        this._elements[this.last] = value;
        this.last = (this.last + 1) % this.size;
        return oldLast;
    };
    Queue.prototype.remove = function (position) {
        if (position != null) {
            if (position === this.first) {
                return this.removeFirst();
            }
            if ((position >= this.last) || (position < this.first)) {
                return null;
            }
            var element = this._elements[position];
            this.last = (this.last > position) ? this.last : this.last + this.size;
            for (var i = position; i < this.last; i++) {
                this._elements[i % this.size] = this._elements[(i + 1) % this.size];
            }
            this.last = (this.last - 1) % this.size;
            return element;
        }
        else {
            return this.removeFirst();
        }
    };
    Object.defineProperty(Queue.prototype, "elements", {
        get: function () {
            return this._elements;
        },
        set: function (elements) {
            this._elements = elements;
        },
        enumerable: true,
        configurable: true
    });
    Queue.prototype.getElement = function (index) {
        return (index >= this.size) ? null : this.elements[index];
    };
    Queue.prototype.removeFirst = function () {
        if (this.isEmpty()) {
            return null;
        }
        var element = this._elements[this.first];
        this._elements[this.first] = null;
        this.first = (this.first + 1) % this.size;
        return element;
    };
    return Queue;
}());
exports.Queue = Queue;
//# sourceMappingURL=Queue.js.map