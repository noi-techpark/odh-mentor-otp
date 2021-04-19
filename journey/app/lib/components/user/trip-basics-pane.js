import React, { Component } from 'react'
import {
  ButtonToolbar,
  ControlLabel,
  FormControl,
  FormGroup,
  ToggleButton,
  ToggleButtonGroup
} from 'react-bootstrap'
import { withNamespaces } from "react-i18next"

import { arrayToDayFields, dayFieldsToArray } from '../../util/monitored-trip'
import TripSummary from './trip-summary'

/**
 * This component shows summary information for a trip
 * and lets the user edit the trip name and day.
 */
class TripBasicsPane extends Component {
  _handleTripDaysChange = e => {
    const { onMonitoredTripChange } = this.props
    onMonitoredTripChange(arrayToDayFields(e))
  }

  _handleTripNameChange = e => {
    const { onMonitoredTripChange } = this.props
    onMonitoredTripChange({ tripName: e.target.value })
  }

  render () {
    const { monitoredTrip, t } = this.props
    const { itinerary } = monitoredTrip

    if (!itinerary) {
      return <div>{t('no_itinerary_to_display')}</div>
    } else {
      return (
        <div>
          <ControlLabel>{t('selected_itinerary')}</ControlLabel>
          <TripSummary monitoredTrip={monitoredTrip} />

          <FormGroup>
            <ControlLabel>{t('please_provide_a_name_for_this_trip')}</ControlLabel>
            <FormControl
              onChange={this._handleTripNameChange}
              type='text'
              value={monitoredTrip.tripName}
            />
          </FormGroup>

          <FormGroup>
            <ControlLabel>{t('what_days_to_you_take_this_trip')}</ControlLabel>
            <ButtonToolbar>
              <ToggleButtonGroup
                onChange={this._handleTripDaysChange}
                type='checkbox'
                value={dayFieldsToArray(monitoredTrip)}
              >
                <ToggleButton value={'monday'}>{t('monday')}</ToggleButton>
                <ToggleButton value={'tuesday'}>{t('tuesday')}</ToggleButton>
                <ToggleButton value={'wednesday'}>{t('wednesday')}</ToggleButton>
                <ToggleButton value={'thursday'}>{t('thursday')}</ToggleButton>
                <ToggleButton value={'friday'}>{t('friday')}</ToggleButton>
                <ToggleButton value={'saturday'}>{t('saturday')}</ToggleButton>
                <ToggleButton value={'sunday'}>{t('sunday')}</ToggleButton>
              </ToggleButtonGroup>
            </ButtonToolbar>
          </FormGroup>

        </div>
      )
    }
  }
}

export default withNamespaces()(TripBasicsPane)
