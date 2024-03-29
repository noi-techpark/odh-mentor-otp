// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from "react";

const Parking = ({ title, width = 26, height = 22, iconColor = '#000', ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 11.949 14.994">
    <path id="Path_111" data-name="Path 111" d="M-2.258-7.938v-4.494H.3a6.9,6.9,0,0,1,1.092.084,2.541,2.541,0,0,1,.924.325,1.773,1.773,0,0,1,.641.682A2.4,2.4,0,0,1,3.2-10.185,2.4,2.4,0,0,1,2.961-9.03a1.773,1.773,0,0,1-.641.682,2.541,2.541,0,0,1-.924.325A6.9,6.9,0,0,1,.3-7.938Zm-3.3-7.056V0h3.3V-5.376H1.208A6.245,6.245,0,0,0,3.6-5.786,4.479,4.479,0,0,0,5.208-6.867a4.141,4.141,0,0,0,.9-1.543,5.7,5.7,0,0,0,.284-1.775,5.671,5.671,0,0,0-.284-1.785,4.155,4.155,0,0,0-.9-1.533A4.479,4.479,0,0,0,3.6-14.585a6.245,6.245,0,0,0-2.394-.409Z" transform="translate(5.555 14.994)" fill={iconColor} />
  </svg>
);

export default Parking;


