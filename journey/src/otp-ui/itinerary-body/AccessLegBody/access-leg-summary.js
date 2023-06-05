// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import {
  getLegModeLabel,
  getPlaceName
} from "../../core-utils/itinerary";
import { configType, legType } from "../../core-utils/types";
import { humanizeDistanceString } from "../../humanize-distance";
import React from "react";
import { withNamespaces } from 'react-i18next'
import PropTypes from "prop-types"
import { Button } from 'react-bootstrap'

function AccessLegSummary({
  config,
  leg,
  LegIcon,
  onSummaryClick,
  showLegIcon,
  t
}) {
  return (
    <Button bsStyle="link" bsSize="small" onClick={onSummaryClick} className="otp-ui-legSummaryButton">
      {showLegIcon && (
        <LegIcon leg={leg} width={24} height={24} />
      )}

      <span>
        {t(getLegModeLabel(leg))}{" "}
        {leg.distance > 0 && (
          <strong> {humanizeDistanceString(leg.distance)}</strong>
        )}
        {` ${t('to')} ${getPlaceName(leg.to, config.companies)}`}
      </span>
    </Button>
  );
}

AccessLegSummary.propTypes = {
  config: configType.isRequired,
  leg: legType.isRequired,
  LegIcon: PropTypes.elementType.isRequired,
  onSummaryClick: PropTypes.func.isRequired,
  showLegIcon: PropTypes.bool.isRequired
};

export default withNamespaces()(AccessLegSummary)
