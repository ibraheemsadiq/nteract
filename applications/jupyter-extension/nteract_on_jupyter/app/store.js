"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@nteract/core");
var redux_1 = require("redux");
var redux_observable_1 = require("redux-observable");
var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux_1.compose;
var rootReducer = redux_1.combineReducers({
    app: core_1.reducers.app,
    comms: core_1.reducers.comms,
    config: core_1.reducers.config,
    core: core_1.reducers.core
});
function configureStore(initialState) {
    var rootEpic = redux_observable_1.combineEpics.apply(void 0, core_1.epics.allEpics);
    var epicMiddleware = redux_observable_1.createEpicMiddleware();
    var middlewares = [epicMiddleware, core_1.middlewares.errorMiddleware];
    var store = redux_1.createStore(rootReducer, 
    // TODO: Properly type redux store for jupyter-extension
    initialState, composeEnhancers(redux_1.applyMiddleware.apply(void 0, middlewares)));
    epicMiddleware.run(rootEpic);
    return store;
}
exports.default = configureStore;
