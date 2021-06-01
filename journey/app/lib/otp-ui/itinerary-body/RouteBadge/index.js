import React from "react";
import PropTypes from "prop-types";

const RouteBadge = ({ color, abbreviation, name }) => {
  return (
    <div className="otp-ui-routeBadge" style={{ backgroundColor: color }}>
      <span className="otp-ui-routeBadge__abbr">{abbreviation}</span>
      <span>{name}</span>
    </div>
  );
};

RouteBadge.propTypes = {
  color: PropTypes.string,
  abbreviation: PropTypes.string,
  name: PropTypes.string.isRequired
};

RouteBadge.defaultProps = {
  abbreviation: undefined,
  color: "#084c8d"
};

export default RouteBadge;
