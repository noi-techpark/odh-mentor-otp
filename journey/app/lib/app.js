// import React/Redux libraries
import React, { Component } from 'react'
import { withNamespaces } from "react-i18next";
// import Bootstrap Grid components for layout
import { Navbar, Grid, Row, Col } from 'react-bootstrap'
// import OTP-RR components
import DefaultMainPanel from './components/app/default-main-panel'
import LineItinerary from './components/narrative/line-itin/line-itinerary'
import Map from './components/map/map'
import MobileMain from './components/mobile/main'
import ResponsiveWebapp from './components/app/responsive-webapp'
import AppMenu from './components/app/app-menu'

import i18n from './i18n'
// Loads a yaml config file which is set in the webpack.config.js file. This
// setting is defined from a custom environment setting passed into webpack or
// defaults to ./config.yml
const otpConfig = require(YAML_CONFIG)

// Loads a JavaScript file which is set in the webpack.config.js file. This
// setting is defined from a custom environment setting passed into webpack or
// defaults to ./config.js
const jsConfig = require(JS_CONFIG).configure(otpConfig)

const {getItineraryFooter, LegIcon, ModeIcon} = jsConfig

if (!LegIcon || !ModeIcon) {
  throw new Error('LegIcon and ModeIcon must be defined in config.js')
}
const itineraryFooter = typeof getItineraryFooter === 'function'
  ? getItineraryFooter()
  : null

class TrimetWebapp extends Component {
  render () {
    const { t } = this.props
    const {branding} = otpConfig

    /** desktop view **/
    const desktopView = (
      <div className='otp'>
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999, background: 'red', padding: 15, opacity: .8}}>
          <p>react-i18next Test</p>
          <p>{t('disclaimer')}</p>
          <button onClick={ (e) => {e.preventDefault(); i18n.changeLanguage('it')} }>IT</button>
          <button onClick={ (e) => {e.preventDefault(); i18n.changeLanguage('en')} }>EN</button>
          <button onClick={ (e) => {e.preventDefault(); i18n.changeLanguage('de')} }>DE</button>
        </div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <div className='app-menu-container'>
                <AppMenu />
              </div>
              <div
                className={`icon-${branding}`}
                // This style is applied here because it is only intended for
                // desktop view.
                style={{ marginLeft: 50 }} />
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Grid>
          <Row className='main-row'>
            <Col sm={6} md={4} className='sidebar'>
              {/* <main> is needed for accessibility checks. */}
              <main>
                <DefaultMainPanel
                  itineraryClass={LineItinerary}
                  itineraryFooter={itineraryFooter}
                  LegIcon={LegIcon}
                  ModeIcon={ModeIcon}
                />
              </main>
            </Col>
            <Col sm={6} md={8} className='map-container'>
              <Map />
            </Col>
          </Row>
        </Grid>
      </div>
    )

    /** mobile view **/
    const mobileView = (
      // <main> is needed for accessibility checks.
      <main>
        <MobileMain
          map={(<Map />)}
          itineraryClass={LineItinerary}
          itineraryFooter={itineraryFooter}
          LegIcon={LegIcon}
          ModeIcon={ModeIcon}
          title={(<div className={`icon-${branding}`} />)}
        />
      </main>
    )

    /** the main webapp **/
    return (
      <ResponsiveWebapp
        desktopView={desktopView}
        // Pass the LegIcon here for use in the print view.
        LegIcon={LegIcon}
        mobileView={mobileView}
      />
    )
  }
}

export default withNamespaces()(TrimetWebapp);
