import React from "react";

//TODO support textColor

const MarkerCluster = ({ title, text, width = 50, height = 50, textColor = '#fff', markerColor = '#000', iconColor = '#fff', ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} {...props} viewBox="0 0 54 61.96">
  <circle
     fill={markerColor}
     style={{opacity:0.3}}
     id="path820"
     cx="27"
     cy="30"
     r="30" />
  <circle
     fill={markerColor}
     style={{opacity:1}}
     r="20"
     cy="30"
     cx="27" />
  <text
     transform="translate(21 38)"
     style={{fontSize:20,textAlign:'center'}}
     x="0"
     y="0"
     id="text818">
  <tspan
   x="0"
   y="0">{text}</tspan>
   </text>
</svg>
);

export default MarkerCluster;


