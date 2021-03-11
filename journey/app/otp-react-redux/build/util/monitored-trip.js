"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dayFieldsToArray = dayFieldsToArray;
exports.arrayToDayFields = arrayToDayFields;
exports.WEEKDAYS = void 0;

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

var WEEKDAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
exports.WEEKDAYS = WEEKDAYS;
var ALL_DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
/**
 * Extracts the day of week fields of an object (e.g. a monitoredTrip) to an array.
 * Example: { monday: truthy, tuesday: falsy, wednesday: truthy ... } => ['monday', 'wednesday' ...]
 */

function dayFieldsToArray(monitoredTrip) {
  return ALL_DAYS.filter(function (day) {
    return monitoredTrip[day];
  });
}
/**
 * Converts an array of day of week values into an object with those fields.
 * Example: ['monday', 'wednesday' ...] => { monday: true, tuesday: false, wednesday: true ... }
 */


function arrayToDayFields(arrayOfDayTypes) {
  var result = {};
  ALL_DAYS.forEach(function (day) {
    result[day] = arrayOfDayTypes.includes(day);
  });
  return result;
}

//# sourceMappingURL=monitored-trip.js