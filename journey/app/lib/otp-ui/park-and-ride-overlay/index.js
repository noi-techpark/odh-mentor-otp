import * as BaseMapStyled from "../base-map/styled";
import FromToLocationPicker from "../from-to-location-picker";
import PropTypes from "prop-types";
import React from "react";
import {
  FeatureGroup,
  MapLayer,
  Marker,
  Popup,
  withLeaflet
} from "react-leaflet";
import { withNamespaces } from "react-i18next"

import parkAndRideMarker from "./park-and-ride-marker";

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
                <BaseMapStyled.MapOverlayPopup>
                  <BaseMapStyled.PopupTitle>{name}</BaseMapStyled.PopupTitle>

                  {/* Set as from/to toolbar */}
                  <BaseMapStyled.PopupRow>
                    <b>{t('travel')}</b>
                    <FromToLocationPicker
                      location={{
                        lat: location.y,
                        lon: location.x,
                        name
                      }}
                      setLocation={setLocation}
                    />
                  </BaseMapStyled.PopupRow>
                </BaseMapStyled.MapOverlayPopup>
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
