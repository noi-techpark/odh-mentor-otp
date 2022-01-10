import currencyFormatter from "currency-formatter";
import {
  formatDuration,
  formatTime
} from "../../core-utils/time";
import {
  configType,
  legType,
  timeOptionsType
} from "../../core-utils/types";
import { isMobile } from "../../core-utils/ui";
import React from "react";
import PropTypes from "prop-types";

import AccessLegSummary from "./access-leg-summary";

export default function TNCLeg({
  config,
  LYFT_CLIENT_ID,
  UBER_CLIENT_ID,
  followsTransit,
  leg,
  LegIcon,
  onSummaryClick,
  showLegIcon,
  timeOptions
}) {
  const universalLinks = {
    UBER: `https://m.uber.com/${
      isMobile() ? "ul/" : ""
    }?client_id=${UBER_CLIENT_ID}&action=setPickup&pickup[latitude]=${
      leg.from.lat
    }&pickup[longitude]=${leg.from.lon}&pickup[formatted_address]=${encodeURI(
      leg.from.name
    )}&dropoff[latitude]=${leg.to.lat}&dropoff[longitude]=${
      leg.to.lon
    }&dropoff[formatted_address]=${encodeURI(leg.to.name)}`,
    LYFT: `https://lyft.com/ride?id=lyft&partner=${LYFT_CLIENT_ID}&pickup[latitude]=${leg.from.lat}&pickup[longitude]=${leg.from.lon}&destination[latitude]=${leg.to.lat}&destination[longitude]=${leg.to.lon}`
  };
  const { tncData } = leg;

  if (!tncData || !tncData.estimatedArrival) return null;
  return (
    <div>
      <div>
        <small><strong>
        Wait{" "}
        {!followsTransit && (
          <span>{Math.round(tncData.estimatedArrival / 60)} minutes </span>
        )}
        for {tncData.displayName} pickup
        </strong></small>
      </div>

      <div className="otp-ui-legBody">
        {/* The icon/summary row */}
        <AccessLegSummary
          config={config}
          leg={leg}
          LegIcon={LegIcon}
          onSummaryClick={onSummaryClick}
          showLegIcon={showLegIcon}
        />

        {/* The "Book Ride" button */}
        <div className="otp-ui-bookTNCRideBtnContainer">
          <a className="otp-ui-TNCBookRideBtn"
            href={universalLinks[tncData.company]}
            target={isMobile() ? "_self" : "_blank"}
          >
            Book Ride
          </a>
          {followsTransit && <div className="otp-ui-bookLaterPointer"></div>}
          {followsTransit && (
            <div className="otp-ui-bookLaterContainer">
              <div className="otp-ui-bookLaterContainer__innerContainer">
                <div className="otp-ui-bookLaterContainer__text">
                  Wait until{" "}
                  {formatTime(
                    leg.startTime - tncData.estimatedArrival * 1000,
                    timeOptions
                  )}{" "}
                  to book
                </div>
              </div>
            </div>
          )}
        </div>

        {/* The estimated travel time */}
        <div>
          Estimated travel time: {formatDuration(leg.duration)} (does not
          account for traffic)
        </div>

        {/* The estimated travel cost */}
        {tncData.minCost && (
          <div>
            Estimated cost:{" "}
            {`${currencyFormatter.format(tncData.minCost, {
              code: tncData.currency
            })} - ${currencyFormatter.format(tncData.maxCost, {
              code: tncData.currency
            })}`}
          </div>
        )}
      </div>
    </div>
  );
}

TNCLeg.propTypes = {
  config: configType.isRequired,
  LYFT_CLIENT_ID: PropTypes.string,
  UBER_CLIENT_ID: PropTypes.string,
  followsTransit: PropTypes.bool.isRequired,
  leg: legType.isRequired,
  LegIcon: PropTypes.elementType.isRequired,
  onSummaryClick: PropTypes.func.isRequired,
  showLegIcon: PropTypes.bool.isRequired,
  timeOptions: timeOptionsType
};

TNCLeg.defaultProps = {
  LYFT_CLIENT_ID: "",
  UBER_CLIENT_ID: "",
  timeOptions: null
};
