import React, { Component } from 'react'
import { withNamespaces } from "react-i18next"

import LinkButton from './link-button'
import StackedPaneDisplay from './stacked-pane-display'

/**
 * This component handles the existing account display.
 */
class ExistingAccountDisplay extends Component {
  render () {
    const { onCancel, onComplete, panes, t } = this.props
    const paneSequence = [
      {
        pane: () => <p><LinkButton to='/savedtrips'>{t('edit_my_trips')}</LinkButton></p>,
        title: t('my_trips')
      },
      {
        pane: panes.terms,
        props: { disableCheckTerms: true },
        title: t('terms')
      },
      {
        pane: panes.notifications,
        title: t('notifications')
      },
      {
        pane: panes.locations,
        title: t('my_locations')
      }
    ]

    return (
      <StackedPaneDisplay
        onCancel={onCancel}
        onComplete={onComplete}
        paneSequence={paneSequence}
        title={t('my_account')}
      />
    )
  }
}

export default withNamespaces()(ExistingAccountDisplay)
