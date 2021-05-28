import React from "react";

import CircleClockwise from "./CircleClockwise";
import CircleCounterclockwise from "./CircleCounterclockwise";
import Elevator from "./Elevator";
import HardLeft from "./HardLeft";
import HardRight from "./HardRight";
import Left from "./Left";
import Right from "./Right";
import SlightLeft from "./SlightLeft";
import SlightRight from "./SlightRight";
import Straight from "./Straight";
import UTurnLeft from "./UTurnLeft";
import UTurnRight from "./UTurnRight";

/**
 * Renders the appropriate direction icon given the OTP relative turn direction
 */
function DirectionIcon({ relativeDirection, width = 16, height = 16 }) {
  if (!relativeDirection) return null;
  switch (relativeDirection.toUpperCase()) {
    case "DEPART":
    case "CONTINUE":
      return <Straight width={width} height={height} />;
    case "LEFT":
      return <Left width={width} height={height} />;
    case "RIGHT":
      return <Right width={width} height={height} />;
    case "SLIGHTLY_LEFT":
      return <SlightLeft width={width} height={height} />;
    case "SLIGHTLY_RIGHT":
      return <SlightRight width={width} height={height} />;
    case "HARD_LEFT":
      return <HardLeft width={width} height={height} />;
    case "HARD_RIGHT":
      return <HardRight width={width} height={height} />;
    case "UTURN_LEFT":
      return <UTurnLeft width={width} height={height} />;
    case "UTURN_RIGHT":
      return <UTurnRight width={width} height={height} />;
    case "CIRCLE_CLOCKWISE":
      return <CircleClockwise width={width} height={height} />;
    case "CIRCLE_COUNTERCLOCKWISE":
      return <CircleCounterclockwise width={width} height={height} />;
    case "ELEVATOR":
      return <Elevator width={width} height={height} />;
    default:
      return null;
  }
}

export {
  CircleClockwise,
  CircleCounterclockwise,
  DirectionIcon,
  Elevator,
  HardLeft,
  HardRight,
  Left,
  Right,
  SlightLeft,
  SlightRight,
  Straight,
  UTurnLeft,
  UTurnRight
};
