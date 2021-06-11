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

const stopMarkerIcon = divIcon({
  iconSize: [20, 20],
  popupAnchor: [0, -10],
  html: ReactDOMServer.renderToStaticMarkup(
    <MarkerStopStation width={15} height={15} />
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
            <div className="otp-ui-mapOverlayPopup__popupTitle">{name}</div>
            {/* {
              agency &&
                <div className="otp-ui-mapOverlayPopup__popupRow">
                  <strong>Agency:</strong> {agency}
                </div>
            } */}
            <div className="otp-ui-mapOverlayPopup__popupRow">
              <span>
                <strong>Stop ID:</strong> {stopId}
                <Button bsStyle="link" onClick={this.onClickView}>
                  {t(languageConfig.stopViewer || 'stop')}
                </Button>
              </span>
            </div>

            {/* The "Set as [from/to]" ButtonGroup */}
            <div className="otp-ui-mapOverlayPopup__popupRow">
              <strong>{t('travel')}</strong>
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
