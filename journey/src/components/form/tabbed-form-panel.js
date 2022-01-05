import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'

import DateTimePreview from './date-time-preview'
import SettingsPreview from './settings-preview'
import DateTimeModal from './date-time-modal'
import ConnectedSettingsSelectorPanel from './connected-settings-selector-panel'

import { setMainPanelContent } from '../../actions/ui'

class TabbedFormPanel extends Component {
  static propTypes = {
    ModeIcon: PropTypes.elementType.isRequired
  }

  render () {
    const { ModeIcon, t } = this.props

    return (
      <div className='tabbed-form-panel'>
        <Row>
          <Col xs={12}>
            <DateTimeModal />
          </Col>
          <Col xs={12}>
            <ConnectedSettingsSelectorPanel ModeIcon={ModeIcon} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default withNamespaces()(TabbedFormPanel)
