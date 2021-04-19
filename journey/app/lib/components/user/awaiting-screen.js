import React from 'react'
import { withNamespaces } from "react-i18next"

/**
 * Screen that is flashed while retrieving user data.
 * TODO: Improve this screen.
 */
const AwaitingScreen = () => <div>{t('processing')}...</div>

export default withNamespaces()(AwaitingScreen)
