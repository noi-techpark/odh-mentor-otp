import React, { Component } from "react";
import PropTypes from "prop-types";
import { withNamespaces } from 'react-i18next'

import * as Styled from "../styled";

class ViewTripButton extends Component {
  onClick = () => {
    const { fromIndex, setViewedTrip, toIndex, tripId } = this.props;
    setViewedTrip({ tripId, fromIndex, toIndex });
  };

  render() {
    const { t } = this.props

    return (
      <Styled.ViewerButton onClick={this.onClick} type="button">
        {t('trip_viewer')}
      </Styled.ViewerButton>
    );
  }
}

ViewTripButton.propTypes = {
  fromIndex: PropTypes.number.isRequired,
  setViewedTrip: PropTypes.func.isRequired,
  tripId: PropTypes.string.isRequired,
  toIndex: PropTypes.number.isRequired
};

export default withNamespaces()(ViewTripButton);
