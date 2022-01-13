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
import memoize from "lodash.memoize";
import MarkerStopStation from "../icons/modern/MarkerStopStation";

import MarkerStop from "../icons/modern/MarkerStop";
import MarkerStopChild from "../icons/modern/MarkerStopChild";
import MarkerStation from "../icons/modern/MarkerStation";

import ReactDOMServer from "react-dom/server";
import Bus from "../icons/modern/Bus";
import config from '../../config.yml';

const overlayStopConf = config.map.overlays.filter(item => item.type === 'stops')[0]

const stopMarkerIcon = memoize(stop => {

  let isStation = false;
  let isStopChild = false;

  if(Array.isArray(stop.stops) && stop.stops.length > 1) {
    isStation = true;
  }
  else if(!stop.stops || stop.stops.length === 1 )  {
    isStopChild = true;
  }

  return divIcon({
    iconSize: [overlayStopConf.iconWidth, overlayStopConf.iconHeight],
    popupAnchor: [0, -overlayStopConf.iconHeight / 2],
    html: ReactDOMServer.renderToStaticMarkup(
      <>
      { isStation &&
        <MarkerStop
          width={overlayStopConf.iconWidth}
          height={overlayStopConf.iconHeight}
          iconColor={overlayStopConf.iconColor}
          markerColor={overlayStopConf.iconMarkerColor}
        />
      }
      { isStopChild &&
        <MarkerStopChild
          width={overlayStopConf.iconWidth}
          height={overlayStopConf.iconHeight}
          iconColor={overlayStopConf.iconColor}
          markerColor={overlayStopConf.iconMarkerColor}
        />
      }      
      </>
    ),
    className: ''
  });
});

class StopMarker extends Component {

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

  onClickView = () => {
    const { setViewedStop, stop } = this.props;

    let stopId = stop.id;

    if (Array.isArray(stop.stops) && stop.stops.length > 1) {
      stopId = stop.stops[0].id;
    }
    else if (Array.isArray(stop.stops) && stop.stops.length === 1) {
      stopId = stop.stops[0].id;
    }
    console.log('STOP VIEW', stop);
    setViewedStop({ stopId });
  };
  
  render() {
    const { languageConfig, leafletPath, radius, stop, t, onClick } = this.props;
    let { id, name, lat, lon, stops } = stop;

    const stopId = id.split(':').pop();

    if (Array.isArray(stops) && stops.length===1) {
      //id = stops[0].id;
      //name = stops[0].name;
      lat = stops[0].lat;
      lon = stops[0].lon;
    }

    //name = `${name} (${id})`

    return (
      <Marker
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...leafletPath}
        position={[lat, lon]}
        icon={stopMarkerIcon(stop)}
        onClick={onClick}
      >
      {
        <Popup>
          <div className="otp-ui-mapOverlayPopup">
            <div onClick={this.onClickView} className="otp-ui-mapOverlayPopup__popupHeader">
              <Bus />&nbsp;&nbsp;{t('stop')}
            </div>

            <Button bsStyle="link" className="otp-ui-mapOverlayPopup__popupTitle" onClick={this.onClickView}>{name}</Button>
            <br />
            <small>{t('stop_id')}: {stopId}</small>
            {/*
              Array.isArray(stops) && stops.length>1 && stops.map((substop, key) => {
                return(
                  <Button bsStyle="link">&bull; {substop.id}</Button>
                  );
              })
            */}
            <div className="otp-ui-mapOverlayPopup__popupRow">
              <FromToLocationPicker
                onFromClick={this.onFromClick}
                onToClick={this.onToClick}
              />
            </div>
          </div>
        </Popup>
      }
      </Marker>
    );
  }
}

//TODO may be unuseful

StopMarker.propTypes = {
  languageConfig: languageConfigType.isRequired,
  leafletPath: leafletPathType,
  radius: PropTypes.number,
  setLocation: PropTypes.func.isRequired,
  setViewedStop: PropTypes.func.isRequired,
  stop: stopLayerStopType.isRequired,
  //onClick: PropTypes.func.isRequired
};

StopMarker.defaultProps = {
  leafletPath: {
    color: "#337ab7",
    fillColor: "#fff",
    fillOpacity: 1,
    weight: 1
  },
  radius: 8,
/*  onClick: e => {
    
    //PATCH
    //
    //console.log('click default', e.target)
    
    const {leaflet, position} = e.target.options;

    leaflet.map.setView(position, Number(overlayStopConf.minZoomStation));
  }*/
};

export default withNamespaces()(StopMarker)
