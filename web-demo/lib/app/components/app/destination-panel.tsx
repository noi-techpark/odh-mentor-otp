import { connect } from 'react-redux'
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl'
import React, { Component, FormEvent } from 'react'

import { getActiveSearch, getShowUserSettings } from '@otp-react-redux/lib/util/state'
import { getPersistenceMode } from '@otp-react-redux/lib/util/user'
import InvisibleA11yLabel from '@otp-react-redux/lib/components/util/invisible-a11y-label'
import LocationField from '@otp-react-redux/lib/components/form/connected-location-field'
import ViewerContainer from '@otp-react-redux/lib/components/viewers/viewer-container'
import { Button } from '@opentripplanner/endpoints-overlay/lib/styled'

// import NearbyView from '@otp-react-redux/lib/components/viewers/nearby/nearby-view'
import NoiNearbyView from '../viewers/nearby/noi-nearby-view'

interface Props {
  activeSearch: any
  intl: IntlShape
  mobile?: boolean
  showUserSettings: boolean
}

/**
 * Main panel for the batch/trip comparison form.
 */
class DestinationPanel extends Component<Props> {
  state = {
    planTripClicked: false
  }

  handleSubmit = (e: FormEvent) => e.preventDefault()

  handlePlanTripClick = () => {
    this.setState({ planTripClicked: true })
  }

  render() {
    const { activeSearch, intl, mobile, showUserSettings } = this.props
    const { planTripClicked } = this.state
    const mapAction = mobile
      ? intl.formatMessage({
          id: 'common.searchForms.tap'
        })
      : intl.formatMessage({
          id: 'common.searchForms.click'
        })

    return (
      <ViewerContainer
        className="batch-routing-panel"
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <InvisibleA11yLabel>
          <h1>
            <FormattedMessage id="components.BatchSearchScreen.header" />
          </h1>
        </InvisibleA11yLabel>
        <form
          className="form"
          onSubmit={this.handleSubmit}
          style={{ padding: '10px' }}
        >
          <span className="batch-routing-panel-location-fields">
            <LocationField
              inputPlaceholder={intl.formatMessage(
                { id: 'common.searchForms.enterDestination' },
                { mapAction }
              )}
              isRequired
              locationType="to"
              selfValidate={planTripClicked}
              showClearButton={!mobile}
            />
          </span>
        </form>
        <Button> Test </Button>

        <NoiNearbyView />
      </ViewerContainer>
    )
  }
}

// connect to the redux store
const mapStateToProps = (state: any) => {
  // Show the place shortcuts for OTP-middleware users who have accepted the terms of use
  // and deployments using persistence to localStorage. Don't show shortcuts otherwise.
  const showUserSettings =
    getShowUserSettings(state) &&
    (state.user.loggedInUser?.hasConsentedToTerms ||
      getPersistenceMode(state.otp.config.persistence).isLocalStorage)
  return {
    activeSearch: getActiveSearch(state),
    showUserSettings
  }
}

export default connect(mapStateToProps)(injectIntl(DestinationPanel))
