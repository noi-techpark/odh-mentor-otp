import React,{ useState } from "react";
import PropTypes from "prop-types";
import { withNamespaces } from "react-i18next"
import { Button, ButtonGroup } from "react-bootstrap"
import { modeSelectorOptionsType } from "../../core-utils/types";
import { hasTransit, isTransit } from "../../core-utils/itinerary";

import ModeButton from "../ModeButton";

/**
 * ModeSelector is the control container where the OTP user selects
 * the transportation modes for a trip query, e.g. transit+bike, walk, micromobility...
 */
const ModeSelector = props => {
  const { className, modes, onChange, style, t } = props;
  const { primary, secondary, tertiary } = modes || {
    primary: null,
    secondary: null,
    tertiary: null
  };

  const [currentSelectionId, setCurrentSelectionId] = useState('')

  const handleClick = option => {    
    if (!option.selected && typeof onChange === "function") {
      setCurrentSelectionId(option.id)
      onChange(option.id);
    }
  };

  const makeButton = option => {
    // console.log(option.id, currentSelectionId)
    // console.log(hasTransit(currentSelectionId) && hasTransit(option.id))

    let selected = option.selected

    console.log(option.id, hasTransit(option.id))

    if (!selected) {
      selected = isTransit(option.id) && hasTransit(currentSelectionId)
    }

    return <ModeButton
      key={option.id}
      selected={selected}
      // selected={option.selected || (hasTransit(currentSelectionId) && isTransit(option.id))}
      showTitle={option.showTitle}
      title={t(option.title)}
      onClick={() => handleClick(option)}
    >
      {option.icon}
    </ModeButton>
  }

  return (
    <div className={`otp-ui-modeSelector ${className || ''}`} style={style}>
      <ButtonGroup>
        {primary && makeButton(primary) } &nbsp; 
        {tertiary && tertiary.map(makeButton)}
      </ButtonGroup>

      <ButtonGroup className="otp-ui-modeSelector__busCombo">
        <div className="otp-ui-modeSelector__plusIcon">+</div>
        {secondary && secondary.map(makeButton)} &nbsp;
      </ButtonGroup>
    </div>
  );
};

ModeSelector.propTypes = {
  /**
   * The CSS class name to apply to this element.
   */
  className: PropTypes.string,
  /**
   * An object that defines the primary mode, and secondary and tertiary modes for the trip query.
   */
  modes: modeSelectorOptionsType,
  /**
   * Triggered when the user selects a different mode.
   * @param id The id of the new option clicked.
   */
  onChange: PropTypes.func
};

ModeSelector.defaultProps = {
  className: null,
  modes: null,
  onChange: null
};

export default withNamespaces()(ModeSelector);
