import { legType } from "../../core-utils/types";
import React from "react";
import { withNamespaces } from "react-i18next"

function RouteDescription({ leg, t }) {
  const { headsign, routeLongName, routeShortName } = leg;
  return (
    <div className="otp-ui-legDescForTransit">
      {routeShortName && (
        <div>
          <div className="otp-ui-legDescForTransit__shortName">
            {routeShortName}
          </div>
        </div>
      )}
      <div className="otp-ui-legDescForTransit__longName">
        {routeLongName}
        {headsign && (
          <span>
            <span className="otp-ui-legDescForTransit__headSignPrefix">
              {` ${t('to')} `}
            </span>
            {headsign}
          </span>
        )}
      </div>
    </div>
  );
}

RouteDescription.propTypes = {
  leg: legType.isRequired
};

export default withNamespaces()(RouteDescription)
