import {
  languageConfigType,
  legType
} from "../../core-utils/types";
import PropTypes from "prop-types";
import React from "react";
import { withNamespaces } from "react-i18next"

import ViewStopButton from "./view-stop-button";

function TransitLegSubheader({
  languageConfig,
  leg,
  onStopClick,
  t
}) {
  const { from } = leg;
  const buttonText = t('stop');
  return (
    <div className="otp-ui-placeSubheader">
      <span>{t('stop_id')}{from.stopId}</span>
      <ViewStopButton
        onStopClick={onStopClick}
        stopId={from.stopId}
        text={buttonText}
      />
    </div>
  );
}

TransitLegSubheader.propTypes = {
  languageConfig: languageConfigType.isRequired,
  leg: legType.isRequired,
  onStopClick: PropTypes.func.isRequired
};


export default withNamespaces()(TransitLegSubheader)
