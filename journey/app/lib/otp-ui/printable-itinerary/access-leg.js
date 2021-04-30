import {
  getLegModeLabel,
  getPlaceName,
  getStepDirection,
  getStepStreetName
} from "../core-utils/itinerary";
import { configType, legType } from "../core-utils/types";
import { humanizeDistanceString } from "../humanize-distance";
import PropTypes from "prop-types";
import React from "react";
import { withNamespaces } from "react-i18next"

import * as Styled from "./styled";

function AccessLeg({ config, leg, LegIcon, t }) {
  return (
    <Styled.Leg>
      <Styled.ModeIcon>
        <LegIcon leg={leg} />
      </Styled.ModeIcon>
      <Styled.LegBody>
        <Styled.LegHeader>
          <b>{t(getLegModeLabel(leg))}</b>{" "}
          {leg.distance > 0 && (
            <span> {humanizeDistanceString(leg.distance)}</span>
          )}
          {` ${t('to')} `}
          <b>{getPlaceName(leg.to, config.companies)}</b>
        </Styled.LegHeader>
        {!leg.hailedCar && (
          <Styled.LegDetails>
            {leg.steps.map((step, k) => {
              return (
                <Styled.LegDetail key={k}>
                  {t(getStepDirection(step))} on <b>{t(getStepStreetName(step))}</b>
                </Styled.LegDetail>
              );
            })}
          </Styled.LegDetails>
        )}
      </Styled.LegBody>
    </Styled.Leg>
  );
}

AccessLeg.propTypes = {
  config: configType.isRequired,
  leg: legType.isRequired,
  LegIcon: PropTypes.elementType.isRequired
};

export default withNamespaces()(AccessLeg)
