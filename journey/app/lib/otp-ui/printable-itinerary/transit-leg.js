import { formatTime } from "../core-utils/time";
import {
  legType,
  timeOptionsType
} from "../core-utils/types";
import PropTypes from "prop-types";
import React from "react";

export default function TransitLeg({
  leg,
  LegIcon,
  interlineFollows,
  timeOptions
}) {
  // Handle case of transit leg interlined w/ previous
  if (leg.interlineWithPreviousLeg) {
    return (
      <div className="otp-ui-printableItineraryLeg otp-ui-printableItineraryLeg--noBorder">
        <div className="otp-ui-printableItineraryLeg__body">
          <div className="otp-ui-printableItineraryLeg__header">
            Continues as{" "}
            <strong>
              {leg.routeShortName} {leg.routeLongName}
            </strong>{" "}
            to <strong>{leg.to.name}</strong>
          </div>
          <div className="otp-ui-printableItineraryLeg__detail">
            <div>
              Get off at <b>{leg.to.name}</b> at{" "}
              {formatTime(leg.endTime, timeOptions)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="otp-ui-printableItineraryLeg">
      <div className="otp-ui-printableItineraryLeg__icon">
        <LegIcon leg={leg} />
      </div>
      <div className="otp-ui-printableItineraryLeg__body">
        <div className="otp-ui-printableItineraryLeg__header">
          <strong>
            {leg.routeShortName} {leg.routeLongName}
          </strong>{" "}
          to <strong>{leg.to.name}</strong>
        </div>
        <div className="otp-ui-printableItineraryLeg__detail">
          <div>
            Board at <b>{leg.from.name}</b> at{" "}
            {formatTime(leg.startTime, timeOptions)}
          </div>
          <div>
            {interlineFollows ? (
              <span>
                Stay on board at <b>{leg.to.name}</b>
              </span>
            ) : (
              <span>
                Get off at <b>{leg.to.name}</b> at{" "}
                {formatTime(leg.endTime, timeOptions)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

TransitLeg.propTypes = {
  interlineFollows: PropTypes.bool,
  leg: legType.isRequired,
  LegIcon: PropTypes.elementType.isRequired,
  timeOptions: timeOptionsType
};

TransitLeg.defaultProps = {
  interlineFollows: false,
  timeOptions: null
};
