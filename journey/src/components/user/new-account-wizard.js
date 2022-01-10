import React from 'react'
import { withNamespaces } from "react-i18next"

import SequentialPaneDisplay from './sequential-pane-display'

/**
 * This component is the new account wizard.
 */
const NewAccountWizard = ({ onComplete, panes, userData, t }) => {
  const {
    hasConsentedToTerms,
    notificationChannel = 'email'
  } = userData

  const paneSequence = {
    terms: {
      disableNext: !hasConsentedToTerms,
      nextId: 'notifications',
      pane: panes.terms,
      title: t('create_a_new_account')
    },
    notifications: {
      nextId: notificationChannel === 'sms' ? 'verifyPhone' : 'places',
      pane: panes.notifications,
      prevId: 'terms',
      title: t('notification_preferences')
    },
    verifyPhone: {
      disableNext: true, // TODO: implement verification.
      nextId: 'places',
      pane: panes.verifyPhone,
      prevId: 'notifications',
      title: t('verify_your_phone')
    },
    places: {
      nextId: 'finish',
      pane: panes.locations,
      prevId: 'notifications',
      title: t('add_your_locations')
    },
    finish: {
      pane: panes.finish,
      prevId: 'places',
      title: t('account_setup_complete')
    }
  }

  return (
    <SequentialPaneDisplay
      initialPaneId='terms'
      onComplete={onComplete}
      paneSequence={paneSequence}
    />
  )
}

export default withNamespaces()(NewAccountWizard)
