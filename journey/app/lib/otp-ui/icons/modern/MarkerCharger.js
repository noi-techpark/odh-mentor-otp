import React from "react";

const MarkerCharger = ({ title, width = 54, height = 62, markerColor = '#000', iconColor = '#fff', ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} {...props} viewBox="0 0 54 61.96">
    <g id="Group_165" data-name="Group 165" transform="translate(-1323.585 -290.965)">
      <g id="noun_Charging_Station_976545" data-name="noun_Charging Station_976545" transform="translate(1329.162 295.042)">
        <rect fill={markerColor} stroke='white' id="Rectangle_38" data-name="Rectangle 38" width="54" height="51" rx="10" transform="translate(-5.577 -4.077)" />
        <path fill={markerColor} id="Path_21" data-name="Path 21" d="M798.4,1802.6l10.96,10.96,10.96-10.96Z" transform="translate(-787.942 -1756.678)" />
        <path fill={iconColor} id="Path_20" data-name="Path 20" d="M36.256,45.06V39.3h-.778a4.031,4.031,0,0,1-3.363-6.217l.961-1.489-7.389.019,2.537-5.765H36.78L39.268,22H26.95a1.922,1.922,0,0,0-1.744,1.163l-2.815,6.524H19.922a1.922,1.922,0,0,0,0,3.843h.822l-.822,1.922v5.765a3.843,3.843,0,0,0,1.922,3.31v2.455A1.922,1.922,0,0,0,23.765,48.9h1.922a1.922,1.922,0,0,0,1.922-1.922V45.06ZM25.687,37.374A1.922,1.922,0,1,1,23.765,39.3,1.922,1.922,0,0,1,25.687,37.374Zm22.878-1.115-7.893,12.2a.831.831,0,0,1-1.533-.452V36.413H35.478a1.148,1.148,0,0,1-.961-1.768l7.893-12.2a.831.831,0,0,1,1.533.452V34.491H47.6a1.148,1.148,0,0,1,.966,1.768Z" transform="translate(-11.95 -14.029)" />
      </g>
    </g>
  </svg>
);

export default MarkerCharger;


