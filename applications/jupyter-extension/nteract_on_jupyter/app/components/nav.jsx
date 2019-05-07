"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styled_components_1 = require("styled-components");
var NavUl = styled_components_1.default.ul(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  justify-content: space-between;\n  padding: 10px 20px;\n  margin: 0 auto;\n  width: 100%;\n"], ["\n  display: flex;\n  justify-content: space-between;\n  padding: 10px 20px;\n  margin: 0 auto;\n  width: 100%;\n"])));
var NavLi = styled_components_1.default.li(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  box-sizing: border-box;\n  padding: 0px 0px;\n\n  /* \n   * When we have a nav section that ends up on the right, \n   * reverse the padding order \n   */\n  :not(:first-child):last-child > :global(ul > li) {\n    margin: 0px 0px 0px var(--nt-spacing-xl);\n  }\n"], ["\n  display: flex;\n  box-sizing: border-box;\n  padding: 0px 0px;\n\n  /* \n   * When we have a nav section that ends up on the right, \n   * reverse the padding order \n   */\n  :not(:first-child):last-child > :global(ul > li) {\n    margin: 0px 0px 0px var(--nt-spacing-xl);\n  }\n"])));
var NavSectionUl = styled_components_1.default.ul(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  margin: 0 auto;\n  padding: 0px 0px;\n  display: flex;\n  justify-content: space-between;\n"], ["\n  margin: 0 auto;\n  padding: 0px 0px;\n  display: flex;\n  justify-content: space-between;\n"])));
var NavSectionLi = styled_components_1.default.li(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: flex;\n  padding: 0px 0px;\n  margin: 0px var(--nt-spacing-xl) 0px 0px;\n"], ["\n  display: flex;\n  padding: 0px 0px;\n  margin: 0px var(--nt-spacing-xl) 0px 0px;\n"])));
var WrapperDiv = styled_components_1.default.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  background-color: hsl(0, 0%, 94%);\n  box-sizing: border-box;\n"], ["\n  background-color: hsl(0, 0%, 94%);\n  box-sizing: border-box;\n"])));
exports.NavSection = function (props) { return (<NavSectionUl>
    {React.Children.map(props.children, function (child) {
    if (child === null) {
        return null;
    }
    return <NavSectionLi className="nav-item">{child}</NavSectionLi>;
})}
  </NavSectionUl>); };
exports.Nav = function (props) { return (<WrapperDiv>
    <NavUl>
      {React.Children.map(props.children, function (child) {
    return <NavLi>{child}</NavLi>;
})}
    </NavUl>
  </WrapperDiv>); };
exports.default = exports.Nav;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
