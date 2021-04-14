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

import * as Styled from "./styled";

/**
 * These icons are used to render common icons for user locations. These will
 * only show up in applications that allow saving user locations.
 */
function UserLocationIcon({ type }) {
  switch (type) {
    case "briefcase":
      return <Briefcase size={12} />;
    case "home":
      return <Home size={12} />;
    case "map-marker":
      return <MapMarkerAlt size={12} />;
    case "refresh":
      return <Sync size={12} />;
    case "times":
      return <Times size={12} />;
    default:
      return null;
  }
}

UserLocationIcon.propTypes = {
  type: PropTypes.string.isRequired
};

export default class Endpoint extends Component {
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
    const { location, setLocation, type } = this.props;
    this.clearLocation();
    const otherType = type === "from" ? "$_destination_$" : "$_origin_$";
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
      type
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
    const otherType = type === "from" ? "$_destination_$" : "$_origin_$";
    const icon = isWork ? "briefcase" : isHome ? "home" : "map-marker";
    return (
      <Marker
        draggable
        icon={divIcon({ html: iconHtml, className: "" })}
        position={position}
        onDragEnd={this.onDragEnd}
      >
        {showUserSettings && (
          <Popup>
            <div>
              <strong>
                <UserLocationIcon type={icon} /> {location.name}
              </strong>
              <div>
                <Styled.Button
                  disabled={isWork}
                  onClick={isHome ? this.forgetHome : this.rememberAsHome}
                >
                  {isHome ? (
                    <span>
                      <UserLocationIcon type="times" /> $_forget_home_$
                    </span>
                  ) : (
                    <span>
                      <UserLocationIcon type="home" /> $_save_as_home_$
                    </span>
                  )}
                </Styled.Button>
              </div>
              <div>
                <Styled.Button
                  disabled={isHome}
                  onClick={isWork ? this.forgetWork : this.rememberAsWork}
                >
                  {isWork ? (
                    <span>
                      <UserLocationIcon type="times" /> $_forget_work_$
                    </span>
                  ) : (
                    <span>
                      <UserLocationIcon type="briefcase" /> $_save_as_work_$
                    </span>
                  )}
                </Styled.Button>
              </div>
              <div>
                <Styled.Button onClick={this.clearLocation}>
                  <UserLocationIcon type="times" /> $_remove_as_$ {type} location
                </Styled.Button>
              </div>
              <div>
                <Styled.Button onClick={this.swapLocation}>
                  <UserLocationIcon type="refresh" /> Cambia in {otherType}{" "}
                  location
                </Styled.Button>
              </div>
            </div>
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
