import { isTransit } from '../../../otp-ui/core-utils/itinerary'
import {
  legType,
  timeOptionsType
} from '../../../otp-ui/core-utils/types'
import { formatTime, getTimeFormat } from '../../../otp-ui/core-utils/time'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { withNamespaces } from 'react-i18next'

const TimeText = styled.div``

const TimeStruck = styled.div`
  text-decoration: line-through;
`

const TimeBlock = styled.div`
  line-height: 1em;
  margin-bottom: 4px;
`

const TimeColumnBase = styled.div``

const StatusText = styled.div`
  color: #bbb;
  font-size: 80%;
  line-height: 1em;
`

const DelayText = styled.span`
  display: block;
  white-space: nowrap;
`

// Reusing stop viewer colors.
const TimeColumnOnTime = styled(TimeColumnBase)`
  ${TimeText}, ${StatusText} {
    color: #5cb85c;
  }
`
const TimeColumnEarly = styled(TimeColumnBase)`
  ${TimeText}, ${StatusText} {
    color: #337ab7;
  }
`
const TimeColumnLate = styled(TimeColumnBase)`
  ${TimeText}, ${StatusText} {
    color: #d9534f;
  }
`

/**
 * This component displays the scheduled departure/arrival time for a leg,
 * and, for transit legs, displays any delays or earliness where applicable.
 */
function RealtimeTimeColumn ({
  isDestination,
  leg,
  timeOptions,
  t
}) {
  const time = isDestination ? leg.endTime : leg.startTime
  const formattedTime = time && formatTime(time, timeOptions)
  const isTransitLeg = isTransit(leg.mode)

  // For non-real-time legs, show only the scheduled time,
  // except for transit legs where we add the "scheduled" text underneath.
  if (!leg.realTime) {
    return (
      <>
        <TimeText>{formattedTime}</TimeText>
        {isTransitLeg && <StatusText>{t('schedule2')}</StatusText>}
      </>
    )
  }

  // Delay in seconds.
  const delay = isDestination ? leg.arrivalDelay : leg.departureDelay
  // Time is in milliseconds.
  const originalTime = time - delay * 1000
  const originalFormattedTime =
    originalTime && formatTime(originalTime, timeOptions)

  // TODO: refine on-time thresholds.
  // const isOnTime = delay >= -60 && delay <= 120;
  const isOnTime = delay === 0

  let statusText
  let TimeColumn = TimeColumnBase
  if (isOnTime) {
    statusText = t('on_time')
    TimeColumn = TimeColumnOnTime
  } else if (delay < 0) {
    statusText = t('early')
    TimeColumn = TimeColumnEarly
  } else if (delay > 0) {
    statusText = t('late')
    TimeColumn = TimeColumnLate
  }

  // Absolute delay in rounded minutes, for display purposes.
  const delayInMinutes = Math.abs(
    Math.round((isDestination ? leg.arrivalDelay : leg.departureDelay) / 60)
  )

  let renderedTime
  if (!isOnTime) {
    // If the transit vehicle is not on time, strike the original scheduled time
    // and display the updated time underneath.
    renderedTime = (
      <TimeBlock>
        {!isOnTime && <TimeStruck>{originalFormattedTime}</TimeStruck>}
        <TimeText>{formattedTime}</TimeText>
      </TimeBlock>
    )
  } else {
    renderedTime = <TimeText>{formattedTime}</TimeText>
  }

  return (
    <TimeColumn>
      {renderedTime}
      <StatusText>
        {/* Keep the '5 min' string on the same line. */}
        {!isOnTime && <DelayText>{delayInMinutes} min</DelayText>}
        {statusText}
      </StatusText>
    </TimeColumn>
  )
}

// Connect to redux store for timeOptions.
const mapStateToProps = (state, ownProps) => {
  return {
    timeOptions: {
      format: getTimeFormat(state.otp.config)
    }
  }
}

export default withNamespaces()(connect(mapStateToProps)(RealtimeTimeColumn))

RealtimeTimeColumn.propTypes = {
  isDestination: PropTypes.bool.isRequired,
  leg: legType.isRequired,
  timeOptions: timeOptionsType
}

RealtimeTimeColumn.defaultProps = {
  timeOptions: null
}
