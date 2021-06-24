import React from "react";

const MarkerParking = ({ title, width = 54, height = 62, markerColor = '#b0d1ef', iconColor = '#5d5d5d', ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} {...props} viewBox="0 0 54 62">
    <g transform="translate(-783 -514)">
      <rect id="Rectangle_35" data-name="Rectangle 35" width="54" height="51" rx="10" transform="translate(783 514)" fill={markerColor}/>
      <text id="P" transform="translate(811 554)" fill={iconColor} font-size="37" font-family="HelveticaNeue-Bold, Helvetica Neue" font-weight="700"><tspan x="-12.34" y="0">P</tspan></text>
      <path id="Path_19" data-name="Path 19" d="M798.4,1802.6l10.96,10.96,10.96-10.96Z" transform="translate(0 -1237.602)" fill={markerColor}/>
    </g>
  </svg>
);

export default MarkerParking;


