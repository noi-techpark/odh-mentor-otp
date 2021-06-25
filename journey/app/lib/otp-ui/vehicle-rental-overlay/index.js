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
import BadgeIcon from "../icons/badge-icon";

const getMarkerCarSharing = memoize(badgeCounter =>
  divIcon({
    className: "",
    iconSize: [54, 62],
    popupAnchor: [0, -31],
    html: ReactDOMServer.renderToStaticMarkup(
      <BadgeIcon counter={badgeCounter}>
        <MarkerCarSharing width={54} height={62} />
      </BadgeIcon>
    )
  })
);

const getMarkerBikeSharing = memoize(badgeCounter =>
  divIcon({
    className: "",
    iconSize: [54, 62],
    popupAnchor: [0, -31],
    html: ReactDOMServer.renderToStaticMarkup(
      <BadgeIcon counter={badgeCounter}>
        <MarkerBikeSharing width={54} height={62} />
      </BadgeIcon>
    )
  })
);

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
      refreshVehicles();

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
      lat: station.y,
      lon: station.x,
      name: stationName
    };
    return (
      <Popup>
        <div className="otp-ui-mapOverlayPopup">
          <div className="otp-ui-mapOverlayPopup__popupTitle">{stationName}</div>

          {/* render dock info if it is available */}
          {stationIsHub && (
            <div className="otp-ui-mapOverlayPopup__popupRow">
              <div>{t('available_bikes')}: {station.bikesAvailable}</div>
              <div>{t('available_docks')}: {station.spacesAvailable}</div>
            </div>
          )}

          {/* Set as from/to toolbar */}
          <div className="otp-ui-mapOverlayPopup__popupRow">
            <b>{t('travel')}</b>
            <FromToLocationPicker
              location={location}
              setLocation={setLocation}
            />
          </div>
        </div>
      </Popup>
    );
  };

  renderStationAsMarkerIcon = station => {
    if (station.isFloatingBike)
      return null

    let icon = null

    console.log(station)

    if (typeof station.isCarStation === 'boolean' && !station.isCarStation) {
      icon = getMarkerBikeSharing(station.bikesAvailable)
    } else if (typeof station.isFloatingCar === 'boolean') {
      icon = getMarkerCarSharing(station.carsAvailable)
    } else {
      icon = getStationMarkerByColor()
    }

    return (
      <Marker icon={icon} key={station.id} position={[station.y, station.x]}>
        {this.renderPopupForStation(station)}
      </Marker>
    );
  };

  renderStationAsHubAndFloatingBike = station => {
    if (station.isFloatingBike)
      return null

    // const pctFull =
    //   station.bikesAvailable /
    //   (station.bikesAvailable + station.spacesAvailable);

    // const i = Math.round(pctFull * 9);
    // const icon = hubIcons[i];

    const icon = getMarkerBikeSharing(station.bikesAvailable)

    return (
      <Marker icon={icon} key={station.id} position={[station.y, station.x]}>
        {this.renderPopupForStation(station, !station.isFloatingBike)}
      </Marker>
    );
  };

  renderStationAsMarker = (station, symbolDef) => {
    const color =
      symbolDef && symbolDef.fillColor ? symbolDef.fillColor : "gray";
    const markerIcon = getStationMarkerByColor(color);

    return (
      <Marker
        icon={markerIcon}
        key={station.id}
        position={[station.y, station.x]}
      >
        {this.renderPopupForStation(station)}
      </Marker>
    );
  };

  renderStation = station => {
    // render the station according to any map symbol configuration
    const { mapSymbols } = this.props;

    // no config set, just render a default marker
    if (!mapSymbols) return this.renderStationAsMarker(station);

    // get zoom to check which symbol to render
    const zoom = this.props.leaflet.map.getZoom();

    for (let i = 0; i < mapSymbols.length; i++) {
      const symbolDef = mapSymbols[i];
      if (symbolDef.minZoom <= zoom && symbolDef.maxZoom >= zoom) {
        switch (symbolDef.type) {
          case "circle":
            return this.renderStationAsMarkerIcon(station);
          case "hubAndFloatingBike":
            return this.renderStationAsHubAndFloatingBike(station);
          default:
            return this.renderStationAsMarker(station, symbolDef);
        }
      }
    }

    // no matching symbol definition, render default marker
    return this.renderStationAsMarker(station);
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
