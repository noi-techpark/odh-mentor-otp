import React from "react";

const MarkerStation = ({ title, iconColor = '#fff', markerColor = '#fff', ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24">
    {title ? <title>{title}</title> : null}
    <g fill={markerColor} stroke={iconColor} strokeWidth="4">
      <circle cx="12" cy="12" r="12" stroke="none"/>
      <circle cx="12" cy="12" r="10" fill="none"/>
    </g>
  </svg>
);

export default MarkerStation;
