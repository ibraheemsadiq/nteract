"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@nteract/core");
var outputs_1 = require("@nteract/outputs");
var transform_vdom_1 = require("@nteract/transform-vdom");
var Immutable = require("immutable");
var React = require("react");
var react_dom_1 = require("react-dom");
var react_redux_1 = require("react-redux");
var app_1 = require("./app");
Promise.resolve().then(function () { return require("./fonts"); });
var store_1 = require("./store");
function main(config, rootEl) {
    return __awaiter(this, void 0, void 0, function () {
        var jupyterHostRecord, hostRef, contentRef, NullTransform, kernelspecsRef, initialState, kernelRef, store;
        return __generator(this, function (_a) {
            jupyterHostRecord = core_1.makeJupyterHostRecord({
                id: null,
                type: "jupyter",
                defaultKernelName: "python",
                token: config.token,
                origin: location.origin,
                basePath: config.baseUrl
            });
            hostRef = core_1.createHostRef();
            contentRef = core_1.createContentRef();
            NullTransform = function () { return null; };
            kernelspecsRef = core_1.createKernelspecsRef();
            initialState = {
                app: core_1.makeAppRecord({
                    version: "nteract-on-jupyter@" + config.appVersion,
                    host: jupyterHostRecord
                }),
                comms: core_1.makeCommsRecord(),
                config: Immutable.Map({
                    theme: "light"
                }),
                core: core_1.makeStateRecord({
                    currentKernelspecsRef: kernelspecsRef,
                    entities: core_1.makeEntitiesRecord({
                        hosts: core_1.makeHostsRecord({
                            byRef: Immutable.Map().set(hostRef, jupyterHostRecord)
                        }),
                        contents: core_1.makeContentsRecord({
                            byRef: Immutable.Map().set(contentRef, core_1.makeDummyContentRecord({
                                filepath: config.contentsPath
                            }))
                        }),
                        transforms: core_1.makeTransformsRecord({
                            displayOrder: Immutable.List([
                                "application/vnd.jupyter.widget-view+json",
                                "application/vnd.vega.v3+json",
                                "application/vnd.vega.v2+json",
                                "application/vnd.vegalite.v2+json",
                                "application/vnd.vegalite.v1+json",
                                "application/geo+json",
                                "application/vnd.plotly.v1+json",
                                "text/vnd.plotly.v1+html",
                                "application/x-nteract-model-debug+json",
                                "application/vnd.dataresource+json",
                                "application/vdom.v1+json",
                                "application/json",
                                "application/javascript",
                                "text/html",
                                "text/markdown",
                                "text/latex",
                                "image/svg+xml",
                                "image/gif",
                                "image/png",
                                "image/jpeg",
                                "text/plain"
                            ]),
                            byId: Immutable.Map({
                                "text/vnd.plotly.v1+html": NullTransform,
                                "application/vnd.plotly.v1+json": NullTransform,
                                "application/geo+json": NullTransform,
                                "application/x-nteract-model-debug+json": NullTransform,
                                "application/vnd.dataresource+json": NullTransform,
                                "application/vnd.jupyter.widget-view+json": NullTransform,
                                "application/vnd.vegalite.v1+json": NullTransform,
                                "application/vnd.vegalite.v2+json": NullTransform,
                                "application/vnd.vega.v2+json": NullTransform,
                                "application/vnd.vega.v3+json": NullTransform,
                                "application/vdom.v1+json": transform_vdom_1.default,
                                "application/json": outputs_1.Media.Json,
                                "application/javascript": outputs_1.Media.JavaScript,
                                "text/html": outputs_1.Media.HTML,
                                "text/markdown": outputs_1.Media.Markdown,
                                "text/latex": outputs_1.Media.LaTeX,
                                "image/svg+xml": outputs_1.Media.SVG,
                                "image/gif": outputs_1.Media.Image,
                                "image/png": outputs_1.Media.Image,
                                "image/jpeg": outputs_1.Media.Image,
                                "text/plain": outputs_1.Media.Plain
                            })
                        })
                    })
                })
            };
            kernelRef = core_1.createKernelRef();
            store = store_1.default(initialState);
            window.store = store;
            store.dispatch(core_1.actions.fetchContent({
                filepath: config.contentsPath,
                params: {},
                kernelRef: kernelRef,
                contentRef: contentRef
            }));
            store.dispatch(core_1.actions.fetchKernelspecs({ hostRef: hostRef, kernelspecsRef: kernelspecsRef }));
            react_dom_1.default.render(<React.Fragment>
      <react_redux_1.Provider store={store}>
        <app_1.default contentRef={contentRef}/>
      </react_redux_1.Provider>
    </React.Fragment>, rootEl);
            return [2 /*return*/];
        });
    });
}
exports.main = main;
