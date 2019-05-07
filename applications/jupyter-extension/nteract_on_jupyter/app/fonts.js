"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: There is the potential to have a Flash-of-Unstyled-Content since this is
//       now async
var webfontloader_1 = require("webfontloader");
webfontloader_1.load({
    google: {
        families: ["Source Sans Pro", "Source Serif Pro", "Source Code Pro"]
    }
});
