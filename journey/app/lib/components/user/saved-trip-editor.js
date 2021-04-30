import React from 'react'
import { withNamespaces } from "react-i18next"

import StackedPaneDisplay from './stacked-pane-display'

/**
 * This component handles editing of an existing trip.
 */
const SavedTripEditor = ({
  isCreating,
  monitoredTrip,
  onCancel,
  onComplete,
  panes,
  t
}) => {
  if (monitoredTrip) {
    const paneSequence = [
      {
        pane: panes.basics,
        title: t('trip_information')
      },
      {
        pane: panes.notifications,
        title: t('trip_notifications')
      }
    ]

    return (
      <>
        <h1>{isCreating ? t('save_trip') : monitoredTrip.tripName}</h1>
        <StackedPaneDisplay
          onCancel={onCancel}
          onComplete={onComplete}
          paneSequence={paneSequence}
        />
      </>
    )
  }

  return (
    <>
      <h1>{t('trip_not_found')}</h1>
      <p>{t('sorry_trip_not_found')}</p>
    </>
  )
}

export default withNamespaces()(SavedTripEditor)
