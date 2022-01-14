import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'

import MobileContainer from './container'
import MobileNavigationBar from './navigation-bar'
import LocationField from '../form/connected-location-field'

import { MobileScreens, setMobileScreen } from '../../actions/ui'

class MobileLocationSearch extends Component {
  static propTypes = {
    backScreen: PropTypes.number,
    locationType: PropTypes.string
  }

  _locationSelected = () => {
    this.props.setMobileScreen(MobileScreens.SEARCH_FORM)
  }

  render () {
    const {
      backScreen,
      location,
      locationType,
      otherLocation,
      t
    } = this.props
    const suppressNearby = otherLocation &&
      otherLocation.category === 'CURRENT_LOCATION'
    return (
      <MobileContainer>
        <MobileNavigationBar
          headerText={`${t('set')} ${t(locationType === 'to' ? 'destination' : 'origin')}`}
          showBackButton
          backScreen={backScreen}
        />
        <div className='location-search p-1'>
          <LocationField
            hideExistingValue
            inputPlaceholder={location ? location.name : t('type_location')}
            locationType={locationType}
            onLocationSelected={this._locationSelected}
            static
            suppressNearby={suppressNearby}
          />
        </div>
      </MobileContainer>
    )
  }
}

// connect to the redux store

const mapStateToProps = (state, ownProps) => {
  return {
    location: state.otp.currentQuery[ownProps.locationType],
    otherLocation: ownProps.type === 'from'
      ? state.otp.currentQuery.to
      : state.otp.currentQuery.from
  }
}

const mapDispatchToProps = {
  setMobileScreen
}

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(MobileLocationSearch))
