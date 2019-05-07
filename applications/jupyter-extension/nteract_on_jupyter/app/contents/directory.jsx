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
var connected_components_1 = require("@nteract/connected-components");
var core_1 = require("@nteract/core");
var directory_listing_1 = require("@nteract/directory-listing");
var React = require("react");
var react_redux_1 = require("react-redux");
var styled_components_1 = require("styled-components");
var url_join_1 = require("url-join");
var open_notebook_1 = require("../triggers/open-notebook");
var ListingRoot = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin-top: 2rem;\n  padding-left: 2rem;\n  padding-right: 2rem;\n"], ["\n  margin-top: 2rem;\n  padding-left: 2rem;\n  padding-right: 2rem;\n"])));
var DirectoryApp = /** @class */ (function (_super) {
    __extends(DirectoryApp, _super);
    function DirectoryApp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.openNotebook = function (ks) {
            open_notebook_1.openNotebook(_this.props.host, ks, {
                appBase: _this.props.appBase,
                appVersion: _this.props.appVersion,
                // Since we're looking at a directory, the base dir is the directory we are in
                baseDir: _this.props.content.filepath
            });
        };
        return _this;
    }
    DirectoryApp.prototype.render = function () {
        var _this = this;
        var atRoot = this.props.content.filepath === "/";
        var dotdothref = url_join_1.default(this.props.appBase, 
        // Make sure leading / and .. don't navigate outside of the appBase
        url_join_1.default(this.props.content.filepath, ".."));
        var dotdotlink = (<a href={dotdothref} title="Navigate down a directory" role="button">
        {".."}
      </a>);
        return (<React.Fragment>
        <connected_components_1.NewNotebookNavigation onClick={this.openNotebook}/>
        <ListingRoot>
          <directory_listing_1.Listing>
            {atRoot ? null : (
        // TODO: Create a contentRef for `..`, even though it's a placeholder
        // When we're not at the root of the tree, show `..`
        <directory_listing_1.Entry>
                <directory_listing_1.Icon fileType={"directory"}/>
                <directory_listing_1.Name>{dotdotlink}</directory_listing_1.Name>
                <directory_listing_1.LastSaved lastModified={null}/>
              </directory_listing_1.Entry>)}
            {this.props.contents.map(function (entry, index) {
            var link = (<a href={url_join_1.default(_this.props.appBase, entry.path)} 
            // When it's a notebook, we open a new tab
            target={entry.type === "notebook" ? "_blank" : undefined}>
                  {entry.name}
                </a>);
            return (<directory_listing_1.Entry key={index}>
                  <directory_listing_1.Icon fileType={entry.type}/>
                  <directory_listing_1.Name>{link}</directory_listing_1.Name>
                  <directory_listing_1.LastSaved lastModified={entry.last_modified}/>
                </directory_listing_1.Entry>);
        })}
          </directory_listing_1.Listing>
        </ListingRoot>
      </React.Fragment>);
    };
    return DirectoryApp;
}(React.PureComponent));
exports.DirectoryApp = DirectoryApp;
var makeMapStateToDirectoryProps = function (initialState, initialProps) {
    var contentRef = initialProps.contentRef, appBase = initialProps.appBase;
    var mapStateToDirectoryProps = function (state) {
        var content = core_1.selectors.content(state, initialProps);
        var contents = [];
        var host = core_1.selectors.currentHost(state);
        if (host.type !== "jupyter") {
            throw new Error("This component only works with jupyter servers");
        }
        if (!content || content.type !== "directory") {
            throw new Error("The directory component should only be used with directory contents");
        }
        content.model.items.map(function (entryRef) {
            var row = core_1.selectors.content(state, { contentRef: entryRef });
            if (!row) {
                return {
                    last_modified: new Date(),
                    name: "",
                    path: "",
                    type: ""
                };
            }
            if (row.type !== "dummy") {
                return null;
            }
            contents.push({
                last_modified: row.lastSaved,
                name: row.filepath,
                path: row.filepath,
                type: row.assumedType
            });
        });
        return {
            appBase: appBase,
            appVersion: core_1.selectors.appVersion(state),
            content: content,
            contentRef: contentRef,
            contents: contents,
            host: host
        };
    };
    return mapStateToDirectoryProps;
};
exports.ConnectedDirectory = react_redux_1.connect(makeMapStateToDirectoryProps)(DirectoryApp);
exports.default = exports.ConnectedDirectory;
var templateObject_1;
