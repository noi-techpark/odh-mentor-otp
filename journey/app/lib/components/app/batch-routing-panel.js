import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withNamespaces } from "react-i18next";

import * as apiActions from '../../actions/api'
import LocationField from '../form/connected-location-field'
import UserSettings from '../form/user-settings'
import Icon from '../narrative/icon'
import NarrativeItineraries from '../narrative/narrative-itineraries'
import { hasValidLocation, getActiveSearch, getShowUserSettings } from '../../util/state'
import ViewerContainer from '../viewers/viewer-container'

/**
 * Main panel for the batch/trip comparison form.
 * @extends Component
 */
class BatchRoutingPanel extends Component {
  _planTrip = () => {
    const {currentQuery, routingQuery} = this.props
    const issues = []
    if (!hasValidLocation(currentQuery, 'from')) issues.push('from')
    if (!hasValidLocation(currentQuery, 'to')) issues.push('to')
    if (issues.length > 0) {
      // TODO: replace with less obtrusive validation.
      window.alert(`Please define the following fields to ${t('travel')} ${issues.join(', ')}`)
      return
    }
    routingQuery()
  }

  render () {
    const {
      activeSearch,
      itineraryFooter,
      LegIcon,
      mobile,
      showUserSettings,
      t
    } = this.props
    const actionText = t(mobile ? 'tap' : 'click')
    return (
      <ViewerContainer>
        <LocationField
          inputPlaceholder={t('insert_departure_action', { actionText })}
          locationType='from'
          showClearButton
        />
        <LocationField
          inputPlaceholder={t('insert_arrival_action', { actionText })}
          locationType='to'
          showClearButton={!mobile}
        />
        <div style={{
          display: 'flex',
          justifyContent: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center'
        }} className='comparison-form'>
          <button
            style={{
              height: '50px',
              width: '50px',
              margin: '0px',
              marginRight: '5px'
            }}
          >
            <Icon type='cog' className='fa-2x' />
          </button>
          <button
            style={{
              height: '50px',
              width: '100px',
              margin: '0px',
              fontSize: 'small',
              textAlign: 'left'
            }}
          >
            <Icon type='calendar' /> {t('today')}<br />
            <Icon type='clock-o' /> {t('now')}<br />
          </button>
          <Button
            bsStyle='default'
            bsSize='small'
            onClick={this._planTrip}
            style={{
              height: '50px',
              width: '50px',
              margin: '0px',
              marginLeft: 'auto',
              backgroundColor: '#F5F5A7'
            }} >
            <Icon type='search' className='fa-2x' />
          </Button>
        </div>
        {!activeSearch && showUserSettings &&
          <UserSettings />
        }
        <div className='desktop-narrative-container'>
          <NarrativeItineraries
            containerStyle={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: '218px', // This is variable dependent on height of the form above.
              right: '0',
              left: '0',
              bottom: '0'
            }}
            itineraryFooter={itineraryFooter}
            LegIcon={LegIcon}
          />
        </div>
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
    expandAdvanced: state.otp.user.expandAdvanced,
    showUserSettings
  }
}

const mapDispatchToProps = {
  routingQuery: apiActions.routingQuery
}

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(BatchRoutingPanel))
