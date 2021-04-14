import {
  getLegModeLabel,
  getPlaceName
} from "../../core-utils/itinerary";
import { configType, legType } from "../../core-utils/types";
import { humanizeDistanceString } from "../../humanize-distance";
import React from "react";
import PropTypes from "prop-types";

import * as Styled from "../styled";

export default function AccessLegSummary({
  config,
  leg,
  LegIcon,
  onSummaryClick,
  showLegIcon
}) {
  return (
    <Styled.LegClickable onClick={onSummaryClick}>
      {showLegIcon && (
        <Styled.LegIconContainer>
          <LegIcon leg={leg} />
        </Styled.LegIconContainer>
      )}

      {/* Leg description, e.g. "Walk 0.5 mi to..." */}
      <Styled.LegDescription>
        {getLegModeLabel(leg)}{" "}
        {leg.distance > 0 && (
          <span> {humanizeDistanceString(leg.distance)}</span>
        )}
        {` $_to_$ ${getPlaceName(leg.to, config.companies)}`}
      </Styled.LegDescription>
    </Styled.LegClickable>
  );
}

AccessLegSummary.propTypes = {
  config: configType.isRequired,
  leg: legType.isRequired,
  LegIcon: PropTypes.elementType.isRequired,
  onSummaryClick: PropTypes.func.isRequired,
  showLegIcon: PropTypes.bool.isRequired
};
