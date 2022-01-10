import coreUtils from "../../core-utils";
import LocationIcon from "../../location-icon";
import PropTypes from "prop-types";
import React from "react";
import { Circle } from "@styled-icons/fa-solid";

function getLegCSSClass(mode) {
  switch (mode) {
    case "WALK":
      return 'is-walk';
    case "BICYCLE":
    case "BICYCLE_RENT":
      return 'is-bicycle';
    case "CAR":
      return 'is-car';
    case "MICROMOBILITY":
    case "MICROMOBILITY_RENT":
      return 'is-micromobility';
    default:
      return 'is-transit';
  }
}

export default function LineColumnContent({
  interline,
  isDestination,
  lastLeg,
  leg,
  legIndex
}) {
  let legBadge;
  if (interline) {
    // Interlined. Don't create a leg badge as a stop marker should be inserted
    // from the place name
  } else if (isDestination) {
    // Desitination
    legBadge = (
      <LocationIcon size={20} type="to" className="otp-ui-lineColumnContent__iconLocation" />
    );
  } else if (legIndex === 0) {
    // Origin
    legBadge = (
      <LocationIcon size={20} type="from" className="otp-ui-lineColumnContent__iconLocation" />
    );
  } else if (
    leg.from.bikeShareId ||
    (lastLeg.from.bikeShareId && leg.mode === "WALK")
  ) {
    // start or end of a bike rental leg (not including origin or
    // destination)
    legBadge = <Circle size={17} color="red" className="otp-ui-lineColumnContent__iconCircle"/>;
  } else if (
    leg.from.vertexType === "VEHICLERENTAL" ||
    (lastLeg.from.vertexType === "VEHICLERENTAL" && leg.mode === "WALK")
  ) {
    // start or end of a vehicle rental leg (not including origin or
    // destination)
    legBadge = <Circle size={17} color="#f5a729" className="otp-ui-lineColumnContent__iconCircle"/>;
  } else if (
    (leg.mode === "CAR" && lastLeg.mode === "WALK") ||
    (lastLeg.mode === "CAR" && leg.mode === "WALK")
  ) {
    // start or end of a car rental/TNC/P&R leg (not including origin or
    // destination)
    legBadge = <Circle size={17} color="#888" className="otp-ui-lineColumnContent__iconCircle"/>;
  } else {
    legBadge = (
      <>
        <Circle size={20} color="black" className="otp-ui-lineColumnContent__iconCircle" />
        <Circle size={14} color="white" className="otp-ui-lineColumnContent__iconCircle is-inner" />
      </>
    );
  }

  return (
    <span className="otp-ui-lineColumnContent">
      {!isDestination && (
        <>
          <div
            className={`otp-ui-lineColumnContent__line ${getLegCSSClass(leg.mode)}`}
            style={{
              backgroundColor: coreUtils.itinerary.isTransit(leg.mode)
                  ? leg.routeColor
                    ? `#${leg.routeColor}`
                    : "#095980"
                  : 'inherit'
            }}
          >
          </div>
        </>
      )}
      <span className="otp-ui-lineColumnContent__icon">{legBadge}</span>
    </span>
  );
}

LineColumnContent.propTypes = {
  /** whether this leg is an interlined-transit leg */
  interline: PropTypes.bool.isRequired,
  /** whether this place row represents the destination */
  isDestination: PropTypes.bool.isRequired,
  /** Contains details about leg object that is being displayed */
  lastLeg: coreUtils.types.legType,
  /** Contains details about leg object that is being displayed */
  leg: coreUtils.types.legType.isRequired,
  /** the index of the leg in the itinerary leg list */
  legIndex: PropTypes.number.isRequired
};

LineColumnContent.defaultProps = {
  /** can be null if it's the first leg */
  lastLeg: null
};
