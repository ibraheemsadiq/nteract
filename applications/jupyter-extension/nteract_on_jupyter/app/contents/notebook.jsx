"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var core_1 = require("@nteract/core");
// Show nothing while loading the notebook app
var NotebookPlaceholder = function (props) { return null; };
var Notebook = /** @class */ (function (_super) {
    __extends(Notebook, _super);
    function Notebook(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            App: NotebookPlaceholder
        };
        return _this;
    }
    Notebook.prototype.loadApp = function () {
        var _this = this;
        Promise.resolve().then(function () { return require(/* webpackChunkName: "notebook-app-component" */ "@nteract/notebook-app-component"); }).then(function (module) {
            _this.setState({ App: module.default });
        });
    };
    Notebook.prototype.loadTransforms = function () {
        var _this = this;
        Promise.resolve().then(function () { return require(/* webpackChunkName: "plotly" */ "@nteract/transform-plotly"); }).then(function (module) {
            _this.props.addTransform(module.default);
            _this.props.addTransform(module.PlotlyNullTransform);
        });
        Promise.resolve().then(function () { return require(/* webpackChunkName: "tabular-dataresource" */ "@nteract/data-explorer"); }).then(function (module) {
            _this.props.addTransform(module.default);
        });
        Promise.resolve().then(function () { return require(/* webpackChunkName: "jupyter-widgets" */ "@nteract/jupyter-widgets"); }).then(function (module) {
            _this.props.addTransform(module.WidgetDisplay);
        });
        Promise.resolve().then(function () { return require("@nteract/transform-model-debug"); }).then(function (module) {
            _this.props.addTransform(module.default);
        });
        Promise.resolve().then(function () { return require(/* webpackChunkName: "vega-transform" */ "@nteract/transform-vega"); }).then(function (module) {
            _this.props.addTransform(module.VegaLite1);
            _this.props.addTransform(module.VegaLite2);
            _this.props.addTransform(module.Vega2);
            _this.props.addTransform(module.Vega3);
        });
        // TODO: The geojson transform will likely need some work because of the basemap URL(s)
        // import GeoJSONTransform from "@nteract/transform-geojson";
    };
    Notebook.prototype.componentDidMount = function () {
        this.loadApp();
        this.loadTransforms();
    };
    Notebook.prototype.render = function () {
        var App = this.state.App;
        return <App contentRef={this.props.contentRef}/>;
    };
    return Notebook;
}(React.PureComponent));
var makeMapDispatchToProps = function (initialDispatch, initialProps) {
    var mapDispatchToProps = function (dispatch) {
        return {
            addTransform: function (transform) {
                return dispatch(core_1.actions.addTransform({
                    mediaType: transform.MIMETYPE,
                    component: transform
                }));
            }
        };
    };
    return mapDispatchToProps;
};
exports.default = react_redux_1.connect(null, makeMapDispatchToProps)(Notebook);
