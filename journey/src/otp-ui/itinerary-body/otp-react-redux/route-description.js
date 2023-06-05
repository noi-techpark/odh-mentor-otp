// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { legType } from "../../core-utils/types";
import PropTypes from "prop-types";
import React from "react";

export default function RouteDescription({ leg, LegIcon }) {
  const { headsign, routeLongName, routeShortName } = leg;
  return (
    <div className="otp-ui-legDescForTransit">
      <div className="otp-ui-legDescForTransit__iconContainer">
        <LegIcon leg={leg} />
      </div>
      {routeShortName && (
        <div className="otp-ui-legDescForTransit__shortName">
          {routeShortName}
        </div>
      )}
      <div className="otp-ui-legDescForTransit__longName">
        {routeLongName}
        {headsign && (
          <span>
            {" "}
            <span className="otp-ui-legDescForTransit__headSignPrefix">
              to
            </span>{" "}
            {headsign}
          </span>
        )}
      </div>
    </div>
  );
}

RouteDescription.propTypes = {
  leg: legType.isRequired,
  LegIcon: PropTypes.elementType.isRequired
};
