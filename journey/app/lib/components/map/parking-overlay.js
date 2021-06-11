import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FeatureGroup, MapLayer, Marker, Popup, withLeaflet } from 'react-leaflet'
import { divIcon } from 'leaflet'
import { withNamespaces } from "react-i18next";

import SetFromToButtons from './set-from-to'
import { setLocation } from '../../actions/map'
import { parkingLocationsQuery } from '../../actions/parking'

import MarkerParking from "../../otp-ui/icons/modern/MarkerParking";
import ReactDOMServer from "react-dom/server";


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
    const { locations, t } = this.props
    if (!locations || locations.length === 0) return <FeatureGroup />

    const markerIcon = (data) => {

      console.log(data)

      let bgColor, text = '';

      if( data.capacity === data.free ) {
        bgColor = 'green';
      }
      else if( data.free < data.capacity) {
        bgColor = 'grey';
        text += `${data.free}`;
      }
      else if(free ===0 ) {
        bgColor = 'red'
      }
//TODO refact
      const style = {
        backgroundColor: bgColor,
        display:'block',
        position:'absolute',
        top:'-5px',
        right:'-10px',
        float:'right',
        minWidth:12,
        height:12,
        textAlign:'center',
        borderRadius:'100%',
        color:'white',
        fontSize:9,
        fontWeight:'bold'
      };
      return divIcon({
        iconSize: [20, 20],
        popupAnchor: [0, -10],
        html: ReactDOMServer.renderToStaticMarkup(
          <div><span style={style}>{text}</span><MarkerParking width={28} height={28} /></div>
        ),
        className: ""
      });;
    }


    const bulletIconStyle = {
      color: 'gray',
      fontSize: 12,
      width: 15
    }

    return (
      <FeatureGroup>
        {locations.map((location) => {
          return (
            <Marker
              icon={markerIcon(location)}
              key={location.name}
              position={[location.lat, location.lon]}
            >
              <Popup>
                <div className='map-overlay-popup'>
                  {/* Popup title */}
                  <div className='popup-title'>
                    {t('parking')}
                  </div>

                  {/* Location info bullet */}
                  <div className='popup-row'>
                    <i className='fa fa-map-marker' style={bulletIconStyle} /> {location.name}
                  </div>

                  {/* Vehicle-count bullet */}
                  <div className='popup-row'>
                    <i className='fa fa-car' style={bulletIconStyle} /> {location.free} {t('vehicles')} Capacity: {location.capacity} 
                  </div>

                  {/* Set as from/to toolbar */}
                  <div className='popup-row'>
                    <SetFromToButtons
                      map={this.props.leaflet.map}
                      location={{
                        lat: location.lat,
                        lon: location.lon,
                        name: location.name
                      }}
                      setLocation={this.props.setLocation}
                    />
                  </div>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </FeatureGroup>
    )
  }
}

// connect to the redux store

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
