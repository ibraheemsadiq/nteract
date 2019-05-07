"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var img = {
    logo: 'https://i.ibb.co/DVW2Q8d/wisecube.png',
    height: 25,
    width: 30
};
var ThemedLogo = function (props) { return (<img height={img.height} width={img.width} src={img.logo} alt="WiseCube"/>); };
exports.ThemedLogo = ThemedLogo;
ThemedLogo.defaultProps = {
    height: 20,
    theme: "light"
};
