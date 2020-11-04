"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = callIfValid;

/**
 * Checks if a parameter is actually a function.
 * @param {*} fn The function to call.
 * @returns fn if fn is a function, or a dummy function.
 */
function callIfValid(fn) {
  if (typeof fn === "function") return fn;
  return () => {};
}