"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _faSolid = require("styled-icons/fa-solid");

var _velocityReact = require("velocity-react");

var Styled = _interopRequireWildcard(require("./styled"));

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function () {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

class TripDetail extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "toggle", () => {
      const {
        expanded
      } = this.state;
      if (expanded) this.onHideClick();else this.onExpandClick();
    });

    _defineProperty(this, "onExpandClick", () => {
      this.setState({
        expanded: true
      });
    });

    _defineProperty(this, "onHideClick", () => {
      this.setState({
        expanded: false
      });
    });

    this.state = {
      expanded: false
    };
  }

  render() {
    const {
      icon,
      summary,
      description
    } = this.props;
    const {
      expanded
    } = this.state;
    return /*#__PURE__*/_react.default.createElement(Styled.TripDetail, null, /*#__PURE__*/_react.default.createElement(Styled.TripDetailIcon, null, icon), /*#__PURE__*/_react.default.createElement(Styled.TripDetailSummary, null, summary, description && /*#__PURE__*/_react.default.createElement(Styled.ExpandButton, {
      onClick: this.toggle
    }, /*#__PURE__*/_react.default.createElement(_faSolid.QuestionCircle, {
      size: "0.92em"
    })), /*#__PURE__*/_react.default.createElement(_velocityReact.VelocityTransitionGroup, {
      enter: {
        animation: "slideDown"
      },
      leave: {
        animation: "slideUp"
      }
    }, expanded && /*#__PURE__*/_react.default.createElement(Styled.TripDetailDescription, null, /*#__PURE__*/_react.default.createElement(Styled.HideButton, {
      onClick: this.onHideClick
    }, /*#__PURE__*/_react.default.createElement(_faSolid.TimesCircle, {
      size: "0.92em"
    })), description))));
  }

}

exports.default = TripDetail;
TripDetail.propTypes = {
  icon: _propTypes.default.node.isRequired,
  summary: _propTypes.default.node.isRequired,
  description: _propTypes.default.node
};
TripDetail.defaultProps = {
  description: undefined
};
module.exports = exports.default;

//# sourceMappingURL=trip-detail.js