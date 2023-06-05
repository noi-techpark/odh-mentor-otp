// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import RouteViewerOverlay from '../../otp-ui/overlay-route-viewer'
import { connect } from 'react-redux'

// connect to the redux store

const mapStateToProps = (state, ownProps) => {
  const viewedRoute = state.otp.ui.viewedRoute
  return {
    routeData: viewedRoute && state.otp.transitIndex.routes
      ? state.otp.transitIndex.routes[viewedRoute.routeId]
      : null
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(RouteViewerOverlay)
