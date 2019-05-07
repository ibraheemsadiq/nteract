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
var core_1 = require("@blueprintjs/core");
var React = require("react");
var styled_components_1 = require("styled-components");
// styled blueprintjs `Icon`
var CloseIcon = styled_components_1.default(core_1.Icon)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  cursor: pointer;\n"], ["\n  cursor: pointer;\n"])));
var EditableTitleOverlay = /** @class */ (function (_super) {
    __extends(EditableTitleOverlay, _super);
    function EditableTitleOverlay() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Needs to track the input value because in order to handle save
        // when the save button is clicked, we need to know what the last
        // entered value is.
        _this.state = {
            value: _this.props.defaultValue || ""
        };
        _this.handleChange = function (value) { return _this.setState({ value: value }); };
        _this.handleClose = function () { return _this.props.onCancel(true); };
        _this.handleSave = function () { return _this.props.onSave(_this.state.value); };
        return _this;
    }
    EditableTitleOverlay.prototype.render = function () {
        return (<core_1.Overlay canEscapeKeyClose canOutsideClickClose usePortal={false} isOpen={this.props.isOpen} onClose={this.handleClose}>
        <div className="bp3-dialog-container">
          <div className="bp3-dialog">
            <div className="bp3-dialog-header">
              <h4 className="bp3-heading">Rename Notebook</h4>
              <CloseIcon icon="small-cross" onClick={this.handleClose}/>
            </div>
            <div className="bp3-dialog-body">
              <core_1.Label>Enter a new notebook name:</core_1.Label>
              <core_1.EditableText className={core_1.Classes.INPUT} disabled={false} defaultValue={this.props.defaultValue} minWidth={500} intent={"none"} selectAllOnFocus confirmOnEnterKey onChange={this.handleChange} onConfirm={this.handleSave}/>
            </div>
            <div className="bp3-dialog-footer">
              <div className="bp3-dialog-footer-actions">
                <core_1.Button onClick={this.handleClose}>Cancel</core_1.Button>
                <core_1.Button intent={core_1.Intent.PRIMARY} onClick={this.handleSave}>
                  Save
                </core_1.Button>
              </div>
            </div>
          </div>
        </div>
      </core_1.Overlay>);
    };
    return EditableTitleOverlay;
}(React.PureComponent));
exports.EditableTitleOverlay = EditableTitleOverlay;
var templateObject_1;
