import React from "react";

const MarkerLocationTo = ({ width = 49, height = 49, iconColor = '#000', markerColor = '#fff', ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 49 49">
    <g transform="translate(-1112 -871)">
      <g transform="translate(1112 871)" fill={markerColor} stroke={iconColor} strokeWidth="4">
        <circle cx="24.5" cy="24.5" r="24.5" stroke="none"/>
        <circle cx="24.5" cy="24.5" r="22.5" fill="none"/>
      </g>
      <g transform="translate(1134.09 107.5)">
        <path d="M23.285,2.5A7.2,7.2,0,0,0,15.91,9.507a6.73,6.73,0,0,0,1.4,4.11,1.452,1.452,0,0,0,.149.433l4.379,8.158a1.664,1.664,0,0,0,2.895,0l4.379-8.173a1.452,1.452,0,0,0,.149-.433,6.73,6.73,0,0,0,1.4-4.11A7.2,7.2,0,0,0,23.285,2.5ZM23.1,12.473a2.9,2.9,0,0,1-2.975-2.825,2.978,2.978,0,0,1,5.949,0A2.9,2.9,0,0,1,23.1,12.473Z" transform="translate(-21 775)" fill={iconColor}/>
      </g>
    </g>
  </svg>
);

export default MarkerLocationTo;


