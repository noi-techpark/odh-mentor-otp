"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = RentedVehicleSubheader;

var _types = require("@opentripplanner/core-utils/lib/types");

var _itinerary = require("@opentripplanner/core-utils/lib/itinerary");

var _react = _interopRequireDefault(require("react"));

var Styled = _interopRequireWildcard(require("../styled"));

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
/**
 * A component to display vehicle rental data. The word "Vehicle" has been used
 * because a future refactor is intended to combine car rental, bike rental
 * and micromobility rental all within this component. The future refactor is
 * assuming that the leg.rentedCar and leg.rentedBike response elements from OTP
 * will eventually be merged into the leg.rentedVehicle element.
 */


function RentedVehicleSubheader({
  config,
  leg
}) {
  const configCompanies = config.companies || []; // Sometimes rented vehicles can be walked over things like stairs or other
  // ways that forbid the main mode of travel.

  if (leg.mode === "WALK") {
    return /*#__PURE__*/_react.default.createElement(Styled.PlaceSubheader, null, /*#__PURE__*/_react.default.createElement("span", null, "Walk vehicle along ", leg.from.name));
  }

  let rentalDescription;

  if (leg.rentedBike) {
    // TODO: Special case for TriMet may need to be refactored.
    rentalDescription = "Pick up shared bike";
  } else {
    // Add company and vehicle labels.
    let companyName = "";
    let vehicleName = ""; // TODO allow more flexibility in customizing these mode strings

    let modeString = leg.rentedVehicle ? "E-scooter" : leg.rentedBike ? "bike" : "car"; // The networks attribute of the from data will only appear at the very
    // beginning of the rental. It is possible that there will be some forced
    // walking that occurs in the middle of the rental, so once the main mode
    // resumes there won't be any network info. In that case we simply return
    // that the rental is continuing.

    if (leg.from.networks) {
      companyName = (0, _itinerary.getCompaniesLabelFromNetworks)(leg.from.networks, configCompanies); // Only show vehicle name for car rentals. For bikes and E-scooters, these
      // IDs/names tend to be less relevant (or entirely useless) in this context.

      if (leg.rentedCar && leg.from.name) {
        vehicleName = leg.from.name;
      }

      modeString = (0, _itinerary.getModeForPlace)(leg.from);
      rentalDescription = `Pick up ${companyName} ${modeString} ${vehicleName}`;
    } else {
      rentalDescription = "Continue using rental";
    }
  } // e.g., Pick up REACHNOW rented car XYZNDB OR
  //       Pick up SPIN E-scooter
  //       Pick up shared bike


  return /*#__PURE__*/_react.default.createElement(Styled.PlaceSubheader, null, rentalDescription);
}

RentedVehicleSubheader.propTypes = {
  config: _types.configType.isRequired,
  leg: _types.legType.isRequired
};
module.exports = exports.default;

//# sourceMappingURL=rented-vehicle-subheader.js