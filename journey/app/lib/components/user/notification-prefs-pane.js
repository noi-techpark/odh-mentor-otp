import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { ButtonToolbar, ControlLabel, FormControl, FormGroup, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import styled from 'styled-components'
import { withNamespaces } from "react-i18next"

const allowedNotificationChannels = [
  {
    type: 'email',
    text: 'email'
  },
  {
    type: 'sms',
    text: 'sms'
  },
  {
    type: 'none',
    text: 'dont_notify_me'
  }
]

// Styles
// HACK: Preverve container height.
const Details = styled.div`
  height: 150px;
`

/**
 * User notification preferences pane.
 */
class NotificationPrefsPane extends Component {
  static propTypes = {
    onUserDataChange: PropTypes.func.isRequired,
    userData: PropTypes.object.isRequired
  }

  _handleNotificationChannelChange = e => {
    const { onUserDataChange } = this.props
    onUserDataChange({ notificationChannel: e })
  }

  _handlePhoneNumberChange = e => {
    const { onUserDataChange } = this.props
    onUserDataChange({ phoneNumber: e.target.value })
  }

  render () {
    const { userData, t } = this.props
    const {
      email,
      notificationChannel,
      phoneNumber
    } = userData

    return (
      <div>
        <p>{t('you_can_receive_notifications_about_trips_you_frequently_take')}</p>
        <FormGroup>
          <ControlLabel>{t('how_would_you_like_to_receive_notifications')}</ControlLabel>
          <ButtonToolbar>
            <ToggleButtonGroup
              name='notificationChannels'
              onChange={this._handleNotificationChannelChange}
              type='radio'
              value={notificationChannel}
            >
              {allowedNotificationChannels.map(({ type, text }, index) => (
                <ToggleButton
                  bsStyle={notificationChannel === type ? 'primary' : 'default'}
                  key={index}
                  value={type}
                >
                  {t(text)}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </ButtonToolbar>
        </FormGroup>
        <Details>
          {notificationChannel === 'email' && (
            <FormGroup>
              <ControlLabel>{t('notification_emails_will_be_sent_out_to')}</ControlLabel>
              <FormControl disabled type='text' value={email} />
            </FormGroup>
          )}
          {notificationChannel === 'sms' && (
            <FormGroup>
              <ControlLabel>{t('enter_your_phone_number_for_sms_notifications')}</ControlLabel>
              {/* TODO: Add field validation. */}
              <FormControl onChange={this._handlePhoneNumberChange} type='tel' value={phoneNumber} />
            </FormGroup>
          )}
        </Details>
      </div>
    )
  }
}

export default withNamespaces()(NotificationPrefsPane)
