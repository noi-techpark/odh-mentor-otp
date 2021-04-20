import { legType } from "../../core-utils/types";
import React from "react";
import { withNamespaces } from "react-i18next"

import * as Styled from "../styled";

function RouteDescription({ leg, t }) {
  const { headsign, routeLongName, routeShortName } = leg;
  return (
    <Styled.LegDescriptionForTransit>
      {routeShortName && (
        <div>
          <Styled.LegDescriptionRouteShortName>
            {routeShortName}
          </Styled.LegDescriptionRouteShortName>
        </div>
      )}
      <Styled.LegDescriptionRouteLongName>
        {routeLongName}
        {headsign && (
          <span>
            <Styled.LegDescriptionHeadsignPrefix>
              {` ${t('to')} `}
            </Styled.LegDescriptionHeadsignPrefix>
            {headsign}
          </span>
        )}
      </Styled.LegDescriptionRouteLongName>
    </Styled.LegDescriptionForTransit>
  );
}

RouteDescription.propTypes = {
  leg: legType.isRequired
};

export default withNamespaces()(RouteDescription)
