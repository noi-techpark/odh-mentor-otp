"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateOverlayVisibility = exports.setRouterId = exports.setMapZoom = exports.setMapCenter = exports.setAutoPlan = void 0;

var _reduxActions = require("redux-actions");

const setAutoPlan = (0, _reduxActions.createAction)('SET_AUTOPLAN'); // TODO: this should eventually be handled via mapState

exports.setAutoPlan = setAutoPlan;
const setMapCenter = (0, _reduxActions.createAction)('SET_MAP_CENTER');
exports.setMapCenter = setMapCenter;
const setMapZoom = (0, _reduxActions.createAction)('SET_MAP_ZOOM');
exports.setMapZoom = setMapZoom;
const setRouterId = (0, _reduxActions.createAction)('SET_ROUTER_ID');
exports.setRouterId = setRouterId;
const updateOverlayVisibility = (0, _reduxActions.createAction)('UPDATE_OVERLAY_VISIBILITY');
exports.updateOverlayVisibility = updateOverlayVisibility;

//# sourceMappingURL=config.js