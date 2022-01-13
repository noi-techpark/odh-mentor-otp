import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { LayerGroup, FeatureGroup, GeoJSON, MapLayer, Marker, Popup, withLeaflet, Polyline } from 'react-leaflet'
import { divIcon } from 'leaflet'
import { withNamespaces } from "react-i18next";
import { Button } from "react-bootstrap";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { setLocation } from '../../actions/map';
import { trafficLocationsQuery } from '../../actions/traffic';

//import BadgeIcon from "../icons/badge-icon";

import ReactDOMServer from "react-dom/server";
import FromToLocationPicker from '../from-to-location-picker'

import { ClassicCar } from "../icons/classic";

import config from '../../config.yml';

//import polyline from "@mapbox/polyline";

const overlayTrafficConf = config.map.overlays.filter(item => item.type === 'traffic')[0];

class TrafficOverlay extends MapLayer {
  static propTypes = {
    api: PropTypes.string,
    //locations: PropTypes.array,
    locations: PropTypes.object,
    trafficLocationsQuery: PropTypes.func,
    setLocation: PropTypes.func
  }

  _startRefreshing () {
    // ititial station retrieval
    this.props.trafficLocationsQuery(this.props.api)

    // set up timer to refresh stations periodically
    this._refreshTimer = setInterval(() => {
      this.props.trafficLocationsQuery(this.props.api)
    }, Number(overlayTrafficConf.pollingInterval)) // defaults to every 30 sec. TODO: make this configurable?*/
  }

  _stopRefreshing () {
    if (this._refreshTimer) clearInterval(this._refreshTimer)
  }

  componentDidMount () {
    this.props.registerOverlay(this)

    if (this.props.visible) {
      this._startRefreshing()
    }
    //this.props.leaflet.map.on('zoomend', this.updatePolylineWeigth);
  }

  componentWillUnmount () {
    this._stopRefreshing()
    //this.props.leaflet.map.off('zoomend', this.updatePolylineWeigth);
  }

/*  updatePolylineWeigth = () => {
    const z = this.props.leaflet.map.getZoom();
    console.log('ZOOM',z);

    //TODO change geojson layer weight

  }*/

  onOverlayAdded = (e) => {
    this._startRefreshing();
  }

  onOverlayRemoved = () => {
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

    const getStyle = feature => ({
        weight: 4,
        opacity: !feature.properties.level ? 0.4 : 1,
        color: overlayTrafficConf.levelColors[ feature.properties.level ]
    });

    const onEachFeature = (feature, layer) => {
      if(feature.properties?.value) {
        let time = Math.round(feature.properties.value/60);
/*        const popupContent = ReactDOMServer.renderToString(
          <div className="otp-ui-mapOverlayPopup">
            <div className="otp-ui-mapOverlayPopup__popupHeader">
              <span bsStyle="link">{t('traffic')}</span>
            </div>
            <div className="otp-ui-mapOverlayPopup__popupTitle">{t('traffic_travel_time')}</div>
            <small>{time} min</small>
          </div>
        );*/
        const tooltipContent = ReactDOMServer.renderToString(
          <><ClassicCar height={14} width={14} />{time} min</>
        );
        //layer.bindPopup(popupContent);

        if (feature.properties.level>1) {
          layer.bindTooltip(tooltipContent, {
            permanent: true,
            sticky: true
          });
        }

       /* let map = this.props.leaflet.map;
        layer.on('click', e => {

          if (map.getZoom() < 18 ) {
            e.target.closePopup();
          }
        })*/
      }
    };

    if (!locations ||
        !locations.linkstations ||
        locations.linkstations.length === 0) return <LayerGroup />

    return (
      <LayerGroup>
        <GeoJSON
          data={locations.linkstations}
          onEachFeature={onEachFeature}
          style={getStyle}
        />
      </LayerGroup>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    locations: state.otp.overlay.traffic && state.otp.overlay.traffic.locations
  }
}

const mapDispatchToProps = {
  setLocation,
  trafficLocationsQuery
}

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(withLeaflet(TrafficOverlay)))
