import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { withNamespaces } from "react-i18next";

import LocationField from './connected-location-field'
import TabbedFormPanel from './tabbed-form-panel'
import SwitchButton from './switch-button'

class DefaultSearchForm extends Component {
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
    const { mobile, ModeIcon, t } = this.props
    const actionText = t(mobile ? 'tap' : 'click')

    return (
      <>
        <div className='locations'>
          <LocationField
            inputPlaceholder={t('insert_departure_action', { actionText })}
            locationType='from'
            showClearButton
          />

          <LocationField
            inputPlaceholder={t('insert_arrive_action', { actionText })}
            locationType='to'
            showClearButton={!mobile}
          />

          <div className='switch-button-container'>
            <SwitchButton content={<i className='fa fa-exchange fa-rotate-90' />} />
          </div>
        </div>

        <TabbedFormPanel ModeIcon={ModeIcon} />
      </>
    )
  }
}

export default withNamespaces()(DefaultSearchForm)
