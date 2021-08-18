import coreUtils from '../../../otp-ui/core-utils'
import React from 'react'
import { withNamespaces } from 'react-i18next'

import ItineraryBody from './connected-itinerary-body'
import ItinerarySummary from './itin-summary'
import NarrativeItinerary from '../narrative-itinerary'
import SimpleRealtimeAnnotation from '../simple-realtime-annotation'
import LinkButton from '../../user/link-button'

const { getLegModeLabel, getTimeZoneOffset, isTransit } = coreUtils.itinerary

class LineItinerary extends NarrativeItinerary {
  _headerText () {
    const { itinerary } = this.props
    return itinerary.summary || this._getSummary(itinerary)
  }

  _getSummary (itinerary) {
    const { t } = this.props
    let summary = ''
    let transitModes = []
    itinerary.legs.forEach((leg, index) => {
      if (isTransit(leg.mode)) {
        const modeStr = t(getLegModeLabel(leg))
        if (transitModes.indexOf(modeStr) === -1) transitModes.push(modeStr)
      }
    })

    // check for access mode
    if (!isTransit(itinerary.legs[0].mode)) {
      summary += t(getLegModeLabel(itinerary.legs[0]))
    }

    // append transit modes, if applicable
    if (transitModes.length > 0) {
      summary += ` ${t(to)} ` + transitModes.join(', ')
    }

    return summary
  }

  render () {
    const {
      active,
      companies,
      expanded,
      itinerary,
      itineraryFooter,
      LegIcon,
      onClick,
      setActiveLeg,
      showRealtimeAnnotation,
      timeFormat,
      user,
      t
    } = this.props

    if (!itinerary) {
      return <div>{t('no_itinerary')}</div>
    }

    const timeOptions = {
      format: timeFormat,
      offset: getTimeZoneOffset(itinerary)
    }

    return (
      <div className='line-itin'>
        <ItinerarySummary
          companies={companies}
          itinerary={itinerary}
          LegIcon={LegIcon}
          onClick={onClick}
          timeOptions={timeOptions}
        />

        {user &&
          <span className='pull-right'><LinkButton to='/savetrip'>{t('save_this_option')}</LinkButton></span>
        }

        {showRealtimeAnnotation && <SimpleRealtimeAnnotation />}
        {active || expanded
          ? <ItineraryBody
            itinerary={itinerary}
            LegIcon={LegIcon}
            // timeOptions={timeOptions}
            // Don't use setActiveLeg as an import
            // (will cause error when clicking on itinerary suymmary).
            // Use the one passed by NarrativeItineraries instead.
            setActiveLeg={setActiveLeg}
            timeOptions={timeOptions}
          />
          : null}
        {itineraryFooter}
      </div>
    )
  }
}

export default withNamespaces()(LineItinerary)
