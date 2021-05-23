import FromToLocationPicker from "../from-to-location-picker";
import PropTypes from "prop-types";
import React from "react";
import { divIcon } from "leaflet";
import ReactDOMServer from "react-dom/server";
import {
  FeatureGroup,
  MapLayer,
  Marker,
  Popup,
  withLeaflet
} from "react-leaflet";
import { withNamespaces } from "react-i18next"

const parkAndRideMarker = divIcon({
  iconSize: [20, 20],
  popupAnchor: [0, -10],
  html: ReactDOMServer.renderToStaticMarkup(
    <div className="otp-ui-parkAndRideOverlay__marker">P</div>
  ),
  className: ""
});;

class ParkAndRideOverlay extends MapLayer {
  componentDidMount() {}

  componentWillUnmount() {}

  createLeafletElement() {}

  updateLeafletElement() {}

  render() {
    const { parkAndRideLocations, setLocation, t } = this.props;
    if (!parkAndRideLocations || parkAndRideLocations.length === 0)
      return <FeatureGroup />;

    return (
      <FeatureGroup>
        {parkAndRideLocations.map((location, k) => {
          const name = location.name.startsWith("P+R ")
            ? location.name.substring(4)
            : location.name;
          return (
            <Marker
              icon={parkAndRideMarker}
              key={k}
              position={[location.y, location.x]}
            >
              <Popup>
                <div className="otp-ui-mapOverlayPopup">
                  <div className="otp-ui-mapOverlayPopup__popupRow">{name}</div>

                  {/* Set as from/to toolbar */}
                  <div className="otp-ui-mapOverlayPopup__popupTitle">
                    <strong>{t('travel')}</strong>
                    <FromToLocationPicker
                      location={{
                        lat: location.y,
                        lon: location.x,
                        name
                      }}
                      setLocation={setLocation}
                    />
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </FeatureGroup>
    );
  }
}

ParkAndRideOverlay.propTypes = {
  parkAndRideLocations: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }).isRequired
  ),
  setLocation: PropTypes.func.isRequired
};

export default withNamespaces()(withLeaflet(ParkAndRideOverlay));
