import React, {Component} from 'react'
import FromToLocationPicker from '../../otp-ui/from-to-location-picker'
import { withNamespaces } from 'react-i18next'

class MapPopup extends Component {
  render () {
    const {mapPopupLocation, onSetLocationFromPopup, t} = this.props

    return (
      <div className="otp-ui-mapOverlayPopup">
        <div className="otp-ui-mapOverlayPopup__popupTitle">
          {mapPopupLocation.name.split(',').length > 3
            ? mapPopupLocation.name.split(',').splice(0, 3).join(',')
            : mapPopupLocation.name
          }
        </div>
        <div className="otp-ui-mapOverlayPopup__popupRow">
          <FromToLocationPicker
            location={mapPopupLocation}
            setLocation={onSetLocationFromPopup}
          />
        </div>
      </div>
    )
  }
}

export default withNamespaces()(MapPopup)

