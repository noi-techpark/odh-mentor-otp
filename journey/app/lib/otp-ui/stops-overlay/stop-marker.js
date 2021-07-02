import {
  languageConfigType,
  leafletPathType,
  stopLayerStopType
} from "../core-utils/types";
import FromToLocationPicker from "../from-to-location-picker";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { divIcon } from "leaflet";
import { CircleMarker, Popup, Marker } from "react-leaflet";
import { withNamespaces } from "react-i18next"
import { Button } from "react-bootstrap"
import MarkerStopStation from "../icons/modern/MarkerStopStation";
import ReactDOMServer from "react-dom/server";
import Bus from "../icons/modern/Bus";
import config from '../../config.yml';

const overlayStopConf = config.map.overlays.filter(item => item.type === 'stops')[0]

const stopMarkerIcon = divIcon({
  iconSize: [overlayStopConf.iconWidth, overlayStopConf.iconHeight],
  popupAnchor: [0, -overlayStopConf.iconHeight / 2],
  html: ReactDOMServer.renderToStaticMarkup(
    <MarkerStopStation
      width={overlayStopConf.iconWidth}
      height={overlayStopConf.iconHeight}
      iconColor={overlayStopConf.iconColor}
      markerColor={overlayStopConf.iconMarkerColor}
    />
  ),
  className: ""
});;


class StopMarker extends Component {
  onClickView = () => {
    const { setViewedStop, stop } = this.props;
    setViewedStop({ stopId: stop.id });
  };

  onFromClick = () => {
    this.setLocation("from");
  };

  onToClick = () => {
    this.setLocation("to");
  };

  setLocation(locationType) {
    const { setLocation, stop } = this.props;
    const { lat, lon, name } = stop;
    setLocation({ location: { lat, lon, name }, locationType });
  }

  render() {
    const { languageConfig, leafletPath, radius, stop, t } = this.props;
    const { id, name, lat, lon } = stop;
    const idArr = id.split(":");
    const agency = idArr[0];
    const stopId = idArr.pop();

    return (
      <Marker
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...leafletPath}
        position={[lat, lon]}
        icon={stopMarkerIcon}
      >
        <Popup>
          <div className="otp-ui-mapOverlayPopup">
            <div className="otp-ui-mapOverlayPopup__popupHeader">
              <Bus />

              <Button bsStyle="link" onClick={this.onClickView} title={`Stop ID: ${stopId}`}>
                {t(languageConfig.stopViewer || 'stop')}
              </Button>
            </div>

            <div className="otp-ui-mapOverlayPopup__popupTitle">{name}</div>
            {/* {
              agency &&
                <div className="otp-ui-mapOverlayPopup__popupRow">
                  <strong>Agency:</strong> {agency}
                </div>
            } */}

            {/* The "Set as [from/to]" ButtonGroup */}
            <div className="otp-ui-mapOverlayPopup__popupRow">
              <FromToLocationPicker
                onFromClick={this.onFromClick}
                onToClick={this.onToClick}
              />
            </div>
          </div>
        </Popup>
      </Marker>
    );
  }
}

StopMarker.propTypes = {
  languageConfig: languageConfigType.isRequired,
  leafletPath: leafletPathType,
  radius: PropTypes.number,
  setLocation: PropTypes.func.isRequired,
  setViewedStop: PropTypes.func.isRequired,
  stop: stopLayerStopType.isRequired
};

StopMarker.defaultProps = {
  leafletPath: {
    color: "#095980",
    fillColor: "#FFF",
    fillOpacity: 1,
    weight: 1
  },
  radius: 8
};

export default withNamespaces()(StopMarker)
