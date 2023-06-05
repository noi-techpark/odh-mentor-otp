// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * Checks if a parameter is actually a function.
 * @param {*} fn The function to call.
 * @returns fn if fn is a function, or a dummy function.
 */
export default function callIfValid(fn) {
  if (typeof fn === "function") return fn;
  return () => {};
}
