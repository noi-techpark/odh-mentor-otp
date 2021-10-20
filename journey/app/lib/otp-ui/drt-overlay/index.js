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

import MarkerDrtStop from "../icons/modern/MarkerDrtStop";
import MarkerDrtVehicle from "../icons/modern/MarkerDrtVehicle";

import ReactDOMServer from "react-dom/server";
import FromToLocationPicker from '../from-to-location-picker'

import config from '../../config.yml';

const overlayDrtConf = config.map.overlays.filter(item => item.type === 'drt')[0];

class DrtOverlay extends MapLayer {
  static propTypes = {
    api: PropTypes.string,
    //locations: PropTypes.array,
    locations: PropTypes.object,
    drtLocationsQuery: PropTypes.func,
    setLocation: PropTypes.func
  }

  _startRefreshing () {
    // ititial station retrieval
    this.props.drtLocationsQuery(this.props.api)

    // set up timer to refresh stations periodically
    this._refreshTimer = setInterval(() => {
      this.props.drtLocationsQuery(this.props.api)
    }, Number(overlayDrtConf.pollingInterval)) // defaults to every 30 sec. TODO: make this configurable?*/

    //TODO move 5000 in config overlayDrtConf.interval
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
    if (!locations ||
        !locations.vehicles ||
        !locations.stops ||
        locations.vehicles.length === 0 ||
        locations.stops.length === 0) return <LayerGroup />

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
            <MarkerDrtStop
              width={iconWidth}
              height={iconHeight}
              iconColor={overlayDrtConf.iconColor}
              markerColor={overlayDrtConf.iconMarkerColor}
            />
          }
          { data.vehicle &&
            <MarkerDrtVehicle
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
          locations.stops.map( stop => {
          return (
            <Marker
              icon={markerIcon(stop)}
              key={stop.stop.id}
              position={[stop.position.latitude, stop.position.longitude]}
            >
              <Popup>
                <div className="otp-ui-mapOverlayPopup">
                  {/*<div className="otp-ui-mapOverlayPopup__popupHeader">
                    <Mar width={24} height={20} />&nbsp;{t('parking')}
                  </div>*/}

                  <div className="otp-ui-mapOverlayPopup__popupTitle">{stop.stop.name}</div>
                  <small>area {stop.area}</small>

                  <div className='popup-row'>
                    <FromToLocationPicker
                      location={stop}
                      setLocation={this.props.setLocation}
                    />
                  </div>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </FeatureGroup>
      <FeatureGroup>
        {
          locations.vehicles.map( vehicle => {
          return (
            <Marker
              icon={markerIcon(vehicle)}
              key={vehicle.vehicle.id}
              position={[vehicle.position.latitude, vehicle.position.longitude]}
            >
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
  console.log('DRT STATE', state)
  return {
    locations: state.otp.overlay.drt && state.otp.overlay.drt.locations
  }
}

const mapDispatchToProps = {
  setLocation,
  drtLocationsQuery
}

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(withLeaflet(DrtOverlay)))
