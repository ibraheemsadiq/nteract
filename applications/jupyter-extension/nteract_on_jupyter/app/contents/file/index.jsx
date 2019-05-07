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
var path_1 = require("path");
var React = require("react");
var react_redux_1 = require("react-redux");
var styled_components_1 = require("styled-components");
var notebook_1 = require("../notebook");
var TextFile = require("./text-file");
var PaddedContainer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding-left: var(--nt-spacing-l, 10px);\n  padding-top: var(--nt-spacing-m, 10px);\n  padding-right: var(--nt-spacing-m, 10px);\n"], ["\n  padding-left: var(--nt-spacing-l, 10px);\n  padding-top: var(--nt-spacing-m, 10px);\n  padding-right: var(--nt-spacing-m, 10px);\n"])));
var JupyterExtensionContainer = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  flex-flow: column;\n  align-items: stretch;\n  height: -webkit-fill-available;\n"], ["\n  display: flex;\n  flex-flow: column;\n  align-items: stretch;\n  height: -webkit-fill-available;\n"])));
var JupyterExtensionChoiceContainer = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  flex: 1 1 auto;\n  overflow: auto;\n"], ["\n  flex: 1 1 auto;\n  overflow: auto;\n"])));
var File = /** @class */ (function (_super) {
    __extends(File, _super);
    function File() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getChoice = function () {
            var choice = null;
            // notebooks don't report a mimetype so we'll use the content.type
            if (_this.props.type === "notebook") {
                choice = <notebook_1.default contentRef={_this.props.contentRef}/>;
            }
            else if (_this.props.type === "dummy") {
                choice = null;
            }
            else if (_this.props.mimetype == null ||
                !TextFile.handles(_this.props.mimetype)) {
                // TODO: Redirect to /files/ endpoint for them to download the file or view
                //       as is
                choice = (<PaddedContainer>
          <pre>Can not render this file type</pre>
        </PaddedContainer>);
            }
            else {
                choice = <TextFile.default contentRef={_this.props.contentRef}/>;
            }
            return choice;
        };
        return _this;
    }
    File.prototype.render = function () {
        var choice = this.getChoice();
        // Right now we only handle one kind of editor
        // If/when we support more modes, we would case them off here
        return (<React.Fragment>
        <JupyterExtensionContainer>
          <JupyterExtensionChoiceContainer>
            {choice}
          </JupyterExtensionChoiceContainer>
        </JupyterExtensionContainer>
      </React.Fragment>);
    };
    return File;
}(React.PureComponent));
exports.File = File;
// Since the contentRef stays unique for the duration of this file,
// we use the makeMapStateToProps pattern to optimize re-render
var makeMapStateToProps = function (initialState, initialProps) {
    var contentRef = initialProps.contentRef, appBase = initialProps.appBase;
    var mapStateToProps = function (state) {
        var content = core_1.selectors.content(state, initialProps);
        if (!content || content.type === "directory") {
            throw new Error("The file component should only be used with files and notebooks");
        }
        return {
            appBase: appBase,
            contentRef: contentRef,
            baseDir: path_1.dirname(content.filepath),
            displayName: content.filepath.split("/").pop(),
            lastSavedStatement: "recently",
            mimetype: content.mimetype,
            type: content.type
        };
    };
    return mapStateToProps;
};
exports.ConnectedFile = react_redux_1.connect(makeMapStateToProps)(File);
exports.default = exports.ConnectedFile;
var templateObject_1, templateObject_2, templateObject_3;
