"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var batching_1 = require("./interface/reducers/batching");
var redux_1 = require("redux");
var reducers_1 = require("./interface/reducers");
exports.store = redux_1.createStore(batching_1.enableBatching(reducers_1.SuperescalarReducers), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
//# sourceMappingURL=store.js.map