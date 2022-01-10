import React from "react";
import PropTypes from "prop-types";
import { withNamespaces } from "react-i18next"
import { modeOptionType } from "../../core-utils/types";

import { FormGroup, ControlLabel, ButtonGroup } from 'react-bootstrap'
import ModeButton from "../ModeButton";

/**
 * SubmodeSelector is the control container where the OTP user selects
 * the submodes (e.g. train, bus) for transit, or the providers for TNC and rental companies.
 */
const SubmodeSelector = props => {
  const { className, inline, label, modes, onChange, style, t } = props;

  return (
    <div className={className} style={style}>
      <FormGroup>
        {label && <ControlLabel>{label}</ControlLabel>}
        {modes &&
          <ButtonGroup justified>
            {  modes.map(option => (
              <ModeButton
                key={option.id}
                selected={option.selected}
                showTitle={false}
                title={option.title}
                onClick={() => onChange(option.id)}
              >
                <span>
                  { option.icon || ''}
                  {option.icon && <br/>}
                  {t(option.label)}
                </span>
              </ModeButton>)
              )}
            </ButtonGroup>
          }
      </FormGroup>
    </div>
  );
};

SubmodeSelector.propTypes = {
  /**
   * The CSS class name to apply to this element.
   */
  className: PropTypes.string,
  /**
   * Determines how the label and mode buttons are displayed.
   */
  inline: PropTypes.bool,
  /**
   * The optional text to display before the submodes.
   */
  label: PropTypes.string,
  /**
   * An array of submodes for the trip query, i.e. transit modes, TNC, or rental companies.
   */
  modes: PropTypes.arrayOf(modeOptionType),
  /**
   * Triggered when the user toggles a submode.
   * @param id The id of the option clicked.
   */
  onChange: PropTypes.func
};

SubmodeSelector.defaultProps = {
  className: null,
  inline: false,
  label: null,
  modes: null,
  onChange: null
};

export default withNamespaces()(SubmodeSelector);
