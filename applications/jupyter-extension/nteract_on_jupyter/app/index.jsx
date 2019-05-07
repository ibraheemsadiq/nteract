"use strict";
/**
 * Main entry point for the web notebook UI
 */
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
require("@blueprintjs/core/lib/css/blueprint.css");
require("@blueprintjs/select/lib/css/blueprint-select.css");
require("codemirror/addon/hint/show-hint.css");
require("codemirror/lib/codemirror.css");
// Until we're switched to blueprint for the menu, we have our own custom css
// for the rc-menu style menu
require("./notebook-menu.css");
require("@nteract/styles/app.css");
require("@nteract/styles/global-variables.css");
require("@nteract/styles/editor-overrides.css");
var url_join_1 = require("url-join");
var rootEl = document.querySelector("#root");
var dataEl = document.querySelector("#jupyter-config-data");
if (!rootEl || !dataEl) {
    alert("Something drastic happened, and we don't have config data");
}
else {
    var config_2 = config_1.readConfig(rootEl, dataEl);
    var webpackPublicPath = url_join_1.default(config_2.assetUrl, "nteract/static/dist/");
    // Allow chunks from webpack to load from their built location
    // NOTE: This _must_ run synchronously before webpack tries to load other
    // chunks, and must be a free variable
    // @ts-ignore
    __webpack_public_path__ = webpackPublicPath;
    Promise.resolve().then(function () { return require("./bootstrap"); }).then(function (module) {
        module.main(config_2, rootEl);
    });
}
