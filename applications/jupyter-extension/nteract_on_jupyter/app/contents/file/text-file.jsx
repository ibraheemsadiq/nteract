"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var core_1 = require("@nteract/core");
var React = require("react");
var react_redux_1 = require("react-redux");
var styled_components_1 = require("styled-components");
var EditorContainer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: absolute;\n  left: 0;\n  height: 100%;\n  width: 100%;\n\n  .monaco {\n    height: 100%;\n  }\n"], ["\n  position: absolute;\n  left: 0;\n  height: 100%;\n  width: 100%;\n\n  .monaco {\n    height: 100%;\n  }\n"])));
var EditorPlaceholder = /** @class */ (function (_super) {
    __extends(EditorPlaceholder, _super);
    function EditorPlaceholder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EditorPlaceholder.prototype.render = function () {
        // TODO: Show a little blocky placeholder
        return null;
    };
    return EditorPlaceholder;
}(React.PureComponent));
var TextFile = /** @class */ (function (_super) {
    __extends(TextFile, _super);
    function TextFile(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            Editor: EditorPlaceholder
        };
        return _this;
    }
    TextFile.prototype.handleChange = function (source) {
        this.props.handleChange(source);
    };
    TextFile.prototype.componentDidMount = function () {
        var _this = this;
        Promise.resolve().then(function () { return require(/* webpackChunkName: "monaco-editor" */ "@nteract/monaco-editor"); }).then(function (module) {
            _this.setState({ Editor: module.default });
        });
    };
    TextFile.prototype.render = function () {
        var Editor = this.state.Editor;
        return (<EditorContainer className="nteract-editor">
        <Editor theme={this.props.theme === "dark" ? "vs-dark" : "vs"} mode={this.props.mimetype} editorFocused value={this.props.text} onChange={this.handleChange.bind(this)}/>
      </EditorContainer>);
    };
    return TextFile;
}(React.PureComponent));
exports.TextFile = TextFile;
function makeMapStateToTextFileProps(initialState, initialProps) {
    var contentRef = initialProps.contentRef;
    var mapStateToTextFileProps = function (state) {
        var content = core_1.selectors.content(state, { contentRef: contentRef });
        if (!content || content.type !== "file") {
            throw new Error("The text file component must have content");
        }
        var text = content.model ? content.model.text : "";
        return {
            contentRef: contentRef,
            mimetype: content.mimetype != null ? content.mimetype : "text/plain",
            text: text,
            theme: core_1.selectors.currentTheme(state)
        };
    };
    return mapStateToTextFileProps;
}
var makeMapDispatchToTextFileProps = function (initialDispatch, initialProps) {
    var contentRef = initialProps.contentRef;
    var mapDispatchToTextFileProps = function (dispatch) {
        return {
            handleChange: function (source) {
                dispatch(core_1.actions.updateFileText({
                    contentRef: contentRef,
                    text: source
                }));
            }
        };
    };
    return mapDispatchToTextFileProps;
};
var ConnectedTextFile = react_redux_1.connect(makeMapStateToTextFileProps, makeMapDispatchToTextFileProps)(TextFile);
function handles(mimetype) {
    return (mimetype.startsWith("text/") ||
        mimetype.startsWith("application/javascript") ||
        mimetype.startsWith("application/json"));
}
exports.handles = handles;
exports.default = ConnectedTextFile;
var templateObject_1;
