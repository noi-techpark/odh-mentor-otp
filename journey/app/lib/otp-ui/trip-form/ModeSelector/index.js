import React,{ useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withNamespaces } from "react-i18next"
import { ButtonGroup, Panel } from "react-bootstrap"
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
  const [showSecondaryMenu, setShowSecondaryMenu] = useState(false)

  useEffect(() => {
    const optionsGroup = [
      primary, 
      ...secondary, 
      ...tertiary
    ]    
    
    optionsGroup.map(option => {
      if (option.selected) {
        setCurrentSelectionId(option.id)        
      }
    })
  }, [])

  useEffect(() => {
    if (currentSelectionId !== '') {
      const toggle = isTransit(currentSelectionId) || hasTransit(currentSelectionId)
      setShowSecondaryMenu(toggle)
    }
  }, [currentSelectionId])

  const handleClick = option => {    
    if (!option.selected && typeof onChange === "function") {
      setCurrentSelectionId(option.id)
      onChange(option.id);
    }
  };

  const makeButton = option => {
    let selected = option.selected

    if (!selected) {
      selected = isTransit(option.id) && hasTransit(currentSelectionId)
    }

    return <ModeButton
      key={option.id}
      selected={selected}      
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

      <Panel 
        className="otp-ui-modeSelector__transitCombo"
        expanded={showSecondaryMenu}
      >
        <Panel.Collapse>
          <Panel.Body>
            <ButtonGroup>
              <div className="otp-ui-modeSelector__plusIcon">+</div>
              {secondary && secondary.map(makeButton)} &nbsp;
            </ButtonGroup>
          </Panel.Body>
        </Panel.Collapse>
      </Panel>      
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
