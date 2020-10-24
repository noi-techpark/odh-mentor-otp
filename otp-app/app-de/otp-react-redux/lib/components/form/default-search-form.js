import PropTypes from 'prop-types'
import React, { Component } from 'react'

import LocationField from './connected-location-field'
import TabbedFormPanel from './tabbed-form-panel'
import SwitchButton from './switch-button'

export default class DefaultSearchForm extends Component {
  static propTypes = {
    mobile: PropTypes.bool,
    ModeIcon: PropTypes.elementType.isRequired
  }

  static defaultProps = {
    showFrom: true,
    showTo: true
  }

  constructor () {
    super()
    this.state = {
      desktopDateTimeExpanded: false,
      desktopSettingsExpanded: false
    }
  }

  render () {
    const { mobile, ModeIcon } = this.props
    const actionText = mobile ? 'tappa' : 'clicca'

    return (
      <div>
        <div className='locations'>
          <LocationField
            inputPlaceholder={`Inserisci partenza o ${actionText} su mappa...`}
            locationType='from'
            showClearButton
          />

          <LocationField
            inputPlaceholder={`Inserisci destinazione o ${actionText} su mappa...`}
            locationType='to'
            showClearButton={!mobile}
          />

          <div className='switch-button-container'>
            <SwitchButton content={<i className='fa fa-exchange fa-rotate-90' />} />
          </div>
        </div>

        <TabbedFormPanel ModeIcon={ModeIcon} />
      </div>
    )
  }
}
