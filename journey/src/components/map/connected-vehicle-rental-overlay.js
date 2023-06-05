// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import VehicleRentalOverlay from '../../otp-ui/overlay-vehicle-rental'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setLocation } from '../../actions/map'

class ConnectedVehicleRentalOverlay extends Component {
  constructor (props) {
    super(props)
    this.state = { visible: props.visible }
  }

  componentDidMount () {
    this.props.registerOverlay(this)
  }

  onOverlayAdded = () => {
    this.setState({ visible: true })
  }

  onOverlayRemoved = () => {
    this.setState({ visible: false })
  }

  render () {
    return (
      <VehicleRentalOverlay {...this.props} visible={this.state.visible} />
    )
  }
}

// connect to the redux store

const mapStateToProps = (state, ownProps) => {
  return {
    configCompanies: state.otp.config.companies,
    zoom: state.otp.config.map.initZoom
  }
}

const mapDispatchToProps = {
  setLocation
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedVehicleRentalOverlay)
