import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ViewStopButton extends Component {
  onClick = () => {
    const { onStopClick, stopId } = this.props;
    onStopClick({ stopId });
  };

  render() {
    const { text } = this.props;
    return (
      <button className="otp-ui-viewerButton" onClick={this.onClick}>{text}</button>
    );
  }
}

ViewStopButton.propTypes = {
  onStopClick: PropTypes.func.isRequired,
  stopId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};
