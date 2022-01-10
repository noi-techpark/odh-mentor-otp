import { locationType } from "../core-utils/types";
import LocationIcon from "../location-icon";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import { ButtonGroup, Button } from 'react-bootstrap';

class FromToLocationPicker extends Component {
  onFromClick = () => {
    const { location, onFromClick, setLocation } = this.props;
    if (onFromClick) {
      onFromClick();
      return;
    }
    setLocation({
      location,
      locationType: "from",
      reverseGeocode: false
    });
  };

  onToClick = () => {
    const { location, onToClick, setLocation } = this.props;
    if (onToClick) {
      onToClick();
      return;
    }
    setLocation({
      location,
      locationType: "to",
      reverseGeocode: false
    });
  };

  render() {
    const { fromText, showIcons, toText, t } = this.props;
    return (
      <div className="otp-ui-formToLocationPicker">
        <ButtonGroup>
          <Button onClick={this.onFromClick}>
            {showIcons && <LocationIcon type="from" />} {' '}
            {t(fromText)}
          </Button>
          <Button onClick={this.onToClick}>
            {showIcons && <LocationIcon type="to" />} {' '}
            {t(toText)}
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}

FromToLocationPicker.propTypes = {
  /**
   * The text to display on the "from" button for setting the origin of a trip.
   */
  fromText: PropTypes.string,
  /**
   * A specific location to associate with this. This is only used when combined
   * with the setLocation prop.
   */
  location: locationType,
  /**
   * Triggered when the user clicks on the "from" button.
   */
  onFromClick: PropTypes.func,
  /**
   * Triggered when the user clicks on the "to" button.
   */
  onToClick: PropTypes.func,
  /**
   * The text to display on the "to" button for setting the destination of a trip.
   */
  toText: PropTypes.string,
  /**
   * Triggered when the user clicks either the "from" or "to" button and there
   * are no from/to specific handler functions defined as props.
   *
   * Passes an argument as follows:
   * { locationType: "from/to", location, reverseGeocode: false }
   */
  setLocation: PropTypes.func,
  /**
   * Determines whether icons are shown on the "from" and "to" buttons.
   */
  showIcons: PropTypes.bool
};

FromToLocationPicker.defaultProps = {
  fromText: "from_here",
  location: null,
  onFromClick: null,
  onToClick: null,
  setLocation: null,
  showIcons: true,
  toText: "to_here"
};

export default withNamespaces()(FromToLocationPicker);
