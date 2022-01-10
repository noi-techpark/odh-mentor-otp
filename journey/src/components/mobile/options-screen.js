import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'

import MobileContainer from './container'
import MobileNavigationBar from './navigation-bar'
import ConnectedSettingsSelectorPanel from '../form/connected-settings-selector-panel'
import PlanTripButton from '../form/plan-trip-button'

import { MobileScreens, setMobileScreen } from '../../actions/ui'

class MobileOptionsScreen extends Component {
  static propTypes = {
    ModeIcon: PropTypes.elementType.isRequired
  }

  _planTripClicked = () => {
    this.props.setMobileScreen(MobileScreens.RESULTS_SUMMARY)
  }

  render () {
    const { ModeIcon, t } = this.props

    return (
      <MobileContainer>
        <MobileNavigationBar
          headerText={t('set_search')}
          showBackButton
          backScreen={MobileScreens.SEARCH_FORM}
        />

        <div className='options-main-content p-1'>
          <ConnectedSettingsSelectorPanel ModeIcon={ModeIcon} />
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

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(MobileOptionsScreen))
