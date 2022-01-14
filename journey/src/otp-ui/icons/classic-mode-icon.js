import React from "react";

import {
  ClassicBike,
  ClassicBus,
  ClassicCar,
  ClassicFerry,
  ClassicGondola,
  ClassicMicromobility,
  ClassicTram,
  ClassicWalk
} from "./classic";

import BikeSharing from "./modern/BikeSharing";
import CarSharing from "./modern/CarSharing";
import MicromobilitySharing from "./modern/MicromobilitySharing";
/**
 * Icons for all classic OTP-react-redux modes.
 * Any hail and rental modes managed by one or multiple companies
 * are optional (by default, the company logo will be displayed)
 * but can be overriden here using the pattern
 * <otp_mode>_<company_id> (e.g. 'car_hail_uber').
 * Furthermore, any hail or rental modes managed by a single company
 * are optional (by default, the company logo will be displayed)
 * but can be overriden here using the pattern
 * <otp_mode> (e.g. 'bicycle_rent').
 */
function ClassicModeIcon({ mode, ...props }) {
  if (!mode) return null;
  switch (mode.toLowerCase()) {
    case "bicycle":
      return <ClassicBike {...props} />;
    case "bicycle_rent":
      return <BikeSharing {...props} />;
    case "bus":
      return <ClassicBus {...props} />;
    case "car":
    case "car_park":
      return <ClassicCar {...props} />;
    case "car_rent":
      return <CarSharing {...props} />;      
    case "ferry":
      return <ClassicFerry {...props} />;
    case "gondola":
    case "funicular":
      return <ClassicGondola {...props} />;
    case "micromobility":
      return <ClassicMicromobility {...props} />;
    case "micromobility_rent":
      return <MicromobilitySharing {...props} />;
    case "rail":
    case "subway":
    case "tram":
      return <ClassicTram {...props} />;
    case "transit":
      return <ClassicBus {...props} />;
    case "walk":
      return <ClassicWalk {...props} />;
    default:
      return null;
  }
}

export default ClassicModeIcon;
