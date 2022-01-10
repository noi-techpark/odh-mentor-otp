import React from "react";

const MarkerParkingSensor = ({ title, width = 54, height = 62, markerColor = '#000', iconColor = '#fff', ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} {...props} viewBox="0 0 54 61.96">
    <g id="Group_165" data-name="Group 165" transform="translate(-1312 -301.52)">
      <g id="Group_29" data-name="Group 29" transform="translate(529 -212.48)">
        <rect fill={markerColor} stroke='white' id="Rectangle_35" data-name="Rectangle 35" width="54" height="51" rx="10" transform="translate(783 514)" />
        <path fill={iconColor} id="Path_111" data-name="Path 111" d="M-3.978-13.986V-21.9H.536a12.166,12.166,0,0,1,1.924.148,4.477,4.477,0,0,1,1.628.574,3.124,3.124,0,0,1,1.128,1.2,4.227,4.227,0,0,1,.426,2.035,4.227,4.227,0,0,1-.426,2.035,3.124,3.124,0,0,1-1.128,1.2,4.477,4.477,0,0,1-1.628.574,12.166,12.166,0,0,1-1.924.148ZM-9.787-26.418V0h5.809V-9.472H2.127a11,11,0,0,0,4.218-.721A7.892,7.892,0,0,0,9.176-12.1a7.3,7.3,0,0,0,1.591-2.719,10.047,10.047,0,0,0,.5-3.127,9.991,9.991,0,0,0-.5-3.145,7.32,7.32,0,0,0-1.591-2.7A7.892,7.892,0,0,0,6.345-25.7a11,11,0,0,0-4.218-.721Z" transform="translate(811 554)" />
      </g>
    </g>
  </svg>
);

export default MarkerParkingSensor;


