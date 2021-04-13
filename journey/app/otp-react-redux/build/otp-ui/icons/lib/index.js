"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ClassicLegIcon", {
  enumerable: true,
  get: function () {
    return _classicLegIcon.default;
  }
});
Object.defineProperty(exports, "ClassicModeIcon", {
  enumerable: true,
  get: function () {
    return _classicModeIcon.default;
  }
});
Object.defineProperty(exports, "LegIcon", {
  enumerable: true,
  get: function () {
    return _legIcon.default;
  }
});
Object.defineProperty(exports, "StandardLegIcon", {
  enumerable: true,
  get: function () {
    return _standardLegIcon.default;
  }
});
Object.defineProperty(exports, "StandardModeIcon", {
  enumerable: true,
  get: function () {
    return _standardModeIcon.default;
  }
});
Object.defineProperty(exports, "TriMetLegIcon", {
  enumerable: true,
  get: function () {
    return _trimetLegIcon.default;
  }
});
Object.defineProperty(exports, "TriMetModeIcon", {
  enumerable: true,
  get: function () {
    return _trimetModeIcon.default;
  }
});
exports.ZoomAngle = exports.Zoom = exports.WesCircle = exports.Wes = exports.Walk = exports.Uber = exports.UTurnRight = exports.UTurnLeft = exports.TripPlannerSolid = exports.TripPlanner = exports.TriMet = exports.TransittrackerSolid = exports.Transittracker = exports.StreetcarCircle = exports.Streetcar = exports.Straight = exports.StopStationSolid = exports.StopStation = exports.Star = exports.StandardWalk = exports.StandardTram = exports.StandardStreetcar = exports.StandardRail = exports.StandardGondola = exports.StandardBus = exports.StandardBike = exports.Spin = exports.Snow = exports.SlightRight = exports.SlightLeft = exports.Shared = exports.Schedule = exports.Right = exports.Refresh = exports.Reachnow = exports.Razor = exports.Plane = exports.Phone = exports.Parking = exports.Micromobility = exports.MaxCircle = exports.Max = exports.MapMarkerSolid = exports.MapMarker = exports.Map = exports.Lyft = exports.Lime = exports.Left = exports.Info = exports.Hopr = exports.HelpSolid = exports.Help = exports.HardRight = exports.HardLeft = exports.Gruv = exports.Ferry = exports.Feedback = exports.Email = exports.Elevator = exports.ClassicWalk = exports.ClassicTram = exports.ClassicMicromobility = exports.ClassicGondola = exports.ClassicFerry = exports.ClassicCar = exports.ClassicBus = exports.ClassicBike = exports.CircleCounterclockwise = exports.CircleClockwise = exports.Circle = exports.Car2go = exports.Car = exports.BusCircle = exports.Bus = exports.BoltEu = exports.Bolt = exports.Bird = exports.Biketown = exports.BikeStaple = exports.BikeParking = exports.BikeLocker = exports.BikeAndRide = exports.Bike = exports.Bicycle = exports.ArrowLeft = exports.ArrowDown = exports.App = exports.AlertSolid = exports.Alert = exports.AerialTram = exports.Accessible = void 0;

var classic = _interopRequireWildcard(require("./classic"));

var companies = _interopRequireWildcard(require("./companies"));

var directions = _interopRequireWildcard(require("./directions"));

var generic = _interopRequireWildcard(require("./generic"));

var standard = _interopRequireWildcard(require("./standard"));

var trimet = _interopRequireWildcard(require("./trimet"));

var _classicLegIcon = _interopRequireDefault(require("./classic-leg-icon"));

var _classicModeIcon = _interopRequireDefault(require("./classic-mode-icon"));

var _legIcon = _interopRequireDefault(require("./leg-icon"));

var _standardLegIcon = _interopRequireDefault(require("./standard-leg-icon"));

var _standardModeIcon = _interopRequireDefault(require("./standard-mode-icon"));

var _trimetLegIcon = _interopRequireDefault(require("./trimet-leg-icon"));

var _trimetModeIcon = _interopRequireDefault(require("./trimet-mode-icon"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function () {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

const {
  ClassicBike,
  ClassicBus,
  ClassicCar,
  ClassicFerry,
  ClassicGondola,
  ClassicMicromobility,
  ClassicTram,
  ClassicWalk
} = classic;
exports.ClassicWalk = ClassicWalk;
exports.ClassicTram = ClassicTram;
exports.ClassicMicromobility = ClassicMicromobility;
exports.ClassicGondola = ClassicGondola;
exports.ClassicFerry = ClassicFerry;
exports.ClassicCar = ClassicCar;
exports.ClassicBus = ClassicBus;
exports.ClassicBike = ClassicBike;
const {
  Biketown,
  Bird,
  Bolt,
  BoltEu,
  Car2go,
  Gruv,
  Hopr,
  Lime,
  Lyft,
  Razor,
  Reachnow,
  Shared,
  Spin,
  Uber
} = companies;
exports.Uber = Uber;
exports.Spin = Spin;
exports.Shared = Shared;
exports.Reachnow = Reachnow;
exports.Razor = Razor;
exports.Lyft = Lyft;
exports.Lime = Lime;
exports.Hopr = Hopr;
exports.Gruv = Gruv;
exports.Car2go = Car2go;
exports.BoltEu = BoltEu;
exports.Bolt = Bolt;
exports.Bird = Bird;
exports.Biketown = Biketown;
const {
  CircleClockwise,
  CircleCounterclockwise,
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
} = directions;
exports.UTurnRight = UTurnRight;
exports.UTurnLeft = UTurnLeft;
exports.Straight = Straight;
exports.SlightRight = SlightRight;
exports.SlightLeft = SlightLeft;
exports.Right = Right;
exports.Left = Left;
exports.HardRight = HardRight;
exports.HardLeft = HardLeft;
exports.Elevator = Elevator;
exports.CircleCounterclockwise = CircleCounterclockwise;
exports.CircleClockwise = CircleClockwise;
const {
  ArrowDown,
  ArrowLeft,
  Refresh,
  Star
} = generic;
exports.Star = Star;
exports.Refresh = Refresh;
exports.ArrowLeft = ArrowLeft;
exports.ArrowDown = ArrowDown;
const {
  StandardBike,
  StandardBus,
  StandardGondola,
  StandardRail,
  StandardStreetcar,
  StandardTram,
  StandardWalk
} = standard;
exports.StandardWalk = StandardWalk;
exports.StandardTram = StandardTram;
exports.StandardStreetcar = StandardStreetcar;
exports.StandardRail = StandardRail;
exports.StandardGondola = StandardGondola;
exports.StandardBus = StandardBus;
exports.StandardBike = StandardBike;
const {
  Accessible,
  AerialTram,
  Alert,
  AlertSolid,
  App,
  Bicycle,
  Bike,
  BikeAndRide,
  BikeLocker,
  BikeParking,
  BikeStaple,
  Bus,
  BusCircle,
  Car,
  Circle,
  Email,
  Feedback,
  Ferry,
  Help,
  HelpSolid,
  Info,
  Map,
  MapMarker,
  MapMarkerSolid,
  Max,
  MaxCircle,
  Micromobility,
  Parking,
  Phone,
  Plane,
  Schedule,
  Snow,
  StopStation,
  StopStationSolid,
  Streetcar,
  StreetcarCircle,
  Transittracker,
  TransittrackerSolid,
  TriMet,
  TripPlanner,
  TripPlannerSolid,
  Walk,
  Wes,
  WesCircle,
  Zoom,
  ZoomAngle
} = trimet;
exports.ZoomAngle = ZoomAngle;
exports.Zoom = Zoom;
exports.WesCircle = WesCircle;
exports.Wes = Wes;
exports.Walk = Walk;
exports.TripPlannerSolid = TripPlannerSolid;
exports.TripPlanner = TripPlanner;
exports.TriMet = TriMet;
exports.TransittrackerSolid = TransittrackerSolid;
exports.Transittracker = Transittracker;
exports.StreetcarCircle = StreetcarCircle;
exports.Streetcar = Streetcar;
exports.StopStationSolid = StopStationSolid;
exports.StopStation = StopStation;
exports.Snow = Snow;
exports.Schedule = Schedule;
exports.Plane = Plane;
exports.Phone = Phone;
exports.Parking = Parking;
exports.Micromobility = Micromobility;
exports.MaxCircle = MaxCircle;
exports.Max = Max;
exports.MapMarkerSolid = MapMarkerSolid;
exports.MapMarker = MapMarker;
exports.Map = Map;
exports.Info = Info;
exports.HelpSolid = HelpSolid;
exports.Help = Help;
exports.Ferry = Ferry;
exports.Feedback = Feedback;
exports.Email = Email;
exports.Circle = Circle;
exports.Car = Car;
exports.BusCircle = BusCircle;
exports.Bus = Bus;
exports.BikeStaple = BikeStaple;
exports.BikeParking = BikeParking;
exports.BikeLocker = BikeLocker;
exports.BikeAndRide = BikeAndRide;
exports.Bike = Bike;
exports.Bicycle = Bicycle;
exports.App = App;
exports.AlertSolid = AlertSolid;
exports.Alert = Alert;
exports.AerialTram = AerialTram;
exports.Accessible = Accessible;

//# sourceMappingURL=index.js