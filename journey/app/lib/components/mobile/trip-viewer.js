import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'

import MobileContainer from './container'
import MobileNavigationBar from './navigation-bar'

import TripViewer from '../viewers/trip-viewer'
import DefaultMap from '../map/default-map'

import { setViewedTrip } from '../../actions/ui'

class MobileTripViewer extends Component {
  static propTypes = {
    setViewedTrip: PropTypes.func
  }

  _onBackClicked = () => { this.props.setViewedTrip(null) }

  render () {
    const { t } = this.props
    return (
      <MobileContainer>
        <MobileNavigationBar
          headerText={t('trip_viewer')}
          showBackButton
          onBackClicked={this._onBackClicked}
        />

        {/* include map as fixed component */}
        <div className='viewer-map'>
          <DefaultMap />
        </div>

        {/* include TripViewer in embedded scrollable panel */}
        <div className='viewer-container'>
          <TripViewer hideBackButton />
        </div>
      </MobileContainer>
    )
  }
}

// connect to the redux store

const mapStateToProps = (state, ownProps) => {
  return {
    languageConfig: state.otp.config.language
  }
}

const mapDispatchToProps = {
  setViewedTrip
}

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(MobileTripViewer))
