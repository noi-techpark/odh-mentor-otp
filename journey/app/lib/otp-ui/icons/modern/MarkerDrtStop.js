import React from "react";

const MarkerDrtStop = ({ title, iconColor = '#fff', markerColor = '#fff', ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="-2 -2 23 23">
    {title ? <title>{title}</title> : null}
    <g fill={iconColor} stroke={markerColor} strokeWidth="3">
      <rect width="14" height="14" />
    </g>
  </svg>
);

export default MarkerDrtStop;
