import React from "react";

const MarkerLocationFrom = ({ width = 41, height = 41, iconColor = '#000', markerColor = '#fff', ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 41 41">
    <g id="Group_166" data-name="Group 166" transform="translate(-1173 -131)">
      <g id="Ellipse_13" data-name="Ellipse 13" transform="translate(1173 131)" fill={markerColor} stroke={iconColor} strokeWidth="4">
        <circle cx="20.5" cy="20.5" r="20.5" stroke="none"/>
        <circle cx="20.5" cy="20.5" r="18.5" fill="none"/>
      </g>
      <circle id="Ellipse_39" data-name="Ellipse 39" cx="8" cy="8" r="8" transform="translate(1186 144)" fill={iconColor}/>
    </g>
  </svg>
);

export default MarkerLocationFrom;


