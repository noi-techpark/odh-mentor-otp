import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { LayerGroup, FeatureGroup, MapLayer, Marker, Popup, withLeaflet } from 'react-leaflet'
import { divIcon } from 'leaflet'
import { withNamespaces } from "react-i18next";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { setLocation } from '../../actions/map'
import { parkingLocationsQuery } from '../../actions/parking'

import BadgeIcon from "../icons/badge-icon";

import MarkerParking from "../icons/modern/MarkerParking";
import MarkerParkingSensor from "../icons/modern/MarkerParkingSensor";
import ReactDOMServer from "react-dom/server";
import Parking from "../icons/modern/Parking";
import FromToLocationPicker from '../from-to-location-picker'

import MarkerClusterGroup from 'react-leaflet-markercluster';
import MarkerCluster from "../icons/modern/MarkerCluster";

import config from '../../config.yml';

const overlayParkingConf = config.map.overlays.filter(item => item.type === 'parking')[0];

class ParkingOverlay extends MapLayer {
  static propTypes = {
    api: PropTypes.string,
    locations: PropTypes.array,
    parkingLocationsQuery: PropTypes.func,
    setLocation: PropTypes.func
  }

  _startRefreshing () {
    // ititial station retrieval
    this.props.parkingLocationsQuery(this.props.api)

    // set up timer to refresh stations periodically
    this._refreshTimer = setInterval(() => {
      this.props.parkingLocationsQuery(this.props.api)
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

      if( data.type === 'station') {

         if (data.free === 1) {
          badgeType = 'warning';
          badgeCounter = data.free
        }

        if (data.free === 0 ) {
          badgeType = 'danger';
          badgeCounter = null;
        }
        
        iconWidth = overlayParkingConf.iconWidth;
        iconHeight = overlayParkingConf.iconHeight;
      }
      else if (data.type === 'sensorGroup') {

        badgeCounter = data.capacity;
        iconWidth = parseInt(overlayParkingConf.iconWidth*0.7);
        iconHeight = parseInt(overlayParkingConf.iconHeight*0.7);
      }
      else if (data.type === 'sensor') {

        if (data.free === true ) {
          badgeType = 'success';
        } else if (data.free === false) {
          badgeType = 'danger';
        }

        badgeCounter = null;
        iconWidth = parseInt(overlayParkingConf.iconWidth*0.7);
        iconHeight = parseInt(overlayParkingConf.iconHeight*0.7);
      }

      return divIcon({
        className: "",
        iconSize: [iconWidth, iconHeight],
        popupAnchor: [0, -iconHeight / 2],
        html: ReactDOMServer.renderToStaticMarkup(
          <BadgeIcon type={badgeType} width={iconWidth}>
          { data.type === 'station' && 
            <MarkerParking
              width={iconWidth}
              height={iconHeight}
              iconColor={overlayParkingConf.iconColor}
              markerColor={overlayParkingConf.iconMarkerColor}
            />
          }
          { data.type === 'sensor' && 
            <MarkerParkingSensor
              width={iconWidth}
              height={iconHeight}
              iconColor={overlayParkingConf.iconColor}
              markerColor={overlayParkingConf.iconMarkerColor}
            />
          }
          { data.type === 'sensorGroup' && 
            <MarkerParkingSensor
              width={iconWidth}
              height={iconHeight}
              iconColor={overlayParkingConf.iconColor}
              markerColor={overlayParkingConf.iconMarkerColor}
            />
          }
          </BadgeIcon>
        )
      });
    }
    
    const clusterIcon = cluster => {
      const text = cluster.getChildCount();
     
      return L.divIcon({
        className: 'marker-cluster-svg',
        iconSize: [overlayParkingConf.iconWidth, overlayParkingConf.iconHeight],
        html: ReactDOMServer.renderToStaticMarkup(
          <MarkerCluster
              text={text}
              textColor={'white'}
              markerColor={overlayParkingConf.iconMarkerColor}
            />
          )
      });
    }

    return (
      <LayerGroup>
      <MarkerClusterGroup
        showCoverageOnHover={false}
        maxClusterRadius={40}
        disableClusteringAtZoom={16}
        iconCreateFunction={clusterIcon}
      >
        {
         locations.map( station => {
            if(station.type!=='sensor') return null;
            return (
              <Marker
                icon={markerIcon(station)}
                key={station.station_id}
                position={[station.lat, station.lon]}
              >
              <Popup>
                <div className="otp-ui-mapOverlayPopup">
                  <div className="otp-ui-mapOverlayPopup__popupHeader">
                    <Parking width={24} height={20} />&nbsp;{t('parking')}
                  </div>

                  <div className="otp-ui-mapOverlayPopup__popupTitle">{station.name}</div>
                  <small>{station.group_name}</small>

                  <div className='popup-row'>
                    <FromToLocationPicker
                      location={station}
                      setLocation={this.props.setLocation}
                    />
                  </div>
                </div>
              </Popup>
              </Marker>
            );
          })
        }
      </MarkerClusterGroup>
      <FeatureGroup>
        {
          locations.map( station => {
          if(station.type!=='station' && station.type!== 'sensorGroup') return null;
          return (
            <Marker
              icon={markerIcon(station)}
              key={station.station_id}
              position={[station.lat, station.lon]}
            >
              <Popup>
                <div className="otp-ui-mapOverlayPopup">
                  <div className="otp-ui-mapOverlayPopup__popupHeader">
                    <Parking width={24} height={20} />&nbsp;{t('parking')}
                  </div>

                  <div className="otp-ui-mapOverlayPopup__popupTitle">{station.name}</div>
                  <small>{station.group_name}</small>
                  {
                    station.type === 'station' &&
                    <div className="otp-ui-mapOverlayPopup__popupAvailableInfo">
                      <CircularProgressbar
                        value={station.free}
                        minValue={0}
                        maxValue={station.capacity}
                        text={station.free+''}
                        className="otp-ui-mapOverlayPopup__popupAvailableInfoProgress"
                      />
                      <div className="otp-ui-mapOverlayPopup__popupAvailableInfoTitle">{t('capacity')}: {station.capacity}</div>
                    </div>
                  }

                  {
                    station.type === 'sensorGroup' && 
                    <div className="otp-ui-mapOverlayPopup__popupAvailableSlots">
                        {
                          station.sensors.map( sensor => {
                            const free = sensor.free ? 'bg-success': 'bg-danger';
                            return (
                               <div className="otp-ui-mapOverlayPopup__popupAvailableSlotItem">
                                <div>
                                  <span className={free}></span>
                                  <strong>{sensor.name}</strong>
                                </div>
                              </div>
                            );
                          })
                        }   
                    </div>
                  }

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

const mapStateToProps = (state, ownProps) => {
  return {
    locations: state.otp.overlay.parking && state.otp.overlay.parking.locations
  }
}

const mapDispatchToProps = {
  setLocation,
  parkingLocationsQuery
}

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(withLeaflet(ParkingOverlay)))
