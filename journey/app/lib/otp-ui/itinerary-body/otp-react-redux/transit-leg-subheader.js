import {
  languageConfigType,
  legType
} from "../../core-utils/types";
import PropTypes from "prop-types";
import React from "react";
import { withNamespaces } from "react-i18next"

import * as Styled from "../styled";
import ViewStopButton from "./view-stop-button";

function TransitLegSubheader({
  languageConfig,
  leg,
  onStopClick,
  t
}) {
  const { from } = leg;
  const buttonText = t(languageConfig.stopViewer || "stop");
  return (
    <Styled.PlaceSubheader>
      <span>Stop ID {from.stopId.split(":")[1]}</span>
      <ViewStopButton
        onStopClick={onStopClick}
        stopId={from.stopId}
        text={buttonText}
      />
    </Styled.PlaceSubheader>
  );
}

TransitLegSubheader.propTypes = {
  languageConfig: languageConfigType.isRequired,
  leg: legType.isRequired,
  onStopClick: PropTypes.func.isRequired
};


export default withNamespaces()(TransitLegSubheader)
