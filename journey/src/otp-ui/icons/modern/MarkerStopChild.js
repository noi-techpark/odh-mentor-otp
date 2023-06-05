// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from "react";

const MarkerStopChild = ({ title, iconColor = '#fff', markerColor = '#fff', ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 19 19">
    {title ? <title>{title}</title> : null}
    <g fill={iconColor} stroke={markerColor} strokeWidth="3">
      <circle cx="8" cy="8" r="8" stroke="none"/>
      <circle cx="8" cy="8" r="5" fill="none"/>
    </g>
  </svg>
);

export default MarkerStopChild;
