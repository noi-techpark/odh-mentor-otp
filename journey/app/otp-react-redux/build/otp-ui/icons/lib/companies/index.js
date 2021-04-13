"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCompanyIcon = getCompanyIcon;
Object.defineProperty(exports, "Biketown", {
  enumerable: true,
  get: function () {
    return _biketownIcon.default;
  }
});
Object.defineProperty(exports, "Bird", {
  enumerable: true,
  get: function () {
    return _birdIcon.default;
  }
});
Object.defineProperty(exports, "Bolt", {
  enumerable: true,
  get: function () {
    return _boltIcon.default;
  }
});
Object.defineProperty(exports, "BoltEu", {
  enumerable: true,
  get: function () {
    return _boltEuIcon.default;
  }
});
Object.defineProperty(exports, "Car2go", {
  enumerable: true,
  get: function () {
    return _car2goIcon.default;
  }
});
Object.defineProperty(exports, "Gruv", {
  enumerable: true,
  get: function () {
    return _gruvIcon.default;
  }
});
Object.defineProperty(exports, "Hopr", {
  enumerable: true,
  get: function () {
    return _hoprIcon.default;
  }
});
Object.defineProperty(exports, "Lime", {
  enumerable: true,
  get: function () {
    return _limeIcon.default;
  }
});
Object.defineProperty(exports, "Lyft", {
  enumerable: true,
  get: function () {
    return _lyftIcon.default;
  }
});
Object.defineProperty(exports, "Razor", {
  enumerable: true,
  get: function () {
    return _razorIcon.default;
  }
});
Object.defineProperty(exports, "Reachnow", {
  enumerable: true,
  get: function () {
    return _reachnowIcon.default;
  }
});
Object.defineProperty(exports, "Shared", {
  enumerable: true,
  get: function () {
    return _sharedIcon.default;
  }
});
Object.defineProperty(exports, "Spin", {
  enumerable: true,
  get: function () {
    return _spinIcon.default;
  }
});
Object.defineProperty(exports, "Uber", {
  enumerable: true,
  get: function () {
    return _uberIcon.default;
  }
});

var _biketownIcon = _interopRequireDefault(require("./biketown-icon"));

var _birdIcon = _interopRequireDefault(require("./bird-icon"));

var _boltIcon = _interopRequireDefault(require("./bolt-icon"));

var _boltEuIcon = _interopRequireDefault(require("./bolt-eu-icon"));

var _car2goIcon = _interopRequireDefault(require("./car2go-icon"));

var _gruvIcon = _interopRequireDefault(require("./gruv-icon"));

var _hoprIcon = _interopRequireDefault(require("./hopr-icon"));

var _limeIcon = _interopRequireDefault(require("./lime-icon"));

var _lyftIcon = _interopRequireDefault(require("./lyft-icon"));

var _razorIcon = _interopRequireDefault(require("./razor-icon"));

var _reachnowIcon = _interopRequireDefault(require("./reachnow-icon"));

var _sharedIcon = _interopRequireDefault(require("./shared-icon"));

var _spinIcon = _interopRequireDefault(require("./spin-icon"));

var _uberIcon = _interopRequireDefault(require("./uber-icon"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

const companyLookup = {
  biketown: _biketownIcon.default,
  bird: _birdIcon.default,
  bolt: _boltIcon.default,
  boltEu: _boltEuIcon.default,
  car2go: _car2goIcon.default,
  gruv: _gruvIcon.default,
  hopr: _hoprIcon.default,
  lime: _limeIcon.default,
  lyft: _lyftIcon.default,
  razor: _razorIcon.default,
  reachnow: _reachnowIcon.default,
  shared: _sharedIcon.default,
  spin: _spinIcon.default,
  uber: _uberIcon.default
};

function getCompanyIcon(name) {
  const icon = companyLookup[name.toLowerCase()];

  if (!icon) {
    console.warn(`No Company Icon found for: '${name}'!`);
  }

  return icon;
}

//# sourceMappingURL=index.js