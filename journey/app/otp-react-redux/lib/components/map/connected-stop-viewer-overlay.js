import StopViewerOverlay from '../../otp-ui/stop-viewer-overlay/src'
import DefaultStopMarker from '../../otp-ui/stop-viewer-overlay/src/default-stop-marker'
import { connect } from 'react-redux'

// connect to the redux store

const mapStateToProps = (state, ownProps) => {
  const viewedStop = state.otp.ui.viewedStop
  return {
    stop: viewedStop
      ? state.otp.transitIndex.stops[viewedStop.stopId]
      : null,
    StopMarker: DefaultStopMarker
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(StopViewerOverlay)
