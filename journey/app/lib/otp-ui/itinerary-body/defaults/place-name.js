import { configType, placeType } from "../../core-utils/types";
import { getPlaceName } from "../../core-utils/itinerary";
import PropTypes from "prop-types";
import React from "react";

export default function PlaceName({ config, interline, place }) {
  return (
    <>
      {interline ? (
        <>
          Stay on Board at <b>{place.name}</b>
        </>
      ) : (
        <>{getPlaceName(place, config.companies)}</>
      )}
      {/* TODO: take another pass on this when working the Transit Leg */}
      {/* Place subheading: Transit stop */}
      {place.stopId && !interline && (
        <span className="otp-ui-stopIdSpan">ID {place.stopId.split(":")[1]}</span>
        /*
        TODO: There is no explicit stop button on the mocks.
        Have a question out to marketing as to whether the above StopID
        is a button to navigate the user to the arrival list for the stop
        Thats what the button below does
      */
        /* <ViewStopButton stopId={place.stopId} /> */
      )}
    </>
  );
}

PlaceName.propTypes = {
  config: configType.isRequired,
  interline: PropTypes.bool,
  place: placeType.isRequired
};

PlaceName.defaultProps = {
  interline: false
};
