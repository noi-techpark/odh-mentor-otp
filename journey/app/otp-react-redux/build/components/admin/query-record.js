"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var formActions = _interopRequireWildcard(require("../../actions/form"));

var _icon = _interopRequireDefault(require("../narrative/icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Displays information for a query stored for the Call Taker module.
 */
class QueryRecordLayout extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_viewQuery", () => {
      const {
        parseUrlQueryString,
        query
      } = this.props;
      const params = JSON.parse(query.queryParams);

      if ('arriveBy' in params) {
        params.departArrive = params.arriveBy ? 'ARRIVE' : 'DEPART';
      }

      parseUrlQueryString(params);
    });
  }

  render() {
    const {
      index
    } = this.props;
    return /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("button", {
      onClick: this._viewQuery,
      className: "clear-button-formatting"
    }, /*#__PURE__*/_react.default.createElement(_icon.default, {
      type: "search"
    })), ' ', "Query ", index + 1);
  }

}

const mapStateToProps = (state, ownProps) => {
  return {};
};

const {
  parseUrlQueryString
} = formActions;
const mapDispatchToProps = {
  parseUrlQueryString
};
const QueryRecord = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(QueryRecordLayout);
var _default = QueryRecord;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=query-record.js