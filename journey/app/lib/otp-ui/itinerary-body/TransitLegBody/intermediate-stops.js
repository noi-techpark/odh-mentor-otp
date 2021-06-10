import PropTypes from "prop-types";
import React from "react";

export default function IntermediateStops({ stops }) {
  return (
    <>
      {stops.map((stop, k) => {
        return (
          <div className="otp-ui-stopRow" key={k}>
            <div className="otp-ui-stopRow__marker">&bull;</div>
            <div className="otp-ui-stopRow__name">{stop.name}</div>
          </div>
        );
      })}
    </>
  );
}

IntermediateStops.propTypes = {
  stops: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};
