import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { LayerGroup, FeatureGroup, MapLayer, Marker, Popup, withLeaflet } from 'react-leaflet'
import { divIcon } from 'leaflet'
import { withNamespaces } from "react-i18next";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { setLocation } from '../../actions/map'
import { drtLocationsQuery } from '../../actions/drt'

import BadgeIcon from "../icons/badge-icon";

//import MarkerParking from "../icons/modern/MarkerParking";
//import MarkerParkingSensor from "../icons/modern/MarkerParkingSensor";
import MarkerStop from "../icons/modern/MarkerStop";
import MarkerStopChild from "../icons/modern/MarkerStopChild";

import ReactDOMServer from "react-dom/server";
import Parking from "../icons/modern/Parking";
import FromToLocationPicker from '../from-to-location-picker'

//import MarkerClusterGroup from 'react-leaflet-markercluster';
//import MarkerCluster from "../icons/modern/MarkerCluster";

import config from '../../config.yml';

const overlayDrtConf = config.map.overlays.filter(item => item.type === 'drt')[0];

class DrtOverlay extends MapLayer {
  static propTypes = {
    api: PropTypes.string,
    locations: PropTypes.array,
    drtLocationsQuery: PropTypes.func,
    setLocation: PropTypes.func
  }

  _startRefreshing () {
    // ititial station retrieval
    this.props.drtLocationsQuery(this.props.api)

    // set up timer to refresh stations periodically
    this._refreshTimer = setInterval(() => {
      this.props.drtLocationsQuery(this.props.api)
    }, 30000) // defaults to every 30 sec. TODO: make this configurable?*/
  }

  _stopRefreshing () {
    if (this._refreshTimer) clearInterval(this._refreshTimer)
  }

  componentDidMount () {
    this.props.registerOverlay(this)

    if (this.props.visible) {
      this._startRefreshing()
    }
  }

  onOverlayAdded = (e) => {
    this._startRefreshing();
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
    if (!locations || locations.length === 0) return <LayerGroup />

    const markerIcon = (data) => {
      let badgeType = 'success';
      let badgeCounter = 0;
      let iconWidth, iconHeight;

      iconWidth = overlayDrtConf.iconWidth;
      iconHeight = overlayDrtConf.iconHeight;

      return divIcon({
        className: "",
        iconSize: [iconWidth, iconHeight],
        popupAnchor: [0, -iconHeight / 2],
        html: ReactDOMServer.renderToStaticMarkup(
          <BadgeIcon type={badgeType} width={iconWidth}>
          { data.stop &&
            <MarkerStop
              width={iconWidth}
              height={iconHeight}
              iconColor={overlayDrtConf.iconColor}
              markerColor={overlayDrtConf.iconMarkerColor}
            />
          }
          </BadgeIcon>
        )
      });
    }

    return (
      <LayerGroup>
      <FeatureGroup>
        {
          locations.map( station => {
          return (
            <Marker
              icon={markerIcon(station)}
              key={station.stop.id}
              position={[station.position.lat, station.position.lon]}
            >
              <Popup>
                <div className="otp-ui-mapOverlayPopup">
                  <div className="otp-ui-mapOverlayPopup__popupHeader">
                    <Parking width={24} height={20} />&nbsp;{t('parking')}
                  </div>

                  <div className="otp-ui-mapOverlayPopup__popupTitle">{station.stop.name}</div>
                  <small>area {station.area}</small>

                  <div className='popup-row'>
                    <FromToLocationPicker
                      location={station}
                      setLocation={this.props.setLocation}
                    />
                  </div>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </FeatureGroup>
      </LayerGroup>
    )
  }
}

// connect to the redux store

const mapStateToProps = (state, ownProps) => {
  return {
    locations: state.otp.overlay.parking && state.otp.overlay.parking.locations
  }
}

const mapDispatchToProps = {
  setLocation,
  drtLocationsQuery
}

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(withLeaflet(DrtOverlay)))
