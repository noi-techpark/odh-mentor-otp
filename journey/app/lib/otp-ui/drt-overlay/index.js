import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { LayerGroup, FeatureGroup, MapLayer, Marker, Popup, withLeaflet, Polyline } from 'react-leaflet'
import { divIcon } from 'leaflet'
import { withNamespaces } from "react-i18next";
import { Button } from "react-bootstrap";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { setLocation } from '../../actions/map'
import { drtLocationsQuery } from '../../actions/drt'

import BadgeIcon from "../icons/badge-icon";

import MarkerDrtStop from "../icons/modern/MarkerDrtStop";
import MarkerDrtVehicle from "../icons/modern/MarkerDrtVehicle";
//import Bus from "../icons/openmove/Bus";
import BusDrt from "../icons/openmove/BusDrt";

import ReactDOMServer from "react-dom/server";
import FromToLocationPicker from '../from-to-location-picker'

import config from '../../config.yml';

import polyline from "@mapbox/polyline";

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

    const getAreaColor = (data) => {
      if (overlayDrtConf.areas)
        return overlayDrtConf.areas[Number(data.area)]?.color
      else
        return overlayDrtConf.iconColor;
    }

    const getAreaName = (data) => {
      if (overlayDrtConf.areas)
        return overlayDrtConf.areas[Number(data.area)]?.name
      else
        return '';
    }

    const getLatLon = (item) => {
      return {
        lat: item.position.latitude,
        lon: item.position.longitude
      }
    }

    const markerIcon = (data) => {
      let badgeType = ''
        , badgeCounter = 0
        , iconWidth, iconHeight
        , iconVehicleWidth, iconVehicleHeight;

      iconWidth = overlayDrtConf.iconWidth;
      iconHeight = overlayDrtConf.iconHeight;

      iconVehicleWidth = 30;
      iconVehicleHeight = 30;

/*      if (data.vehicle) {
        if (data.free > 0 ) {
          badgeType = 'success';
        } else if (data.free == 1) {
          badgeType = 'danger';
        }
        else {
          badgeType = 'warning';
        }
      }*/

      return divIcon({
        className: "",
        iconSize: [iconWidth, iconHeight],
        popupAnchor: [0, -iconHeight / 2],
        html: ReactDOMServer.renderToStaticMarkup(
          <>
          { data.stop &&
            <MarkerDrtStop
              width={iconWidth}
              height={iconHeight}
              iconColor={overlayDrtConf.iconColor}
              markerColor={getAreaColor(data)}
            />
          }
          { data.vehicle &&
            <MarkerDrtVehicle
              width={iconVehicleWidth}
              height={iconVehicleHeight}
              iconColor={overlayDrtConf.iconVehicleColor}
            />
          }
          </>
        )
      });
    }

    return (
      <LayerGroup>
      <FeatureGroup>
        {
          locations.stops.map( stop => {
          stop.name = stop.stop.name;
          return (
            <Marker
              icon={markerIcon(stop)}
              key={stop.stop.id}
              position={[stop.lat, stop.lon]}
            >
              <Popup>
                <div className="otp-ui-mapOverlayPopup">
                  <div className="otp-ui-mapOverlayPopup__popupHeader">
                    <BusDrt /> <span bsStyle="link">{t('stop')} {t('ondemand')}</span>
                  </div>

                  <div className="otp-ui-mapOverlayPopup__popupTitle">{stop.stop.name}</div>
                  <small>{getAreaName(stop)}</small>

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
              <Popup>
                <div className="otp-ui-mapOverlayPopup">
                  <div className="otp-ui-mapOverlayPopup__popupHeader">
                    <span>&nbsp;{vehicle.vehicle.id}</span>
                  </div>

                  <div className="otp-ui-mapOverlayPopup__popupTitle">
                    {vehicle.vehicle.name}
                  </div>

                  <div className="otp-ui-mapOverlayPopup__popupAvailableInfo">
                    <CircularProgressbar
                      value={vehicle.free}
                      minValue={0}
                      maxValue={vehicle.capacity}
                      text={vehicle.free+' '}
                      className="otp-ui-mapOverlayPopup__popupAvailableInfoProgress"
                    />
                    <div className="otp-ui-mapOverlayPopup__popupAvailableInfoTitle">
                      {t('capacity')}: {vehicle.capacity}
                      {/*                      <br />
                      {t('free_slots')}: {vehicle.free}*/}
                    </div>
                  </div>

                </div>
              </Popup>
            </Marker>
          )
        })}
      </FeatureGroup>
      
      <FeatureGroup>
        <Polyline color={overlayDrtConf.pathColor} dashArray={overlayDrtConf.pathDash} positions={polyline.decode(locations.itinerary)} />        
      </FeatureGroup>
      </LayerGroup>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    locations: state.otp.overlay.drt && state.otp.overlay.drt.locations
  }
}

const mapDispatchToProps = {
  setLocation,
  drtLocationsQuery
}

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(withLeaflet(DrtOverlay)))
