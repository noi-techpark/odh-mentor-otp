import { divIcon } from "leaflet";
import {
  constructLocation,
  matchLatLon
} from "../core-utils/map";
import { locationType } from "../core-utils/types";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Marker, Popup } from "react-leaflet";
import ReactDOMServer from "react-dom/server";
import {
  Briefcase,
  Home,
  MapMarkerAlt,
  Sync,
  Times
} from "@styled-icons/fa-solid";
import { withNamespaces } from "react-i18next"
import { ListGroup, ListGroupItem } from 'react-bootstrap'

/**
 * These icons are used to render common icons for user locations. These will
 * only show up in applications that allow saving user locations.
 */
function UserLocationIcon({ type }) {
  switch (type) {
    case "briefcase":
      return <Briefcase size={16} />;
    case "home":
      return <Home size={16} />;
    case "map-marker":
      return <MapMarkerAlt size={16} />;
    case "refresh":
      return <Sync size={16} />;
    case "times":
      return <Times size={16} />;
    default:
      return null;
  }
}

UserLocationIcon.propTypes = {
  type: PropTypes.string.isRequired
};

class Endpoint extends Component {
  rememberAsHome = () => {
    const { location: propsLocation, rememberPlace } = this.props;
    const location = { ...propsLocation };
    location.id = "home";
    location.icon = "home";
    location.type = "home";
    rememberPlace({ type: "home", location });
  };

  rememberAsWork = () => {
    const { location: propsLocation, rememberPlace } = this.props;
    const location = { ...propsLocation };
    location.id = "work";
    location.icon = "briefcase";
    location.type = "work";
    rememberPlace({ type: "work", location });
  };

  forgetHome = () => {
    const { forgetPlace } = this.props;
    forgetPlace("home");
  };

  forgetWork = () => {
    const { forgetPlace } = this.props;
    forgetPlace("work");
  };

  clearLocation = () => {
    const { clearLocation, type } = this.props;
    clearLocation({ type });
  };

  swapLocation = () => {
    const { location, setLocation, type, t } = this.props;
    this.clearLocation();
    const otherType = t(type === "from" ? "destination" : "origin");
    setLocation({ type: otherType, location });
  };

  onDragEnd = e => {
    const { setLocation, type } = this.props;
    const location = constructLocation(e.target.getLatLng());
    setLocation({ locationType: type, location, reverseGeocode: true });
  };

  render() {
    const {
      location,
      locations,
      MapMarkerIcon,
      showUserSettings,
      type,
      t
    } = this.props;
    const position =
      location && location.lat && location.lon
        ? [location.lat, location.lon]
        : null;
    if (!position) return null;
    const match = locations.find(l => matchLatLon(l, location));
    const isWork = match && match.type === "work";
    const isHome = match && match.type === "home";
    const iconHtml = ReactDOMServer.renderToStaticMarkup(
      <MapMarkerIcon location={location} type={type} />
    );
    const otherType = t(type === "from" ? "destination" : "origin");
    const icon = isWork ? "briefcase" : isHome ? "home" : "map-marker";
    return (
      <Marker
        draggable
        icon={divIcon({ html: iconHtml, className: "" })}
        position={position}
        onDragEnd={this.onDragEnd}
      >
        {showUserSettings && (
          <Popup className="otp-ui-enpointMarkerPopup">
            <ListGroup>
              <ListGroupItem>
                <strong><UserLocationIcon type={icon} /> {location.name}</strong>
              </ListGroupItem>
              <ListGroupItem
                disabled={isWork}
                onClick={isHome ? this.forgetHome : this.rememberAsHome}
              >
                {isHome ? (
                  <>
                    <UserLocationIcon type="times" /> {t('forget_home')}
                  </>
                ) : (
                  <>
                    <UserLocationIcon type="home" /> {t('save_as_home')}
                  </>
                )}
              </ListGroupItem>
              <ListGroupItem
                disabled={isHome}
                onClick={isWork ? this.forgetWork : this.rememberAsWork}
              >
                {isWork ? (
                  <>
                    <UserLocationIcon type="times" /> {t('forget_work')}
                  </>
                ) : (
                  <>
                    <UserLocationIcon type="briefcase" /> {t('save_as_work')}
                  </>
                )}
              </ListGroupItem>
              <ListGroupItem
                onClick={this.clearLocation}
              >
                <UserLocationIcon type="times" /> {t('remove_as_location', { label: type })}
              </ListGroupItem>
              <ListGroupItem
                bsStyle="link"
                onClick={this.swapLocation}
              >
                <UserLocationIcon type="refresh" /> {t('change_in_location', { label: otherType })}
              </ListGroupItem>
            </ListGroup>
          </Popup>
        )}
      </Marker>
    );
  }
}

// See documenation in main index file for documenation on these props.
Endpoint.propTypes = {
  clearLocation: PropTypes.func.isRequired,
  forgetPlace: PropTypes.func.isRequired,
  location: locationType,
  locations: PropTypes.arrayOf(locationType).isRequired,
  MapMarkerIcon: PropTypes.elementType.isRequired,
  rememberPlace: PropTypes.func.isRequired,
  setLocation: PropTypes.func.isRequired,
  showUserSettings: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired
};

Endpoint.defaultProps = {
  location: undefined
};

export default withNamespaces()(Endpoint)
