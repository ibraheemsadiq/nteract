"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@nteract/core");
// TODO: Make a proper epic
var rx_jupyter_1 = require("rx-jupyter");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var url_join_1 = require("url-join");
function openNotebook(host, ks, props) {
    var serverConfig = core_1.selectors.serverConfig(host);
    // The notebook they get to start with
    var notebook = {
        cells: [
            {
                cell_type: "code",
                execution_count: null,
                metadata: {},
                outputs: [],
                source: [""]
            }
        ],
        metadata: {
            kernelspec: {
                display_name: ks.displayName,
                language: ks.language,
                name: ks.name
            },
            nteract: {
                version: props.appVersion
            }
        },
        nbformat: 4,
        nbformat_minor: 2
    };
    // NOTE: For the sake of expediency, all the logic to launch a new is
    //       happening here instead of an epic
    rx_jupyter_1.contents
        // Create UntitledXYZ.ipynb by letting the server do it
        .create(serverConfig, props.baseDir, {
        type: "notebook"
        // NOTE: The contents API appears to ignore the content field for new
        // notebook creation.
        //
        // It would be nice if it could take it. Instead we'll create a new
        // notebook for the user and redirect them after we've put in the
        // content we want.
        //
        // Amusingly, this could be used for more general templates to, as
        // well as introduction notebooks.
    })
        .pipe(
    // We only expect one response, it's ajax and we want this subscription
    // to finish so we don't have to unsubscribe
    operators_1.first(), operators_1.mergeMap(function (_a) {
        var response = _a.response;
        var filepath = response.path;
        var sessionPayload = {
            kernel: {
                id: null,
                name: ks.name
            },
            name: "",
            path: filepath,
            type: "notebook"
        };
        return rxjs_1.forkJoin(
        // Get their kernel started up
        rx_jupyter_1.sessions.create(serverConfig, sessionPayload), 
        // Save the initial notebook document
        rx_jupyter_1.contents.save(serverConfig, filepath, {
            content: notebook,
            type: "notebook"
        }));
    }), operators_1.first(), operators_1.map(function (_a) {
        var _session = _a[0], content = _a[1];
        var response = content.response;
        if (content.status > 299 || typeof response === "string") {
            // hack around this old hack around for creating a notebook
            // from the directory ideally this would be in a proper epic
            // instead of leaky async code here
            var message = ["Failed to create notebook due to: "];
            if (typeof response === "string") {
                message.push(response);
            }
            else {
                message.push(JSON.stringify(response));
            }
            alert(message.join(""));
            return;
        }
        var url = url_join_1.default(props.appBase, 
        // Actual file
        response.path);
        // Always open new notebooks in new windows
        var win = window.open(url, "_blank");
        // If they block pop-ups, then we weren't allowed to open the window
        if (win === null) {
            window.location.href = url;
        }
    }))
        .subscribe();
}
exports.openNotebook = openNotebook;
