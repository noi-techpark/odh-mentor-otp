import { legType } from "../../core-utils/types";
import PropTypes from "prop-types";
import React from "react";
import { Button } from "react-bootstrap";
import { withNamespaces } from "react-i18next"
import { CaretDown, CaretUp } from "@styled-icons/fa-solid";

import { formatDuration } from "../../core-utils/time";

/**
 * This is a clickable component that summarizes the leg (travel time, stops
 * passed). On click it will expand and show the list of intermediate stops.
 */
function TransitLegSummary({ leg, onClick, stopsExpanded, t }) {
  return (
    <Button bsStyle="link" bsSize="small" onClick={onClick}>
      {leg.duration && <span>{t('ride')} {formatDuration(leg.duration)}</span>}
      {leg.intermediateStops && (
        <span>
          {" / "}
          {leg.intermediateStops.length + 1}
          {` ${t('stops')} `}
          {stopsExpanded ? <CaretUp size={15} /> : <CaretDown size={15} />}
        </span>
      )}
    </Button>
  );
}

TransitLegSummary.propTypes = {
  leg: legType.isRequired,
  onClick: PropTypes.func.isRequired,
  stopsExpanded: PropTypes.bool.isRequired
};

export default withNamespaces()(TransitLegSummary)
