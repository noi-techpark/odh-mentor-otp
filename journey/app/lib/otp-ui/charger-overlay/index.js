import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FeatureGroup, MapLayer, Marker, Popup, withLeaflet } from 'react-leaflet'
import { divIcon } from 'leaflet'
import { withNamespaces } from "react-i18next";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { setLocation } from '../../actions/map'
import { chargerLocationsQuery } from '../../actions/charger'

import BadgeIcon from "../icons/badge-icon";
import MarkerCharger from "../icons/modern/MarkerCharger";
import ReactDOMServer from "react-dom/server";
import Charger from "../icons/modern/Charger";
import FromToLocationPicker from '../from-to-location-picker'

import config from '../../config.yml';

const overlayChargerConf = config.map.overlays.filter(item => item.type === 'charger')[0]

class ChargerOverlay extends MapLayer {
  static propTypes = {
    api: PropTypes.string,
    locations: PropTypes.array,
    chargerLocationsQuery: PropTypes.func,
    setLocation: PropTypes.func
  }

  _startRefreshing () {
    // ititial station retrieval
    this.props.chargerLocationsQuery(this.props.api)

    // set up timer to refresh stations periodically
    this._refreshTimer = setInterval(() => {
      this.props.chargerLocationsQuery(this.props.api)
    }, 30000) // defaults to every 30 sec. TODO: make this configurable?*/
  }

  _stopRefreshing () {
    if (this._refreshTimer) clearInterval(this._refreshTimer)
  }

  componentDidMount () {
    this.props.registerOverlay(this)
  }

  onOverlayAdded = () => {
    this._startRefreshing()
  }

  onOverlayRemoved = () => {
    this._stopRefreshing()
  }

  componentWillUnmount () {
    this._stopRefreshing()
  }

  componentDidUpdate (prevProps) {
    if (!prevProps.visible && this.props.visible) {
      this._startRefreshing()
    } else if (prevProps.visible && !this.props.visible) {
      this._stopRefreshing()
    }
  }

  createLeafletElement () {}

  updateLeafletElement () {}

  render () {
    const { locations, t } = this.props
    if (!locations || locations.length === 0) return <FeatureGroup />

    const markerIcon = (data) => {
      let badgeType = 'default';
      let badgeCounter = data.capacity || 0;

      if (data.state === "AVAILABLE" || data.state === "ACTIVE") {
        badgeType = 'default';
      } else {
        badgeType = 'danger';
        badgeCounter = null;
      }
      return divIcon({
        className: "",
        iconSize: [overlayChargerConf.iconWidth, overlayChargerConf.iconHeight],
        popupAnchor: [0, -overlayChargerConf.iconHeight / 2],
        html: ReactDOMServer.renderToStaticMarkup(
          <BadgeIcon counter={badgeCounter} type={badgeType} width={overlayChargerConf.iconWidth}>
            <MarkerCharger
              width={overlayChargerConf.iconWidth}
              height={overlayChargerConf.iconHeight}
              iconColor={overlayChargerConf.iconColor}
              markerColor={overlayChargerConf.iconMarkerColor}
            />
          </BadgeIcon>
        )
      });;
    }


    const bulletIconStyle = {
      color: 'gray',
      fontSize: 12,
      width: 15
    }

    return (
      <FeatureGroup>
        {locations.map((station) => {
          return (
            <Marker
              icon={markerIcon(station)}
              key={station.name}
              position={[station.lat, station.lon]}
            >
              <Popup>
                <div className="otp-ui-mapOverlayPopup">
                  <div className="otp-ui-mapOverlayPopup__popupHeader">
                    <Charger width={24} height={20} />&nbsp;{t('charger')}
                  </div>

                  <div className="otp-ui-mapOverlayPopup__popupTitle">{station.name}</div>

                  <div className="otp-ui-mapOverlayPopup__popupAvailableInfo">
                    <div className="otp-ui-mapOverlayPopup__popupAvailableInfoValue">{station.capacity}</div>
                    <div className="otp-ui-mapOverlayPopup__popupAvailableInfoTitle">{t('available_slots')}</div>
                  </div>

                  <div className='popup-row'>
                    {station.plugs.map( (plug, key) => {
                      const ava = 'otp-ui-mapOverlayPopup' +(plug.available ? '__popupAva': '__popupNoAva');
                      plug.maxPower = Math.round(plug.maxPower);
                      return (
                        <div className="otp-ui-mapOverlayPopup__popupSlot">
                          <span className={ava}>
                          &bull; SLOT<small>{key}</small></span> <br />
                          {plug.maxPower}W | {plug.minCurrent}-{plug.maxCurrent}A
                        </div>
                      );
                    })}
                  </div>
                  
                  <br />

                  <div className='popup-row'>
                    <FromToLocationPicker
                      station={station}
                      setLocation={this.props.setLocation}
                    />
                  </div>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </FeatureGroup>
    )
  }
}

// connect to the redux store

const mapStateToProps = (state, ownProps) => {
  return {
    locations: state.otp.overlay.charger && state.otp.overlay.charger.locations
  }
}

const mapDispatchToProps = {
  setLocation,
  chargerLocationsQuery
}

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(withLeaflet(ChargerOverlay)))
