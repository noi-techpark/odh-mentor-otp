import {
  transitIndexStopWithRoutes,
  userLocationType
} from "../core-utils/types";
import { isIE } from "../core-utils/ui";
import { humanizeDistanceStringImperial } from "../humanize-distance";
import PropTypes from "prop-types";
import React from "react";
import { Briefcase, Home, MapMarker, MapPin } from "@styled-icons/fa-solid";
import { MenuItem, Button } from 'react-bootstrap'

export function GeocodedOptionIcon() {
  return <MapPin size={13} />;
}

export function Option({ disabled, icon, isActive, onClick, title }) {
  return (
    <MenuItem onClick={onClick} active={isActive} disabled={disabled}>
      {isIE() ? (
        // In internet explorer 11, some really weird stuff is happening where it
        // is not possible to click the text of the title, but if you click just
        // above it, then it works. So, if using IE 11, just return the title text
        // and avoid all the extra fancy stuff.
        // See https://github.com/ibi-group/trimet-mod-otp/issues/237
        title
      ) : (
        <>
          {icon}{' '}{title}
        </>
      )}
    </MenuItem>
  );
}

Option.propTypes = {
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  isActive: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.node
};

Option.defaultProps = {
  disabled: false,
  icon: null,
  isActive: false,
  title: null
};

export function TransitStopOption({ isActive, onClick, stop, stopOptionIcon }) {
  return (
    <>
      <>
        <MenuItem header>
          {stopOptionIcon}{' '}{humanizeDistanceStringImperial(stop.dist, true)}
        </MenuItem>
        <MenuItem onClick={onClick} active={isActive}>
          {stop.name} ({stop.code})
          <ul>
            {(stop.routes || []).map(route => {
              const name = route.shortName || route.longName;
              return (
                <Button bsSize="small" bsStyle="link" key={`route-${name}`}>{name}</Button>
              );
            })}
          </ul>
        </MenuItem>
      </>
    </>
  );
}

TransitStopOption.propTypes = {
  isActive: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  stop: transitIndexStopWithRoutes.isRequired,
  stopOptionIcon: PropTypes.node.isRequired
};

TransitStopOption.defaultProps = {
  isActive: false
};

export function UserLocationIcon({ userLocation }) {
  if (userLocation.icon === "work") return <Briefcase size={13} />;
  if (userLocation.icon === "home") return <Home size={13} />;
  return <MapMarker size={13} />;
}

UserLocationIcon.propTypes = {
  userLocation: userLocationType.isRequired
};
