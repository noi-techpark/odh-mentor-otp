import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { LayerGroup, FeatureGroup, MapLayer, Marker, Popup, withLeaflet } from 'react-leaflet'
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

import MarkerClusterGroup from 'react-leaflet-markercluster';
import MarkerCluster from "../icons/modern/MarkerCluster";

import config from '../../config.yml';
import connectedStopsOverlay from '../../components/map/connected-stops-overlay'

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

    if (this.props.visible) {
      this._startRefreshing()
    }
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
    const { locations, t, activeFilters} = this.props
    if (!locations || locations.length === 0) return <LayerGroup />

    const markerIcon = station => {
      let badgeType = 'success';
      let badgeCounter = station.capacity || 0;

      if(station.free > 0) {
        badgeType = 'warning';
        if (station.free === station.capacity) {
          badgeType = 'success';
        }
      }
      else {
        badgeType = 'danger';
      }

      return divIcon({
        className: "",
        iconSize: [overlayChargerConf.iconWidth, overlayChargerConf.iconHeight],
        popupAnchor: [0, -overlayChargerConf.iconHeight / 2],
        html: ReactDOMServer.renderToStaticMarkup(
          <BadgeIcon type={badgeType} width={overlayChargerConf.iconWidth}>
            <MarkerCharger
              width={overlayChargerConf.iconWidth}
              height={overlayChargerConf.iconHeight}
              iconColor={overlayChargerConf.iconColor}
              markerColor={overlayChargerConf.iconMarkerColor}
            />
          </BadgeIcon>
        )
      });
    }

    const markerClusterIcon = cluster => {
      const text = cluster.getChildCount();    
      return L.divIcon({
        className: 'marker-cluster-svg',
        iconSize: [overlayChargerConf.iconWidth, overlayChargerConf.iconHeight],
        html: ReactDOMServer.renderToStaticMarkup(
          <MarkerCluster
              text={text}
              textColor={'white'}
              markerColor={overlayChargerConf.iconMarkerColor}
            />
          )
      });
    }

    const filters = activeFilters[ overlayChargerConf.type ]

/*    const enabledFiltersVals = {};
    for (let filterProperty in filters) {
      if (filters[filterProperty] &&
          filters[filterProperty].enabled === true &&
          Array.isArray(filters[filterProperty].values)) {   //only enabled filters

        let enabledValues = filters[filterProperty].values.filter(val => {
          return val.enabled === true;
        }).map(val => {
          //TODO reformat values example reservable: 'true', 'undefined', 'false', 'null'
          return val.value
        });

        enabledFiltersVals[filterProperty]= enabledValues;
      }
    }

    console.log('ENABLED_FILTERS',enabledFiltersVals)*/

    const locationsFiltered = locations.filter(station => {

      const intersected = (arA, arB) => {
        let ret = [arA, arB].reduce((a, b) => a.filter(c => b.includes(c)));
        return ret.length > 0;
      }

      const retFilters = [];

      let retValue = true;

      //TODO move out for over filters
      for (let filterProperty in filters) {
        if (filters[filterProperty] &&
            filters[filterProperty].enabled === true &&
            Array.isArray(filters[filterProperty].values)) {   //only enabled filters

          let enabledValues = filters[filterProperty].values.filter(val => {
            return val.enabled === true;
          }).map(val => val.value);

          let disabledValues = filters[filterProperty].values.filter(val => {
            return val.enabled === false;
          }).map(val => val.value);

          /*if(filterProperty==='plugsTypes')
            console.log('FILTER ACTIVE',filterProperty, enabledValues, disabledValues)
*/
          if (station.hasOwnProperty(filterProperty)) {

            let stationValue = station[filterProperty];

            if (Array.isArray(stationValue)) {
              console.log(station, stationValue)

              retValue = intersected(enabledValues, stationValue)
            }
            else {

              if(!enabledValues.includes( stationValue )) {  //exclude station

                retValue = false;
              }
            }

          }
        }
      }

      return retValue;
    });

    console.log('STATIONS',locationsFiltered.length);
    //console.log('ALL_VALUES_FROM_DATA', VV)

    return (  
      <LayerGroup>
        <MarkerClusterGroup
          showCoverageOnHover={false}
          maxClusterRadius={40}
          disableClusteringAtZoom={16}
          iconCreateFunction={markerClusterIcon}
        >
          {
            locationsFiltered.map(station => {

              return (
                <Marker
                  icon={markerIcon(station)}
                  key={station.station_id}
                  position={[station.lat, station.lon]}
                >
                  <Popup>
                    <div className="otp-ui-mapOverlayPopup">
                      <div className="otp-ui-mapOverlayPopup__popupHeader">
                        <Charger width={24} height={20} />&nbsp;{t('charger')}
                      </div>

                      <div className="otp-ui-mapOverlayPopup__popupTitle">{station.name}</div>
                      
                      <div>{t('provider')}: {station.provider}</div>

                      <div className="otp-ui-mapOverlayPopup__popupAvailableInfo">
                        <div className="otp-ui-mapOverlayPopup__popupAvailableInfoValue">{station.free}</div>
                        <div className="otp-ui-mapOverlayPopup__popupAvailableInfoTitle">{t('free_sockets')}</div>
                      </div>

                      <div className="otp-ui-mapOverlayPopup__popupAvailableSlots">
                        {
                          station.plugs.map((plug, key) => {
                            const ava = plug.available ? 'bg-success': 'bg-danger';
                            
                            plug.maxPower = Math.round(plug.maxPower);

                            return (
                              <div className="otp-ui-mapOverlayPopup__popupAvailableSlotItem">
                                <div>
                                  <span className={ava}></span>
                                  <strong>{t('socket')} {key+1}</strong>
                                  <br /><br />
                                  {plug.maxPower}W | {plug.minCurrent}-{plug.maxCurrent}A
                                  <br /><br />
                                  <small>{t('socket_type')} {plug.outletTypeCode}</small>
                                </div>
                              </div>
                            );
                          })
                        }
                      </div>

                      <div className="otp-ui-mapOverlayPopup__popupRow">
                        <FromToLocationPicker
                          location={station}
                          setLocation={this.props.setLocation}
                        />
                      </div>
                    </div>
                  </Popup>
                </Marker>
              )
            })
          }
        </MarkerClusterGroup>      
      </LayerGroup>
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
