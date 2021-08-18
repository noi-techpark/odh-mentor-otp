import React from "react";

const MarkerBikeSharing = ({ title, width = 55, height = 63.48, markerColor = '#000', iconColor = '#fff', ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} {...props} viewBox="0 0 55 63.48">
    <g id="Group_165" data-name="Group 165" transform="translate(-1368 -379.734)">
      <g id="Group_141" data-name="Group 141" transform="translate(863 -454.266)">
        <circle id="Ellipse_34" data-name="Ellipse 34" cx="27.5" cy="27.5" r="27.5" transform="translate(505 834)" fill={markerColor}/>
        <path id="Path_33" data-name="Path 33" d="M798.4,1802.6l10.96,10.96,10.96-10.96Z" transform="translate(-276.864 -916.082)" fill={markerColor}/>
        <g id="Group_136" data-name="Group 136" transform="translate(517.208 853.278)">
          <g id="noun_Time_2415472" transform="translate(-5.599 -7.608)">
            <g id="Layer_2" data-name="Layer 2" transform="translate(0 0)">
              <path id="Path_78" data-name="Path 78" d="M13.515,26.029A12.515,12.515,0,1,1,26.029,13.515,12.515,12.515,0,0,1,13.515,26.029Zm0-23.361A10.846,10.846,0,1,0,24.361,13.515,10.846,10.846,0,0,0,13.515,2.669Z" transform="translate(-1 -1)" fill={iconColor}/>
              <path id="Path_79" data-name="Path 79" d="M11.029,17.313h0a.834.834,0,0,1,.192-1.168l3.1-2.228V6.834A.834.834,0,0,1,15.15,6h0a.834.834,0,0,1,.834.834v7.934L12.2,17.505a.834.834,0,0,1-1.168-.192Z" transform="translate(-2.635 -1.828)" fill={iconColor}/>
            </g>
          </g>
          <g id="noun_bike_sharing_1773520" data-name="noun_bike sharing_1773520" transform="translate(8.37 2.907)">
            <ellipse id="Ellipse_43" data-name="Ellipse 43" cx="4.812" cy="5.008" rx="4.812" ry="5.008" transform="translate(0.606 10.573)" fill={markerColor}/>
            <path id="Path_81" data-name="Path 81" d="M27.4,26.117c-.118,0-.234.01-.35.018L24.912,16.98a.772.772,0,0,0-.565-.574l-2.472-.618-.375,1.5,2.015.5.721,3.079-.027-.019L18.2,29.212a2.137,2.137,0,0,0-.219.02v-.025l-.208.026L14.9,22.05l2.464-.569V20.246H10.253a2.163,2.163,0,0,0,2.163,2.163h.96l2.809,7.023-.756.095a5.407,5.407,0,1,0,.108,3.7l2.441.305V33.51a2.124,2.124,0,0,0,.309.025,2.16,2.16,0,0,0,1.839-3.3l4.753-6.613.663,2.83a5.394,5.394,0,1,0,1.862-.337Zm-17,9.271a3.863,3.863,0,1,1,3.416-5.661l-3.261.408a1.236,1.236,0,0,0,0,2.472l3.4.425A3.869,3.869,0,0,1,10.408,35.388Zm17,0A3.863,3.863,0,0,1,25.9,27.969l.91,3.887,1.5-.352-.9-3.841a3.863,3.863,0,0,1-.008,7.726Z" transform="translate(-5 -15.788)" fill={iconColor}/>
            <path id="Path_82" data-name="Path 82" d="M78.635,26.467l1.236-5.254H74l1.236,5.254Z" transform="translate(-52.677 -19.537)" fill={iconColor}/>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default MarkerBikeSharing;


