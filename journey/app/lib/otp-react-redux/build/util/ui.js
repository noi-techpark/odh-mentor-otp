"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderChildrenWithProps = renderChildrenWithProps;

var _react = require("react");

/**
 * Renders children with additional props.
 * Modified from
 * https://stackoverflow.com/questions/32370994/how-to-pass-props-to-this-props-children#32371612
 * @param children the child elements to modify.
 * @param newProps the props to add.
 */
function renderChildrenWithProps(children, newProps) {
  const childrenWithProps = _react.Children.map(children, child => {
    // Checking isValidElement is the safe way and avoids a TS error too.
    if ( /*#__PURE__*/(0, _react.isValidElement)(child)) {
      return /*#__PURE__*/(0, _react.cloneElement)(child, { ...newProps
      });
    }

    return child;
  });

  return childrenWithProps;
}

//# sourceMappingURL=ui.js