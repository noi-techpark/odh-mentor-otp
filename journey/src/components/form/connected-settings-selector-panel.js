import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { setQueryParam } from '../../actions/form'
import { getShowUserSettings } from '../../util/state'

import { SettingsSelectorPanel } from '../../otp-ui/trip-form'
import UserTripSettings from './user-trip-settings'

// TODO: Button title should be bold when button is selected.

class ConnectedSettingsSelectorPanel extends Component {
  static propTypes = {
    ModeIcon: PropTypes.elementType.isRequired
  }

  render () {
    const {
      config,
      ModeIcon,
      query,
      setQueryParam,
      showUserSettings
    } = this.props
    return (
      <div>
        <SettingsSelectorPanel
          className="transport-selector"
          ModeIcon={ModeIcon}
          queryParams={query}
          supportedModes={config.modes}
          supportedCompanies={config.companies}
          onQueryParamChange={setQueryParam}
        />

        {/* {showUserSettings && <UserTripSettings />} */}
      </div>
    )
  }
}

// connect to redux store

const mapStateToProps = (state, ownProps) => {
  const { config, currentQuery } = state.otp
  return {
    query: currentQuery,
    config,
    showUserSettings: getShowUserSettings(state.otp)
  }
}

const mapDispatchToProps = {
  setQueryParam
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedSettingsSelectorPanel)
