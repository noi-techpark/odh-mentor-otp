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
    <Button bsStyle="link" bsSize="small" onClick={onSummaryClick} style={{ whiteSpace: 'inherit', textAlign: 'left' }}>
      {showLegIcon && (
        <LegIcon leg={leg} width={24} height={24} />
      )}

      {t(getLegModeLabel(leg))}{" "}
      {leg.distance > 0 && (
        <span> {humanizeDistanceString(leg.distance)}</span>
      )}
      {` ${t('to')} ${getPlaceName(leg.to, config.companies)}`}
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
