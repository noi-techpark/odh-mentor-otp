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
      /*transform="translate(21 36)"*/
      style={{fontSize:18}}
      fill={textColor}
      dy=".3em" textAnchor="middle"
      x="50%"
      y="50%"
      >
      {text}
   </text>
</svg>
);

export default MarkerCluster;


