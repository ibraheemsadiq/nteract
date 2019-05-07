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
var core_1 = require("@blueprintjs/core");
var actions = require("@nteract/actions");
var iron_icons_1 = require("@nteract/iron-icons");
var React = require("react");
var react_redux_1 = require("react-redux");
var url_join_1 = require("url-join");
var editable_title_overlay_1 = require("../components/editable-title-overlay");
var last_saved_1 = require("../components/last-saved");
var nav_1 = require("../components/nav");
var themed_logo_1 = require("../components/themed-logo");
exports.DirectoryHeader = function (props) { return (<nav_1.Nav>
    <nav_1.NavSection>
      {props.appBase ? (<a href={url_join_1.default(props.appBase)} role="button" title="Home">
          <themed_logo_1.ThemedLogo />
        </a>) : null}
    </nav_1.NavSection>
  </nav_1.Nav>); };
var FileHeader = /** @class */ (function (_super) {
    __extends(FileHeader, _super);
    function FileHeader(props) {
        var _this = _super.call(this, props) || this;
        // Determine the file handler
        _this.getFileHandlerIcon = function () {
            return _this.props.saving ? (<iron_icons_1.SavingIcon />) : _this.props.error ? (<iron_icons_1.ErrorIcon />) : _this.props.loading ? (<iron_icons_1.LoadingIcon />) : ("");
        };
        _this.getFileExtension = function (filename) {
            var dot = /[.]/.exec(filename);
            var ext = /[^.]+$/.exec(filename);
            return dot && ext ? ext[0] : undefined;
        };
        _this.addFileExtension = function (filename) {
            var displayName = _this.props.displayName;
            var fileExtension = _this.getFileExtension(filename);
            var prevFileExtension = _this.getFileExtension(displayName);
            if (fileExtension) {
                return filename;
            }
            else if (prevFileExtension) {
                // Get file extension from props.displayName
                return filename + "." + prevFileExtension;
            }
            else {
                // Assume `.ipynb` file
                return filename + ".ipynb";
            }
        };
        _this.openDialog = function () { return _this.setState({ isDialogOpen: true }); };
        _this.closeDialog = function () { return _this.setState({ isDialogOpen: false }); };
        // Handles onConfirm callback for EditableText component
        _this.confirmTitle = function (value) {
            if (value !== _this.props.displayName) {
                _this.props.changeContentName({
                    contentRef: _this.props.contentRef,
                    filepath: "/" + (value ? _this.addFileExtension(value) : ""),
                    prevFilePath: "/" + _this.props.displayName
                });
            }
            _this.setState({ isDialogOpen: false });
        };
        _this.state = {
            isDialogOpen: false
        };
        return _this;
    }
    FileHeader.prototype.render = function () {
        var themeLogoLink = url_join_1.default(this.props.appBase, this.props.baseDir);
        var icon = this.getFileHandlerIcon();
        return (<React.Fragment>
        <nav_1.Nav>
          <nav_1.NavSection>
            <a href={themeLogoLink} role="button" title="Home">
              <themed_logo_1.ThemedLogo />
            </a>
            <div>
                <core_1.H4 onClick={this.openDialog}>{this.props.displayName}</core_1.H4>
              <editable_title_overlay_1.EditableTitleOverlay defaultValue={this.props.displayName} isOpen={this.state.isDialogOpen} onCancel={this.closeDialog} onSave={this.confirmTitle}/>
            </div>
          </nav_1.NavSection>
          <nav_1.NavSection>
            <span className="icon">{icon}</span>
            <last_saved_1.default contentRef={this.props.contentRef}/>
          </nav_1.NavSection>
        </nav_1.Nav>
        {this.props.children}
      </React.Fragment>);
    };
    FileHeader.defaultProps = {
        children: null
    };
    return FileHeader;
}(React.PureComponent));
var mapDispatchToProps = function (dispatch) { return ({
    changeContentName: function (payload) {
        return dispatch(actions.changeContentName(payload));
    }
}); };
exports.ConnectedFileHeader = react_redux_1.connect(null, mapDispatchToProps)(FileHeader);
exports.default = exports.ConnectedFileHeader;
