"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));

var _lodash = _interopRequireDefault(require("lodash.memoize"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _reactFontawesome = _interopRequireDefault(require("react-fontawesome"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Styles.
const fancyAddLocationCss = `
  background-color: #337ab7;
  color: #fff;
`;
const StyledAddon = (0, _styledComponents.default)(_reactBootstrap.InputGroup.Addon)`
  min-width: 40px;
`;
const NewLocationAddon = (0, _styledComponents.default)(StyledAddon)`
  ${fancyAddLocationCss}
`;
const NewLocationFormControl = (0, _styledComponents.default)(_reactBootstrap.FormControl)`
  ${fancyAddLocationCss}
  ::placeholder {
    color: #fff;
  }
  &:focus {
    background-color: unset;
    color: unset;
    ::placeholder {
      color: unset;
    }
  }
`; // Helper filter functions.

const isHome = loc => loc.type === 'home';

const isWork = loc => loc.type === 'work';

const notHomeOrWork = loc => loc.type !== 'home' && loc.type !== 'work';
/**
 * User's saved locations editor.
 */


class FavoriteLocationsPane extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_handleAddNewLocation", e => {
      const value = e.target.value || '';

      if (value.trim().length > 0) {
        const {
          userData,
          onUserDataChange
        } = this.props; // FIXME: remove assigning [] when null.

        const {
          savedLocations = []
        } = userData; // Create a copy of savedLocations and add the new location to the copied array.

        const newLocations = (0, _cloneDeep.default)(savedLocations);
        newLocations.push({
          address: value.trim(),
          icon: 'map-marker',
          type: 'custom'
        }); // Event onChange will trigger after this and before rerender,
        // so DO empty the input box value so the user can enter their next location.

        e.target.value = null;
        onUserDataChange({
          savedLocations: newLocations
        });
      }
    });

    _defineProperty(this, "_handleAddressChange", (0, _lodash.default)(location => e => {
      const {
        userData,
        onUserDataChange
      } = this.props; // FIXME: remove assigning [] when null.

      const {
        savedLocations = []
      } = userData;
      const value = e.target.value;
      const isValueEmpty = !value || value === '';
      const nonEmptyLocation = isValueEmpty ? null : location; // Update location address, ohterwise it stalls the input box.

      location.address = value; // Create a new array for savedLocations.

      let newLocations = []; // Add home/work as first entries to the new state only if
      // - user edited home/work to non-empty, or
      // - user edited another location and home/work is in savedLocations.

      const homeLocation = isHome(location) && nonEmptyLocation || savedLocations.find(isHome);
      if (homeLocation) newLocations.push(homeLocation);
      const workLocation = isWork(location) && nonEmptyLocation || savedLocations.find(isWork);
      if (workLocation) newLocations.push(workLocation); // Add the rest if it is not home or work
      // and if the new address of this one is not null or empty.

      newLocations = newLocations.concat(savedLocations.filter(notHomeOrWork).filter(loc => loc !== location || !isValueEmpty));
      onUserDataChange({
        savedLocations: newLocations
      });
    }));
  }

  render() {
    const {
      userData
    } = this.props; // FIXME: remove assigning [] when null.

    const {
      savedLocations = []
    } = userData; // Build an 'effective' list of locations for display,
    // where at least one 'home' and one 'work', are always present even if blank.
    // In theory there could be multiple home or work locations.
    // Just pick the first one.

    const homeLocation = savedLocations.find(isHome) || {
      address: null,
      icon: 'home',
      type: 'home'
    };
    const workLocation = savedLocations.find(isWork) || {
      address: null,
      icon: 'briefcase',
      type: 'work'
    };
    const effectiveLocations = [homeLocation, workLocation, ...savedLocations.filter(notHomeOrWork)];
    return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.ControlLabel, null, "Add the places you frequent often to save time planning trips:"), effectiveLocations.map((loc, index) => /*#__PURE__*/_react.default.createElement(_reactBootstrap.FormGroup, {
      key: index
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.InputGroup, null, /*#__PURE__*/_react.default.createElement(StyledAddon, {
      title: loc.type
    }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.default, {
      name: loc.icon
    })), /*#__PURE__*/_react.default.createElement(_reactBootstrap.FormControl, {
      onChange: this._handleAddressChange(loc),
      placeholder: `Add ${loc.type}`,
      type: "text",
      value: loc.address
    })))), /*#__PURE__*/_react.default.createElement(_reactBootstrap.FormGroup, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.InputGroup, null, /*#__PURE__*/_react.default.createElement(NewLocationAddon, null, /*#__PURE__*/_react.default.createElement(_reactFontawesome.default, {
      name: "plus"
    })), /*#__PURE__*/_react.default.createElement(NewLocationFormControl, {
      onBlur: this._handleAddNewLocation,
      placeholder: "Add another place",
      type: "text"
    }))));
  }

}

_defineProperty(FavoriteLocationsPane, "propTypes", {
  onUserDataChange: _propTypes.default.func.isRequired,
  userData: _propTypes.default.object.isRequired
});

var _default = FavoriteLocationsPane;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=favorite-locations-pane.js