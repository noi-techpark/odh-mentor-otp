import React from "react";

//TODO support textColor

const MarkerCluster = ({ text, width = 50, height = 50, textColor = '#fff', markerColor = '#000', ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} {...props} viewBox="0 0 54 61.96">
  <circle
     fill={markerColor}
     style={{opacity:0.3}}
     r="24"
     cx="27"
     cy="30" />
  <circle
     fill={markerColor}
     style={{opacity:0.8}}
     r="16"
     cy="30"
     cx="27" />
  <text
     transform="translate(21 36)"
     fill={textColor}
     x="0"
     y="0"
  >
   <tspan style={{fontSize:18}}
   x="0" y="0">{text}</tspan>
  </text>
</svg>
);

export default MarkerCluster;


