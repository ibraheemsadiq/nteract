"use strict";
/**
 * A simple contentRef aware component that renders a little lastSaved
 * display.
 *
 * import LastSaved from "./last-saved"
 * <LastSaved contentRef={someRef} />
 *
 * If the contentRef is available and has a lastSaved, will render something like:
 *
 * Last Saved: 2 minutes ago
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@nteract/core");
var directory_listing_1 = require("@nteract/directory-listing");
var react_redux_1 = require("react-redux");
/**
 * Create our state mapper using makeMapStateToProps
 * Following https://twitter.com/dan_abramov/status/719971882280361985?lang=en
 */
var makeMapStateToProps = function (initialState, initialProps) {
    var contentRef = initialProps.contentRef;
    var mapStateToProps = function (state) {
        var content = core_1.selectors.contentByRef(state).get(contentRef);
        if (!content || !content.lastSaved) {
            return { lastModified: null };
        }
        return { lastModified: content.lastSaved };
    };
    return mapStateToProps;
};
exports.default = react_redux_1.connect(makeMapStateToProps)(directory_listing_1.LastSaved);
