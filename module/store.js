import { enableBatching } from './interface/reducers/batching';
import { createStore } from 'redux';
import { SuperescalarReducers } from './interface/reducers';
export var store = createStore(enableBatching(SuperescalarReducers), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
//# sourceMappingURL=store.js.map