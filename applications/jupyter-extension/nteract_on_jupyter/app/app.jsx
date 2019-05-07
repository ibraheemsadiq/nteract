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
var react_notification_system_1 = require("react-notification-system");
var contents_1 = require("./contents");
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.shouldComponentUpdate = function (nextProps) {
        return nextProps.contentRef !== this.props.contentRef;
    };
    App.prototype.render = function () {
        var _this = this;
        return (<React.Fragment>
        <contents_1.default contentRef={this.props.contentRef}/>
        <react_notification_system_1.default ref={function (notificationSystem) {
            _this.notificationSystem = notificationSystem;
        }}/>
      </React.Fragment>);
    };
    return App;
}(React.Component));
exports.default = App;
