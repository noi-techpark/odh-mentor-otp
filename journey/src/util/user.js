// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export function isNewUser (loggedInUser) {
  return !loggedInUser.hasConsentedToTerms
}
