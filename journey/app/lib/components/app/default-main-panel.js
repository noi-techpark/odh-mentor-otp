import React, { Component } from 'react'
import { connect } from 'react-redux'
import isEqual from 'lodash.isequal'

import ViewerContainer from '../viewers/viewer-container'
import DefaultSearchForm from '../form/default-search-form'
import PlanTripButton from '../form/plan-trip-button'
import UserSettings from '../form/user-settings'
import NarrativeRoutingResults from '../narrative/narrative-routing-results'
import { getActiveSearch, getShowUserSettings } from '../../util/state'

class DefaultMainPanel extends Component {
  render () {
    const {
      activeSearch,
      currentQuery,
      itineraryClass,
      itineraryFooter,
      LegIcon,
      mainPanelContent,
      ModeIcon,
      showUserSettings
    } = this.props
    const showPlanTripButton = mainPanelContent === 'EDIT_DATETIME' ||
      mainPanelContent === 'EDIT_SETTINGS'
    const mostRecentQuery = activeSearch ? activeSearch.query : null
    const planDisabled = isEqual(currentQuery, mostRecentQuery)
    return (
      <ViewerContainer>
        <DefaultSearchForm ModeIcon={ModeIcon} />
        <br/>
        <PlanTripButton disabled={planDisabled} />
        <br/>

        {
          !activeSearch && !showPlanTripButton && showUserSettings &&
            <UserSettings />
        }

        <div className='desktop-narrative-container'>
          <NarrativeRoutingResults
            itineraryClass={itineraryClass}
            itineraryFooter={itineraryFooter}
            LegIcon={LegIcon}
          />
        </div>

        {
          showPlanTripButton &&
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 10,
                bottom: 55,
                height: 15
              }}
              className='white-fade' />
        }
      </ViewerContainer>
    )
  }
}

// connect to the redux store
const mapStateToProps = (state, ownProps) => {
  const showUserSettings = getShowUserSettings(state.otp)
  return {
    activeSearch: getActiveSearch(state.otp),
    currentQuery: state.otp.currentQuery,
    mainPanelContent: state.otp.ui.mainPanelContent,
    showUserSettings
  }
}

const mapDispatchToProps = { }

export default connect(mapStateToProps, mapDispatchToProps)(DefaultMainPanel)
