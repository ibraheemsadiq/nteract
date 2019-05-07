"use strict";
/**
 * Reads the jupyter config data that the python side of this
 * jupyter extension writes out to the html page.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_dom_1 = require("react-dom");
var ErrorPage = function (props) { return (<React.Fragment>
    <h1>ERROR</h1>
    <pre>Unable to parse / process the jupyter config data.</pre>
    {props.error ? props.error.message : null}
  </React.Fragment>); };
function readConfig(rootEl, dataEl) {
    if (!dataEl) {
        react_dom_1.default.render(<ErrorPage />, rootEl);
        throw new Error("No jupyter config data element");
    }
    var config;
    try {
        if (!dataEl.textContent) {
            throw new Error("Unable to find Jupyter config data.");
        }
        config = JSON.parse(dataEl.textContent);
    }
    catch (err) {
        react_dom_1.default.render(<ErrorPage error={err}/>, rootEl);
        // Re-throw error
        throw err;
    }
    return config;
}
exports.readConfig = readConfig;
