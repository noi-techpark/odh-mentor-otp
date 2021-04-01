"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _react = _interopRequireWildcard(require("react"));

var _callTimeCounter = _interopRequireDefault(require("./call-time-counter"));

var _icon = _interopRequireDefault(require("../narrative/icon"));

var _queryRecord = _interopRequireDefault(require("./query-record"));

var _callTaker = require("../../util/call-taker");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Displays information for a particular call record in the Call Taker window.
 */
class CallRecord extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      expanded: false
    });

    _defineProperty(this, "_toggleExpanded", () => {
      const {
        call,
        fetchQueries
      } = this.props;
      const {
        expanded
      } = this.state;
      if (!expanded) fetchQueries(call.id);
      this.setState({
        expanded: !expanded
      });
    });
  }

  render() {
    // FIXME: consolidate red color with call taker controls
    const RED = '#C35134';
    const {
      call,
      index,
      inProgress,
      searches
    } = this.props;
    const {
      expanded
    } = this.state;
    if (!call) return null;

    if (inProgress) {
      // Map search IDs made during active call to queries.
      const activeQueries = call.searches.map(searchId => (0, _callTaker.searchToQuery)(searches[searchId], call, {}));
      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
        className: "pull-right"
      }, /*#__PURE__*/_react.default.createElement(_icon.default, {
        style: {
          color: RED,
          fontSize: '8px',
          verticalAlign: '2px'
        },
        type: "circle",
        className: "animate-flicker"
      }), /*#__PURE__*/_react.default.createElement(_callTimeCounter.default, {
        style: {
          display: 'inline'
        }
      })), /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: "phone",
        className: "fa-flip-horizontal"
      }), ' ', "[Active call]", /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("small", {
        style: {
          marginLeft: '20px'
        }
      }, "In progress... click ", /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: "stop"
      }), " to save", ' ', "(", call.searches.length, " searches)"), /*#__PURE__*/_react.default.createElement("div", null, activeQueries.length > 0 ? activeQueries.map((query, i) => /*#__PURE__*/_react.default.createElement(_queryRecord.default, {
        key: i,
        query: query,
        index: i
      })) : 'No queries recorded.'));
    }

    return /*#__PURE__*/_react.default.createElement("div", {
      style: {
        margin: '5px 0'
      }
    }, /*#__PURE__*/_react.default.createElement("button", {
      style: {
        width: '100%'
      },
      className: "clear-button-formatting",
      onClick: this._toggleExpanded
    }, /*#__PURE__*/_react.default.createElement(_icon.default, {
      type: "phone",
      className: "fa-flip-horizontal"
    }), "Call ", index, " (", (0, _moment.default)(call.endTime).fromNow(), ")"), expanded ? /*#__PURE__*/_react.default.createElement("ul", {
      className: "list-unstyled"
    }, call.queries && call.queries.length > 0 ? call.queries.map((query, i) => /*#__PURE__*/_react.default.createElement(_queryRecord.default, {
      key: i,
      query: query,
      index: i
    })) : 'No queries recorded.') : null);
  }

}

exports.default = CallRecord;
module.exports = exports.default;

//# sourceMappingURL=call-record.js