import coreUtils from "../../core-utils";
import LocationIcon from "../../location-icon";
import PropTypes from "prop-types";
import React from "react";

import { toModeBorder, toModeColor } from "../util";
import RouteBadge from "../RouteBadge";

export default function LineColumnContent({
  interline,
  isDestination,
  leg,
  LegIcon,
  toRouteAbbreviation
}) {
  return (
    <div className="otp-ui-legLine">
      {!isDestination && (
        <div className="otp-ui-legLine__innerLine" style={{ borderLeft: toModeBorder(leg.mode, leg.routeColor) }}></div>
      )}
      <div className="otp-ui-legLine__badgeContainer">
        {/* TODO: This is a placeholder for a routebadge when we create the transit leg */}
        {!interline && !isDestination && leg.transitLeg && (
          <RouteBadge
            color={leg.routeColor}
            abbreviation={toRouteAbbreviation(
              parseInt(leg.route, 10) || leg.route
            )}
            name={leg.routeLongName || ""}
          />
        )}
        {!interline && !isDestination && !leg.transitLeg && (
          <div className="otp-ui-legLine__badgeAccess" style={{ backgroundColor: toModeColor(leg.mode, leg.routeColor) }} aria-label={`Travel by ${leg.mode}`}>
            {<LegIcon leg={leg} title={`Travel by ${leg.mode}`} width="66%" />}
          </div>
        )}
        {isDestination && (
          <div className="text-center">
            <LocationIcon size={25} type="to" />
          </div>
        )}
      </div>
    </div>
  );
}

LineColumnContent.propTypes = {
  /** Whether this leg is an interlined-transit leg */
  interline: PropTypes.bool.isRequired,
  /** Whether this place row represents the destination */
  isDestination: PropTypes.bool.isRequired,
  /** Contains details about leg object that is being displayed */
  leg: coreUtils.types.legType,
  /** A component class used to render the icon for a leg */
  LegIcon: PropTypes.elementType.isRequired,
  /** Converts a route's ID to its accepted badge abbreviation */
  toRouteAbbreviation: PropTypes.func.isRequired
};

LineColumnContent.defaultProps = {
  // can be null if this is the destination place
  leg: null
};
