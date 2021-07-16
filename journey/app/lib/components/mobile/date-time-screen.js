import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'

import MobileContainer from './container'
import MobileNavigationBar from './navigation-bar'
import DateTimeModal from '../form/date-time-modal'
import PlanTripButton from '../form/plan-trip-button'

import { MobileScreens, setMobileScreen } from '../../actions/ui'

class MobileDateTimeScreen extends Component {
  static propTypes = {
    setMobileScreen: PropTypes.func
  }

  _planTripClicked = () => {
    this.props.setMobileScreen(MobileScreens.RESULTS_SUMMARY)
  }

  render () {
    const { t } = this.props
    return (
      <MobileContainer>
        <MobileNavigationBar
          headerText={t('set_time')}
          showBackButton
          backScreen={MobileScreens.SEARCH_FORM}
        />

        <div className='options-main-content p-1'>
          <DateTimeModal />
        </div>

        <div className='options-lower-tray p-1'>
          <PlanTripButton onClick={this._planTripClicked} />
        </div>

      </MobileContainer>
    )
  }
}

// connect to the redux store

const mapStateToProps = (state, ownProps) => {
  return { }
}

const mapDispatchToProps = {
  setMobileScreen
}

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(MobileDateTimeScreen))
