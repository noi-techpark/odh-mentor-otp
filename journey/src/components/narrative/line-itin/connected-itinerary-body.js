import isEqual from 'lodash.isequal'
import TransitLegSummary from '../../../otp-ui/itinerary-body/defaults/transit-leg-summary'
import ItineraryBody from '../../../otp-ui/itinerary-body'
import LineColumnContent from '../../../otp-ui/itinerary-body/otp-react-redux/line-column-content'
import PlaceName from '../../../otp-ui/itinerary-body/otp-react-redux/place-name'
import RouteDescription from '../../../otp-ui/itinerary-body/otp-react-redux/route-description'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setLegDiagram } from '../../../actions/map'
import { setViewedTrip } from '../../../actions/ui'
import TransitLegSubheader from './connected-transit-leg-subheader'
import RealtimeTimeColumn from './realtime-time-column'
import TripDetails from '../connected-trip-details'
import TripTools from '../trip-tools'

const noop = () => {}

class ConnectedItineraryBody extends Component {
  /** avoid rerendering if the itinerary to display hasn't changed */
  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props.itinerary, nextProps.itinerary)
  }

  render () {
    const {
      config,
      diagramVisible,
      itinerary,
      LegIcon,
      setActiveLeg,
      setViewedTrip,
      setLegDiagram,
      timeOptions
    } = this.props

    return (
      <>
        <ItineraryBody
          config={config}
          diagramVisible={diagramVisible}
          itinerary={itinerary}
          LegIcon={LegIcon}
          LineColumnContent={LineColumnContent}
          PlaceName={PlaceName}
          RouteDescription={RouteDescription}
          setActiveLeg={setActiveLeg}
          setLegDiagram={setLegDiagram}
          setViewedTrip={setViewedTrip}
          showAgencyInfo
          showElevationProfile={config.elevationProfile}
          showLegIcon
          showMapButtonColumn={false}
          showRouteFares={config.itinerary && config.itinerary.showRouteFares}
          showViewTripButton
          timeOptions={timeOptions}
          toRouteAbbreviation={noop}
          TransitLegSubheader={TransitLegSubheader}
          TransitLegSummary={TransitLegSummary}
          TimeColumnContent={RealtimeTimeColumn}
        />
        <TripTools itinerary={itinerary} />
      </>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    config: state.otp.config,
    diagramVisible: state.otp.ui.diagramLeg
  }
}

const mapDispatchToProps = {
  setViewedTrip,
  setLegDiagram
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedItineraryBody)
