import React from "react";

const Filter = ({ title, width = 26, height = 28, iconColor = '#000', ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 26 28">
    <g id="noun_filter_3604294" transform="translate(-3 -2)">
      <g id="Group_98" data-name="Group 98">
        <path id="Path_54" data-name="Path 54" d="M4,7H9.1A3.99,3.99,0,0,0,13,10a4.079,4.079,0,0,0,3.9-3H28a.945.945,0,0,0,1-1,.945.945,0,0,0-1-1H16.9A3.99,3.99,0,0,0,13,2,4.079,4.079,0,0,0,9.1,5H4A.945.945,0,0,0,3,6,.945.945,0,0,0,4,7Zm9-3a2,2,0,1,1-2,2A2.006,2.006,0,0,1,13,4Z" fill={iconColor} />
        <path id="Path_55" data-name="Path 55" d="M4,17H16.1A3.99,3.99,0,0,0,20,20a4.079,4.079,0,0,0,3.9-3H28a1,1,0,0,0,0-2H23.9A3.99,3.99,0,0,0,20,12a4.079,4.079,0,0,0-3.9,3H4a1,1,0,0,0,0,2Zm16-3a2,2,0,1,1-2,2A2.006,2.006,0,0,1,20,14Z" fill={iconColor}/>
        <path id="Path_56" data-name="Path 56" d="M4,27H9.1A3.99,3.99,0,0,0,13,30a4.079,4.079,0,0,0,3.9-3H28a1,1,0,0,0,0-2H16.9A3.99,3.99,0,0,0,13,22a4.079,4.079,0,0,0-3.9,3H4a1,1,0,0,0,0,2Zm9-3a2,2,0,1,1-2,2A2.006,2.006,0,0,1,13,24Z" fill={iconColor}/>
      </g>
    </g>
  </svg>
);

export default Filter;


