import { legType } from "../core-utils/types";
import { formatDuration } from "../core-utils/time";
import PropTypes from "prop-types";
import React from "react";

export default function TNCLeg({ leg, LegIcon }) {
  const { tncData } = leg;
  if (!tncData) return null;

  return (
    <div className="otp-ui-printableItineraryLeg">
      <div className="otp-ui-printableItineraryLeg__icon">
        <LegIcon leg={leg} />
      </div>
      <div className="otp-ui-printableItineraryLeg__body">
        <div className="otp-ui-printableItineraryLeg__header">
          <strong>Take {tncData.displayName}</strong> to <strong>{leg.to.name}</strong>
        </div>
        <div className="otp-ui-printableItineraryLeg__detail">
          <div>
            Estimated wait time for pickup:{" "}
            <strong>{formatDuration(tncData.estimatedArrival)}</strong>
          </div>
          <div>
            Estimated travel time: <b>{formatDuration(leg.duration)}</b> (does
            not account for traffic)
          </div>
        </div>
      </div>
    </div>
  );
}

TNCLeg.propTypes = {
  leg: legType.isRequired,
  LegIcon: PropTypes.elementType.isRequired
};
