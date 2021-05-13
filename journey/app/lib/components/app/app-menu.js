import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DropdownButton, MenuItem } from 'react-bootstrap'
import { withNamespaces } from "react-i18next"

import Icon from '../narrative/icon'

import { MainPanelContent, setMainPanelContent } from '../../actions/ui'

// TODO: make menu items configurable via props/config

class AppMenu extends Component {
  static propTypes = {
    setMainPanelContent: PropTypes.func
  }

  _showRouteViewer = () => {
    this.props.setMainPanelContent(MainPanelContent.ROUTE_VIEWER)
  }

  _startOver = () => {
    const { reactRouterConfig } = this.props
    let startOverUrl = '/'
    if (reactRouterConfig && reactRouterConfig.basename) {
      startOverUrl += reactRouterConfig.basename
    }
    window.location.href = startOverUrl
  }

  _getLanguageLabel = () => {
    const { lng } = this.props;

    if (lng === 'it') return 'Italiano'
    if (lng === 'en') return 'English'
    if (lng === 'de') return 'Deutsch'
  }

  render () {
    const { languageConfig, t, i18n } = this.props

    return (
      <div className='app-menu'>
        <DropdownButton
          aria-label='Application Menu'
          title={(<Icon type='bars' />)}
          noCaret
          className='app-menu-button'
          id='app-menu'>
          <MenuItem onClick={this._showRouteViewer}>
            <Icon type='bus' /> {t('route_viewer')}
          </MenuItem>
          <MenuItem onClick={this._startOver}>
            <Icon type='undo' /> {t('restart')}
          </MenuItem>
        </DropdownButton>

        <DropdownButton
          menuAlign="right"
          aria-label='Choose Language'
          title={this._getLanguageLabel()}
          className='app-menu-button'
          id='app-menu-language'>
          <MenuItem onClick={() => i18n.changeLanguage('it')}>
            Italiano
          </MenuItem>
          <MenuItem onClick={() => i18n.changeLanguage('en')}>
            English
          </MenuItem>
          <MenuItem onClick={() => i18n.changeLanguage('de')}>
            Deutsch
          </MenuItem>
        </DropdownButton>
      </div>
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
  setMainPanelContent
}

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(AppMenu))
