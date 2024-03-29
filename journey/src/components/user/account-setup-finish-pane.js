// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react'
import { withNamespaces } from "react-i18next"

const AccountSetupFinishPane = ({ t }) => (
  <div>
    <p>{t('you_are_ready_to_start_planning_your_trips')}</p>
  </div>
)

export default withNamespaces()(AccountSetupFinishPane)
