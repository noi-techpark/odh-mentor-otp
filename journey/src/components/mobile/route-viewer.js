import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'

import MobileContainer from './container'
import MobileNavigationBar from './navigation-bar'

import RouteViewer from '../viewers/route-viewer'
import DefaultMap from '../map/default-map'

import { setViewedRoute, setMainPanelContent } from '../../actions/ui'

class MobileRouteViewer extends Component {
  static propTypes = {
    setViewedRoute: PropTypes.func,
    setMainPanelContent: PropTypes.func
  }

  _backClicked = () => {
    this.props.setViewedRoute(null)
    this.props.setMainPanelContent(null)
  }

  render () {
    const { t } = this.props

    return (
      <MobileContainer>
        <MobileNavigationBar
          headerText={t(this.props.languageConfig.routeViewer || 'route_viewer')}
          showBackButton
          onBackClicked={this._backClicked}
        />
        <div className='viewer-map'>
          <DefaultMap />
        </div>

        <div className='viewer-container'>
          <RouteViewer hideBackButton />
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
  setViewedRoute,
  setMainPanelContent
}

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(MobileRouteViewer))
