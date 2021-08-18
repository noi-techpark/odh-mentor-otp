import { divIcon } from "leaflet";
import memoize from "lodash.memoize";
import { getCompaniesLabelFromNetworks } from "../core-utils/itinerary";
import {
  companyType,
  vehicleRentalMapOverlaySymbolsType,
  stationType
} from "../core-utils/types";
import FromToLocationPicker from "../from-to-location-picker";
import PropTypes from "prop-types";
import React from "react";
import { withNamespaces } from "react-i18next"
import ReactDOMServer from "react-dom/server";
import {
  FeatureGroup,
  Marker,
  MapLayer,
  Popup,
  withLeaflet
} from "react-leaflet";

import { MapMarkerAlt } from "@styled-icons/fa-solid";
import MarkerCarSharing from "../icons/modern/MarkerCarSharing";
import MarkerBikeSharing from "../icons/modern/MarkerBikeSharing";
import BikeSharing from "../icons/modern/BikeSharing";
import CarSharing from "../icons/modern/CarSharing";
import BadgeIcon from "../icons/badge-icon";
import config from '../../config.yml';

import carNissanLeaf from '../../images/cars/nissan-leaf.jpg';
import carVwCaddy from '../../images/cars/vw-caddy.jpg';
import carGolfVariant from '../../images/cars/vw-golf-variant.jpg';
import carGolf from '../../images/cars/vw-golf.jpg';
import carVwUp from '../../images/cars/vw-up.jpg';
import carPlaceholder from '../../images/cars/placeholder.png';


const carModels = {
'defaultCar': carPlaceholder,
'renault-zoe': carPlaceholder,
//
'nissan-leaf': carNissanLeaf,
'vw-caddy-caddy-20-tdi': carVwCaddy,
'vw-egolf': carGolf,
'vw-eup': carVwUp,
'vw-golf': carGolf,
'vw-golf-golf-16-tdi': carGolf,
'vw-golf-vw-golf': carGolf,
'vw-up': carVwUp,
'vw-up-vw-up': carVwUp,
'vw-golf-variant-16-tdi-comf-8mt': carGolfVariant
};

const getCarModel = model => {
    return carModels[model] || carModels.defaultCar;
};

const overlayCarSharingConf = config.map.overlays.filter(item => item.type === 'car-rental')[0]
const overlayBikeSharingConf = config.map.overlays.filter(item => item.type === 'bike-rental')[0]

const getMarkerCarSharing = memoize(badgeCounter => {

  let badgeType = (badgeCounter === 0) ? 'danger' : 'warning';

  if (badgeCounter > 1)
    badgeType = 'success';

  return divIcon({
    className: "",
    iconSize: [overlayCarSharingConf.iconWidth, overlayCarSharingConf.iconHeight],
    popupAnchor: [0, -overlayCarSharingConf.iconHeight / 2],
    html: ReactDOMServer.renderToStaticMarkup(
      <BadgeIcon width={overlayCarSharingConf.iconWidth} type={badgeType}>
        <MarkerCarSharing
          width={overlayCarSharingConf.iconWidth}
          height={overlayCarSharingConf.iconHeight}
          iconColor={overlayCarSharingConf.iconColor}
          markerColor={overlayCarSharingConf.iconMarkerColor}
        />
      </BadgeIcon>
    )
  })
});

const getMarkerBikeSharing = memoize(badgeCounter => {
  let badgeType = (badgeCounter === 0) ? 'danger' : 'warning';

  if (badgeCounter > 1)
    badgeType = 'success';

  return divIcon({
    className: "",
    iconSize: [overlayBikeSharingConf.iconWidth, overlayBikeSharingConf.iconHeight],
    popupAnchor: [0, -overlayBikeSharingConf.iconHeight / 2],
    html: ReactDOMServer.renderToStaticMarkup(
      <BadgeIcon width={overlayBikeSharingConf.iconWidth} type={badgeType}>
        <MarkerBikeSharing
          width={overlayBikeSharingConf.iconWidth}
          height={overlayBikeSharingConf.iconHeight}
          iconColor={overlayBikeSharingConf.iconColor}
          markerColor={overlayBikeSharingConf.iconMarkerColor}
        />
      </BadgeIcon>
    )
  })
});

const getStationMarkerByColor = memoize(() =>
  divIcon({
    className: "",
    iconSize: [20, 20],
    popupAnchor: [0, -10],
    html: ReactDOMServer.renderToStaticMarkup(
      <MapMarkerAlt width={20} height={20} />
    )
  })
);

/**
 * This vehicle rental overlay can be used to render vehicle rentals of various
 * types. This layer can be configured to show different styles of markers at
 * different zoom levels.
 */
class VehicleRentalOverlay extends MapLayer {
  createLeafletElement() {}

  updateLeafletElement() {}

  startRefreshing() {
    const { refreshVehicles } = this.props;

    // Create the timer only if refreshVehicles is a valid function.
    if (typeof refreshVehicles === "function") {
      // initial station retrieval
      refreshVehicles(this.props.api);

      // set up timer to refresh stations periodically
      this.refreshTimer = setInterval(() => {
        refreshVehicles();
      }, 30000); // defaults to every 30 sec. TODO: make this configurable?
    }
  }

  stopRefreshing() {
    if (this.refreshTimer) clearInterval(this.refreshTimer);
  }

  componentDidMount() {
    const { companies, mapSymbols, name, visible } = this.props;

    if (visible) this.startRefreshing();
    if (!mapSymbols)
      console.warn(`No map symbols provided for layer ${name}`, companies);
  }

  componentWillUnmount() {
    this.stopRefreshing();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.visible && this.props.visible) {
      this.startRefreshing();
    } else if (prevProps.visible && !this.props.visible) {
      this.stopRefreshing();
    }
  }

  /**
   * Render some popup html for a station. This contains custom logic for
   * displaying rental vehicles in the TriMet MOD website that might not be
   * applicable to other regions.
   */
  renderPopupForStation = (station, stationIsHub = false) => {
    const { configCompanies, getStationName, setLocation, t } = this.props;
    const stationName = getStationName(configCompanies, station);
    const location = {
      lat: station.y || station.lat,
      lon: station.x || station.lon,
      name: stationName
    };
    return (
      <Popup>
        <div className="otp-ui-mapOverlayPopup">
          {
            typeof station.isCarStation === 'boolean' && !station.isCarStation &&
              <>
                <div className="otp-ui-mapOverlayPopup__popupHeader">
                  <BikeSharing width={26} height={22} />&nbsp;&nbsp;{t('bikesharing')}
                </div>

                <div className="otp-ui-mapOverlayPopup__popupTitle">{stationName}</div>

                {
                  station.bikesAvailable !== null &&
                    <div className="otp-ui-mapOverlayPopup__popupAvailableInfo">
                      <div className="otp-ui-mapOverlayPopup__popupAvailableInfoValue">{station.bikesAvailable}</div>
                      <div className="otp-ui-mapOverlayPopup__popupAvailableInfoTitle">{t('available_bikes')}</div>
                    </div>
                }
              </>
          }

          {
            typeof station.isFloatingCar === 'boolean' &&
              <>
                <div className="otp-ui-mapOverlayPopup__popupHeader">
                  <CarSharing width={26} height={22} />&nbsp;&nbsp;{t('carsharing')}
                </div>

                <div className="otp-ui-mapOverlayPopup__popupTitle">{stationName}</div>

                {
                  station.carsAvailable !== null &&
                    <>
                      <div className="otp-ui-mapOverlayPopup__popupAvailableInfo">
                        <div className="otp-ui-mapOverlayPopup__popupAvailableInfoValue">{station.carsAvailable}</div>
                        <div className="otp-ui-mapOverlayPopup__popupAvailableInfoTitle">{t('available_cars')}</div>
                      </div>
                    </>
                }
              </>
          }

          {
            station.type === 'carsharing-hub' &&
              <>
                <div className="otp-ui-mapOverlayPopup__popupHeader">
                  <CarSharing width={26} height={22} />&nbsp;&nbsp;{t('carsharing')}
                </div>

                <div className="otp-ui-mapOverlayPopup__popupTitle">{stationName}</div>

                {
                  station.free !== null &&
                    <>
                      <div className="otp-ui-mapOverlayPopup__popupAvailableInfo">
                        <div className="otp-ui-mapOverlayPopup__popupAvailableInfoValue">{station.free}</div>
                        <div className="otp-ui-mapOverlayPopup__popupAvailableInfoTitle">{t('available_cars')}</div>
                      </div>

                      <div className="otp-ui-mapOverlayPopup__popupAvailableSlots">
                      {
                        station.groupVehicles && station.groupVehicles.map( groupVehicle => {
                          if (groupVehicle.modelId) {
                            
                            const ava = groupVehicle.free > 0 ? 'bg-success': 'bg-danger';

                            return (
                            <div className="otp-ui-mapOverlayPopup__popupAvailableSlotItem">
                              <div>
                                <span className={ava}></span>
                                <strong>{groupVehicle.modelName}</strong>
                                <br />
                                <img src={getCarModel(groupVehicle.modelId)} />
                                <small>{t('availability')} {groupVehicle.free}</small>
                              </div>
                            </div>
                            )
                          }
                        })
                      }
                      </div>

                      <div className="otp-ui-mapOverlayPopup__popupRow">
                        <a className="btn btn-link btn-small" href="https://www.carsharing.bz.it">{t('book')}</a>
                      </div>
                    </>
                }
              </>
          }
          <div className="otp-ui-mapOverlayPopup__popupRow">
            <FromToLocationPicker
              location={location}
              setLocation={setLocation}
            />
          </div>
        </div>
      </Popup>
    );
  };

  renderStation = station => {
    if (station.isFloatingBike)
      return null

    let icon = null

    if (typeof station.isCarStation === 'boolean' && !station.isCarStation) {
      icon = getMarkerBikeSharing(station.bikesAvailable)
    } else if (typeof station.isFloatingCar === 'boolean' || station.type === "carsharing-hub") {
      icon = getMarkerCarSharing(station.free)
    } else {
      icon = getStationMarkerByColor()
    }

    return (
      <Marker icon={icon} key={station.id} position={[station.y || station.lat, station.x || station.lon]}>
        {this.renderPopupForStation(station)}
      </Marker>
    );
  };

  render() {
    const { stations, companies } = this.props;
    let filteredStations = stations;
    if (companies) {
      filteredStations = stations.filter(
        station =>
          station.networks.filter(value => companies.includes(value)).length > 0
      );
    }

    if (!filteredStations || filteredStations.length === 0) {
      return <FeatureGroup />;
    }

    const deg2rad = (deg) => {
      return deg * (Math.PI/180)
    }
    const getDistanceFromLatLonInMeters = (lat1, lon1, lat2, lon2) => {
      
      let R = 6371 * 1000; // Radius of the earth in meters
      let dLat = deg2rad(lat2-lat1);  // deg2rad below
      let dLon = deg2rad(lon2-lon1); 
      let a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      let d = R * c; // Distance in meters
      return d;
    }

    for(let station of filteredStations){
      if(station.isFloatingBike){
        let nearest = null;
        let lastDistance = null;
        for(let i = 0; i <  filteredStations.length; i++){
          const mstation = filteredStations[i];          
          if(mstation.isFloatingBike === false 
            && mstation.networks[0] == station.networks[0]
            ){
              const distance = getDistanceFromLatLonInMeters(station.y, station.x, mstation.y, mstation.x);
              if (lastDistance == null || distance < lastDistance){
                nearest = i;
                lastDistance = distance;        
              }
                  
          }
        }
        if(nearest){
          filteredStations[nearest].bikesAvailable += 1;
        }

      }
    }

    return (
      <FeatureGroup>{filteredStations.map(this.renderStation)}</FeatureGroup>
    );
  }
}

VehicleRentalOverlay.props = {
  /**
   * The entire companies config array.
   */
  configCompanies: PropTypes.arrayOf(companyType.isRequired).isRequired,
  /**
   * A list of companies that are applicable to just this instance of the
   * overlay.
   */
  companies: PropTypes.arrayOf(PropTypes.string.isRequired),
  /**
   * An optional custom function to create a string name of a particular vehicle
   * rental station. This function takes two arguments of the configCompanies
   * prop and a vehicle rental station. The function must return a string.
   */
  getStationName: PropTypes.func,
  /**
   * A configuration of what map markers or symbols to show at various zoom
   * levels.
   */
  mapSymbols: vehicleRentalMapOverlaySymbolsType,
  /**
   * If specified, a function that will be triggered every 30 seconds whenever this layer is
   * visible.
   */
  refreshVehicles: PropTypes.func,
  /**
   * A callback for when a user clicks on setting this stop as either the from
   * or to location of a new search.
   *
   * This will be dispatched with the following argument:
   *
   * ```js
   *  {
   *    location: {
   *      lat: number,
   *      lon: number,
   *      name: string
   *    },
   *    locationType: "from" or "to"
   *  }
   * ```
   */
  setLocation: PropTypes.func.isRequired,
  /**
   * A list of the vehicle rental stations specific to this overlay instance.
   */
  stations: PropTypes.arrayOf(stationType),
  /**
   * Whether the overlay is currently visible.
   */
  visible: PropTypes.bool,
  /**
   * The current map zoom level.
   */
  zoom: PropTypes.number.isRequired
};

VehicleRentalOverlay.defaultProps = {
  getStationName: (configCompanies, station) => {
    const stationNetworks = getCompaniesLabelFromNetworks(
      station.networks,
      configCompanies
    );
    let stationName = station.name || station.id;
    if (station.isFloatingBike) {
      stationName = `Free-floating bike: ${stationName}`;
    } else if (station.isFloatingCar) {
      stationName = `${stationNetworks} ${stationName}`;
    } else if (station.isFloatingVehicle) {
      // assumes that all floating vehicles are E-scooters
      stationName = `${stationNetworks} E-scooter`;
    }
    return stationName;
  },
  mapSymbols: null,
  refreshVehicles: null,
  stations: [],
  visible: false
};

export default withNamespaces()(withLeaflet(VehicleRentalOverlay));
