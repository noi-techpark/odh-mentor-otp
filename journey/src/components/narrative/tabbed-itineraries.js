import coreUtils from '../../otp-ui/core-utils'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button, Panel } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withNamespaces } from "react-i18next"

import * as narrativeActions from '../../actions/narrative'
import DefaultItinerary from './default/default-itinerary'
import { getActiveSearch, getRealtimeEffects } from '../../util/state'

const { calculateFares, calculatePhysicalActivity, getTimeZoneOffset } = coreUtils.itinerary
const { formatDuration, formatTime, getTimeFormat } = coreUtils.time

class TabbedItineraries extends Component {
  static propTypes = {
    itineraries: PropTypes.array,
    itineraryClass: PropTypes.func,
    pending: PropTypes.bool,
    activeItinerary: PropTypes.number,
    setActiveItinerary: PropTypes.func,
    setActiveLeg: PropTypes.func,
    setActiveStep: PropTypes.func,
    setUseRealtimeResponse: PropTypes.func,
    useRealtime: PropTypes.bool
  }

  static defaultProps = {
    itineraryClass: DefaultItinerary
  }

  _toggleRealtimeItineraryClick = (e) => {
    const { setUseRealtimeResponse, useRealtime } = this.props
    setUseRealtimeResponse({ useRealtime: !useRealtime })
  }

  render () {
    const {
      activeItinerary,
      itineraries,
      itineraryClass,
      realtimeEffects,
      setActiveItinerary,
      timeFormat,
      useRealtime,
      t,
      ...itineraryClassProps
    } = this.props
    if (!itineraries) return null

    /* TODO: should this be moved? */
    const showRealtimeAnnotation =
      realtimeEffects.isAffectedByRealtimeData && (
        realtimeEffects.exceedsThreshold ||
        realtimeEffects.routesDiffer ||
        !useRealtime
      )
    return (
      <div className='tabbed-itineraries'>
        {itineraries.map((itinerary, index) => {
          return (
            <TabButton
              key={index}
              index={index}
              isActive={index === activeItinerary}
              itinerary={itinerary}
              onClick={setActiveItinerary}
              timeFormat={timeFormat}
              t={t}>
                {/* <RealtimeAnnotation
                  realtimeEffects={realtimeEffects}
                  toggleRealtime={this._toggleRealtimeItineraryClick}
                  useRealtime={useRealtime} />
                */}

                {/* Show active itin if itineraries exist and active itin is defined. */}
                {(itineraries.length > 0 && activeItinerary === index)
                  ? React.createElement(itineraryClass, {
                    itinerary: itineraries[activeItinerary],
                    index: activeItinerary,
                    key: activeItinerary,
                    active: true,
                    expanded: true,
                    routingType: 'ITINERARY',
                    showRealtimeAnnotation,
                    ...itineraryClassProps
                  })
                  : null
                }
            </TabButton>
          )})
        }
      </div>
    )
  }
}

// connect to the redux store

const mapStateToProps = (state, ownProps) => {
  const activeSearch = getActiveSearch(state.otp)
  // const { activeItinerary, activeLeg, activeStep } = activeSearch ? activeSearch.activeItinerary : {}
  const pending = activeSearch ? activeSearch.pending : false
  const realtimeEffects = getRealtimeEffects(state.otp)
  const useRealtime = state.otp.useRealtime
  return {
    // swap out realtime itineraries with non-realtime depending on boolean
    pending,
    realtimeEffects,
    activeItinerary: activeSearch && activeSearch.activeItinerary,
    activeLeg: activeSearch && activeSearch.activeLeg,
    activeStep: activeSearch && activeSearch.activeStep,
    useRealtime,
    companies: state.otp.currentQuery.companies,
    tnc: state.otp.tnc,
    timeFormat: getTimeFormat(state.otp.config),
    user: state.user.loggedInUser
  }
}

class TabButton extends Component {
  _onClick = () => {
    const {index, onClick} = this.props
    // FIXME: change signature once actions resolved with otp-ui
    onClick(index)
  }

  render () {
    const {index, isActive, itinerary, timeFormat, t, children} = this.props
    const timeOptions = {
      format: timeFormat,
      offset: getTimeZoneOffset(itinerary)
    }
    const classNames = []
    const { caloriesBurned } = calculatePhysicalActivity(itinerary)
    const {
      centsToString,
      maxTNCFare,
      minTNCFare,
      transitFare
    } = calculateFares(itinerary)
    // TODO: support non-USD
    const minTotalFare = minTNCFare * 100 + transitFare
    const plus = maxTNCFare && maxTNCFare > minTNCFare ? '+' : ''
    if (isActive) classNames.push('selected')
    return (
      <Panel
        key={`tab-button-${index}`}
        className={classNames.join(' ')}
        onClick={this._onClick}
      >
        <Panel.Heading>
          <div className="title">
            <span>{t('option')} {index + 1}</span>
            {/* The duration as a time range */}
            <span>{formatTime(itinerary.startTime, timeOptions)} - {formatTime(itinerary.endTime, timeOptions)}</span>
          </div>
        </Panel.Heading>
        <Panel.Body>
          <div className='details'>
            {/* The itinerary duration in hrs/mins */}
            <span className="text-center">
              <small><strong>{t('duration')}</strong></small><br/>
              {formatDuration(itinerary.duration)}
            </span>

            {/* the fare / calories summary line */}
            <span className="text-center">
              <small><strong>{t('cals')}</strong></small><br/>
              {minTotalFare ? <span>{`${centsToString(minTotalFare)}${plus}`} &bull; </span> : ''}
              {Math.round(caloriesBurned)}
            </span>

            {/* The 'X tranfers' line, if applicable */}
            {itinerary.transfers > 0 && (
              <span className="text-center">
                <small><strong>{t(itinerary.transfers > 1 ? 'changes' : 'change')}</strong></small><br/>
                {itinerary.transfers}
              </span>
            )}
          </div>

          {
            children &&
              <div className="itinerary">
                {children}
              </div>
          }
        </Panel.Body>
      </Panel>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const {setActiveItinerary, setActiveLeg, setActiveStep, setUseRealtimeResponse} = narrativeActions
  return {
    // FIXME
    setActiveItinerary: (index) => {
      dispatch(setActiveItinerary({index}))
    },
    // FIXME
    setActiveLeg: (index, leg) => {
      dispatch(setActiveLeg({index, leg}))
    },
    // FIXME
    setActiveStep: (index, step) => {
      dispatch(setActiveStep({index, step}))
    },
    // FIXME
    setUseRealtimeResponse: ({useRealtime}) => {
      dispatch(setUseRealtimeResponse({useRealtime}))
    }
  }
}

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(TabbedItineraries))
