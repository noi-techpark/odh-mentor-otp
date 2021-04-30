import currencyFormatter from 'currency-formatter'
import coreUtils from '../../../otp-ui/core-utils'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'

import {
  getTransportationNetworkCompanyEtaEstimate,
  getTransportationNetworkCompanyRideEstimate
} from '../../../actions/api'

const { toSentenceCase } = coreUtils.itinerary
const { formatDuration } = coreUtils.time
const { isMobile } = coreUtils.ui

class TransportationNetworkCompanyLeg extends Component {
  static propTypes = {
    leg: PropTypes.object,
    legMode: PropTypes.object
  }

  state = {}

  render () {
    const { leg, legMode, LYFT_CLIENT_ID, UBER_CLIENT_ID, t } = this.props
    const universalLinks = {
      'UBER': `https://m.uber.com/${isMobile() ? 'ul/' : ''}?client_id=${UBER_CLIENT_ID}&action=setPickup&pickup[latitude]=${leg.from.lat}&pickup[longitude]=${leg.from.lon}&pickup[nickname]=${encodeURI(leg.from.name)}&dropoff[latitude]=${leg.to.lat}&dropoff[longitude]=${leg.to.lon}&dropoff[nickname]=${encodeURI(leg.to.name)}`,
      'LYFT': `https://lyft.com/ride?id=${defaultTncRideTypes['LYFT']}&partner=${LYFT_CLIENT_ID}&pickup[latitude]=${leg.from.lat}&pickup[longitude]=${leg.from.lon}&destination[latitude]=${leg.to.lat}&destination[longitude]=${leg.to.lon}`
    }
    const { tncData } = leg
    return (
      <div>
        <p>* {t('estimated_travel_time_does_not_account_for_traffic')}</p>
        <a
          className='btn btn-default'
          href={universalLinks[legMode.label.toUpperCase()]}
          style={{ marginBottom: 15 }}
          target={isMobile() ? '_self' : '_blank'}>
          {t('book_ride')}
        </a>
        {tncData && tncData.estimatedArrival
          ? <p>{t('ETA_for_a_driver')}: {formatDuration(tncData.estimatedArrival)}</p>
          : <p>{t('could_not_obtain_eta_estimate_from', { label: toSentenceCase(legMode.label) })}</p>
        }
        {/* tncData && tncData.travelDuration &&
          <p>Estimated drive time: {formatDuration(tncData.travelDuration)}</p> */}
        {tncData && tncData.minCost
          ? <p>{t('estimated_cost')}: {
            `${currencyFormatter.format(tncData.minCost, { code: tncData.currency })} - ${currencyFormatter.format(tncData.maxCost, { code: tncData.currency })}`
          }</p>
          : <p>{t('could_not_obtain_ride_estimate_from', { label: toSentenceCase(legMode.label) })}</p>}
        }
      </div>
    )
  }
}

const defaultTncRideTypes = {
  'LYFT': 'lyft',
  'UBER': 'a6eef2e1-c99a-436f-bde9-fefb9181c0b0'
}

const mapStateToProps = (state, ownProps) => {
  const { LYFT_CLIENT_ID, UBER_CLIENT_ID } = state.otp.config
  return {
    companies: state.otp.currentQuery.companies,
    tncData: state.otp.tnc,
    LYFT_CLIENT_ID,
    UBER_CLIENT_ID
  }
}

const mapDispatchToProps = {
  getTransportationNetworkCompanyEtaEstimate,
  getTransportationNetworkCompanyRideEstimate
}

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(TransportationNetworkCompanyLeg))
