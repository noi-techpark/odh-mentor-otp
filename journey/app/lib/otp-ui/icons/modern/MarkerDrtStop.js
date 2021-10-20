import React from "react";

const MarkerDrtStop = ({ title, iconColor = '#fff', markerColor = '#fff', ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="-2 -2 23 23">
    {title ? <title>{title}</title> : null}
    <g fill={iconColor} stroke={markerColor} strokeWidth="4">

    <circle cx="9.5" cy="9.5" r="9.5" fill="{iconColor}"/>
    </g>
  </svg>
);

export default MarkerDrtStop;
