import React, { Component } from 'react'
import { withNamespaces } from "react-i18next"

class SimpleRealtimeAnnotation extends Component {
  render () {
    const {t} = this.props

    return <div className='simple-realtime-annotation'>
      <i className='fa fa-clock-o' /> {t('this_trip_uses_realtime_traffic_and_delay_information')}
    </div>
  }
}

export default withNamespaces()(SimpleRealtimeAnnotation)
