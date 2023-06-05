// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import StopsOverlay from '../../otp-ui/overlay-stops'
import StopMarker from './connected-stop-marker'
import { connect } from 'react-redux'

import { findStopsWithinBBox } from '../../actions/api'

// connect to the redux store

const mapStateToProps = (state, ownProps) => {
  return {
    StopMarker,
    stops: state.otp.overlay.transit.stops
  }
}

const mapDispatchToProps = {
  refreshStops: findStopsWithinBBox
}

export default connect(mapStateToProps, mapDispatchToProps)(StopsOverlay)
