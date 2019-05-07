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
var actions = require("@nteract/actions");
var core_1 = require("@nteract/core");
var path_1 = require("path");
var React = require("react");
var react_hotkeys_1 = require("react-hotkeys");
var react_redux_1 = require("react-redux");
var url_join_1 = require("url-join");
var directory_1 = require("./directory");
var file_1 = require("./file");
var headers_1 = require("./headers");
var connected_components_1 = require("@nteract/connected-components");
var Contents = /** @class */ (function (_super) {
    __extends(Contents, _super);
    function Contents() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.keyMap = {
            CHANGE_CELL_TYPE: [
                "ctrl+shift+y",
                "ctrl+shift+m",
                "meta+shift+y",
                "meta+shift+m"
            ],
            COPY_CELL: ["ctrl+shift+c", "meta+shift+c"],
            CREATE_CELL_ABOVE: ["ctrl+shift+a", "meta+shift+a"],
            CREATE_CELL_BELOW: ["ctrl+shift+b", "meta+shift+b"],
            CUT_CELL: ["ctrl+shift+x", "meta+shift+x"],
            DELETE_CELL: ["ctrl+shift+d", "meta+shift+d"],
            EXECUTE_ALL_CELLS: ["alt+r a"],
            INTERRUPT_KERNEL: ["alt+r i"],
            KILL_KERNEL: ["alt+r k"],
            OPEN: ["ctrl+o", "meta+o"],
            PASTE_CELL: ["ctrl+shift+v"],
            RESTART_KERNEL: ["alt+r r", "alt+r c", "alt+r a"],
            SAVE: ["ctrl+s", "ctrl+shift+s", "meta+s", "meta+shift+s"]
        };
        return _this;
    }
    Contents.prototype.render = function () {
        var _a = this.props, appBase = _a.appBase, baseDir = _a.baseDir, contentRef = _a.contentRef, contentType = _a.contentType, displayName = _a.displayName, error = _a.error, handlers = _a.handlers, loading = _a.loading, saving = _a.saving;
        switch (contentType) {
            case "notebook":
            case "file":
            case "dummy":
                return (<React.Fragment>
            <react_hotkeys_1.HotKeys keyMap={this.keyMap} handlers={handlers}>
              <headers_1.ConnectedFileHeader appBase={appBase} baseDir={baseDir} contentRef={contentRef} displayName={displayName} error={error} loading={loading} saving={saving}>
                {contentType === "notebook" ? (<connected_components_1.NotebookMenu contentRef={this.props.contentRef}/>) : null}
              </headers_1.ConnectedFileHeader>
              <file_1.default contentRef={contentRef} appBase={appBase}/>
            </react_hotkeys_1.HotKeys>
          </React.Fragment>);
            case "directory":
                return (<React.Fragment>
            <headers_1.DirectoryHeader appBase={appBase}/>
            <directory_1.ConnectedDirectory appBase={appBase} contentRef={contentRef}/>
          </React.Fragment>);
            default:
                return (<React.Fragment>
            <headers_1.DirectoryHeader appBase={appBase}/>
            <div>{"content type " + contentType + " not implemented"}</div>
          </React.Fragment>);
        }
    };
    return Contents;
}(React.PureComponent));
var makeMapStateToProps = function (initialState, initialProps) {
    var host = initialState.app.host;
    if (host.type !== "jupyter") {
        throw new Error("this component only works with jupyter apps");
    }
    var appBase = url_join_1.default(host.basePath, "/wisecube/edit");
    var mapStateToProps = function (state) {
        var contentRef = initialProps.contentRef;
        if (!contentRef) {
            throw new Error("cant display without a contentRef");
        }
        var content = core_1.selectors.content(state, { contentRef: contentRef });
        if (!content) {
            throw new Error("need content to view content, check your contentRefs");
        }
        return {
            appBase: appBase,
            baseDir: path_1.dirname(content.filepath),
            contentRef: contentRef,
            contentType: content.type,
            displayName: content.filepath.split("/").pop() || "",
            error: content.error,
            filepath: content.filepath,
            lastSavedStatement: "recently",
            loading: content.loading,
            mimetype: content.mimetype,
            saving: content.saving
        };
    };
    return mapStateToProps;
};
var mapDispatchToProps = function (dispatch, ownProps) {
    var appBase = ownProps.appBase, contentRef = ownProps.contentRef;
    return {
        // `HotKeys` handlers object
        // see: https://github.com/greena13/react-hotkeys#defining-handlers
        handlers: {
            CHANGE_CELL_TYPE: function (event) {
                var type = event.key === "Y" ? "code" : "markdown";
                return dispatch(actions.changeCellType({ to: type, contentRef: contentRef }));
            },
            COPY_CELL: function () { return dispatch(actions.copyCell({ contentRef: contentRef })); },
            CREATE_CELL_ABOVE: function () {
                return dispatch(actions.createCellAbove({ cellType: "code", contentRef: contentRef }));
            },
            CREATE_CELL_BELOW: function () {
                return dispatch(actions.createCellBelow({ cellType: "code", source: "", contentRef: contentRef }));
            },
            CUT_CELL: function () { return dispatch(actions.cutCell({ contentRef: contentRef })); },
            DELETE_CELL: function () { return dispatch(actions.deleteCell({ contentRef: contentRef })); },
            EXECUTE_ALL_CELLS: function () {
                return dispatch(actions.executeAllCells({ contentRef: contentRef }));
            },
            INTERRUPT_KERNEL: function () { return dispatch(actions.interruptKernel({})); },
            KILL_KERNEL: function () { return dispatch(actions.killKernel({ restarting: false })); },
            OPEN: function () {
                // On initialization, the appBase prop is not available.
                var nteractEditUri = "/wisecube/edit";
                var url = appBase ? url_join_1.default(appBase, nteractEditUri) : nteractEditUri;
                window.open(url, "_blank");
            },
            PASTE_CELL: function () { return dispatch(actions.pasteCell({ contentRef: contentRef })); },
            RESTART_KERNEL: function (event) {
                var outputHandling = event.key === "r"
                    ? "None"
                    : event.key === "a"
                        ? "Run All"
                        : "Clear All";
                return dispatch(actions.restartKernel({ outputHandling: outputHandling, contentRef: contentRef }));
            },
            SAVE: function () { return dispatch(actions.save({ contentRef: contentRef })); }
        }
    };
};
exports.default = react_redux_1.connect(makeMapStateToProps, mapDispatchToProps)(Contents);
