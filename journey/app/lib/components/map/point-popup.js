import React, {Component} from 'react'
import FromToLocationPicker from '../../otp-ui/from-to-location-picker'
import styled from 'styled-components'
import { withNamespaces } from 'react-i18next'

const PopupContainer = styled.div`
  width: 240px;
`

const PopupTitle = styled.div`
  font-size: 14px;
  margin-bottom: 6px;
`

class MapPopup extends Component {
  render () {
    const {mapPopupLocation, onSetLocationFromPopup, t} = this.props

    return (
      <PopupContainer>
        <PopupTitle>
          {mapPopupLocation.name.split(',').length > 3
            ? mapPopupLocation.name.split(',').splice(0, 3).join(',')
            : mapPopupLocation.name
          }
        </PopupTitle>
        <div>
          {t('travel')}
          <FromToLocationPicker
            location={mapPopupLocation}
            setLocation={onSetLocationFromPopup}
          />
        </div>
      </PopupContainer>
    )
  }
}

export default withNamespaces()(MapPopup)

