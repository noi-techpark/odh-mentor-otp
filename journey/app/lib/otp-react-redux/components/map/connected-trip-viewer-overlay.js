import TripViewerOverlay from '../../otp-ui/trip-viewer-overlay/src'
import { connect } from 'react-redux'

// connect to the redux store

const mapStateToProps = (state, ownProps) => {
  const viewedTrip = state.otp.ui.viewedTrip
  return {
    tripData: viewedTrip
      ? state.otp.transitIndex.trips[viewedTrip.tripId]
      : null
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(TripViewerOverlay)
