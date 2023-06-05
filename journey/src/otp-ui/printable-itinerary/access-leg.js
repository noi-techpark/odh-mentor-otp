// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

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

function AccessLeg({ config, leg, LegIcon, t }) {
  return (
    <div className="otp-ui-printableItineraryLeg">
      <div className="otp-ui-printableItineraryLeg__icon">
        <LegIcon leg={leg} />
      </div>
      <div className="otp-ui-printableItineraryLeg__body">
        <div className="otp-ui-printableItineraryLeg__header">
          <strong>{t(getLegModeLabel(leg))}</strong>{" "}
          {leg.distance > 0 && (
            <span> {humanizeDistanceString(leg.distance)}</span>
          )}
          {` ${t('to')} `}
          <strong>{getPlaceName(leg.to, config.companies)}</strong>
        </div>
        {!leg.hailedCar && (
          <div className="otp-ui-printableItineraryLeg__detail">
            {leg.steps.map((step, k) => {
              return (
                <div key={k}>
                  {t(getStepDirection(step))} on <b>{t(getStepStreetName(step))}</b>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

AccessLeg.propTypes = {
  config: configType.isRequired,
  leg: legType.isRequired,
  LegIcon: PropTypes.elementType.isRequired
};

export default withNamespaces()(AccessLeg)
