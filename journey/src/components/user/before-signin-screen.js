// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react'
import { withNamespaces } from "react-i18next"

/**
 * This screen is flashed just before the Auth0 login page is shown.
 * TODO: improve this screen.
 */
const BeforeSignInScreen = ({ t }) => (
  <div>
    <h1>{t('signing_you_in')}</h1>
    <p>
      {t('in_order_to_access_this_page_you_will_need')}
    </p>
  </div>
)

export default withNamespaces()(BeforeSignInScreen)
