import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavItem, NavDropdown, MenuItem, Modal, Button } from 'react-bootstrap'
import { withNamespaces } from "react-i18next"

import Icon from '../narrative/icon'

import { MainPanelContent, setMainPanelContent, routeTo } from '../../actions/ui'
import logoPlaceholder from '../../images/logo-placeholder.png'

// TODO: make menu items configurable via props/config

class AppMenu extends Component {
  static propTypes = {
    setMainPanelContent: PropTypes.func,
    routeTo: PropTypes.func
  }

  constructor (props) {
    super(props)

    this.state = {
      showCredits: false
    }
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

  _showCredits = () => {
    // this.props.setMainPanelContent(MainPanelContent.CREDITS_VIEWER);
    // this.props.routeTo('/credits', '');
    this.setState({ showCredits: true });
  }

  _hideCredits = () => {
    this.setState({ showCredits: false });
  }

  componentDidMount = () => {
    if (this.props.currentLocation.pathname === '/credits') {
      this.setState({ showCredits: true });
    }

    window.addEventListener('popstate', this._hideCredits)
  }

  componentWillUnmount = () => {
    window.removeEventListener('popstate', this._hideCredits)
  }

  render () {
    const { languageConfig, t, i18n } = this.props

    return (
      <>
        <NavItem eventKey={1} onClick={this._showRouteViewer}>
          <Icon type='bus' /> {t('route_viewer')}
        </NavItem>

        <NavItem eventKey={2} onClick={this._startOver}>
          <Icon type='undo' /> {t('restart')}
        </NavItem>

        <NavItem eventKey={3} onClick={this._showCredits}>
          <Icon type='info-circle' /> {t('credits')}
        </NavItem>

        <NavDropdown
          id="language-dropdown"
          aria-label='Choose Language'
          title={this._getLanguageLabel()}
        >
          <MenuItem onClick={() => i18n.changeLanguage('it')}>
            Italiano
          </MenuItem>
          <MenuItem onClick={() => i18n.changeLanguage('en')}>
            English
          </MenuItem>
          <MenuItem onClick={() => i18n.changeLanguage('de')}>
            Deutsch
          </MenuItem>
        </NavDropdown>

        <Modal bsSize="large" show={this.state.showCredits} onHide={ () => this.setState({ showCredits: false }) }>
          <Modal.Header closeButton>
            <Modal.Title>{t('credits_title')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6 className="credits-title">{t('credits_title_developed')}</h6>

            <ul className="credits-list">
              <li>
                <a href="#" target="_blank">
                  <img src={logoPlaceholder} alt="Company Name"/>
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <img src={logoPlaceholder} alt="Company Name"/>
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <img src={logoPlaceholder} alt="Company Name"/>
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <img src={logoPlaceholder} alt="Company Name"/>
                </a>
              </li>
            </ul>

            <h6 className="credits-title">{t('credits_title_designed')}</h6>

            <ul className="credits-list">
              <li>
                <a href="#" target="_blank">
                  <img src={logoPlaceholder} alt="Company Name"/>
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <img src={logoPlaceholder} alt="Company Name"/>
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <img src={logoPlaceholder} alt="Company Name"/>
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <img src={logoPlaceholder} alt="Company Name"/>
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <img src={logoPlaceholder} alt="Company Name"/>
                </a>
              </li>
            </ul>

            <h6 className="credits-title">{t('credits_title_data_provided')}</h6>

            <ul className="credits-list">
              <li>
                <a href="#" target="_blank">
                  <img src={logoPlaceholder} alt="Company Name"/>
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <img src={logoPlaceholder} alt="Company Name"/>
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <img src={logoPlaceholder} alt="Company Name"/>
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <img src={logoPlaceholder} alt="Company Name"/>
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <img src={logoPlaceholder} alt="Company Name"/>
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <img src={logoPlaceholder} alt="Company Name"/>
                </a>
              </li>
            </ul>
          </Modal.Body>
        </Modal>
      </>
    )
  }
}

// connect to the redux store

const mapStateToProps = (state, ownProps) => {
  return {
    languageConfig: state.otp.config.language,
    currentLocation: state.router.location
  }
}

const mapDispatchToProps = {
  setMainPanelContent,
  routeTo
}

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(AppMenu))
