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

  constructor(props) {
    super(props)

    this.state = {
      selectedPanel: null
    }
  }

  _onEditDateTimeClick = () => {
    this.setState({ selectedPanel: 'EDIT_DATETIME' })
  }

  _onEditSettingsClick = () => {
    this.setState({ selectedPanel: 'EDIT_SETTINGS' })
  }

  _onHideClick = () => this.setState({ selectedPanel: null })

  render () {
    const { ModeIcon, mainPanelContent, t } = this.props

    return (
      <div className='tabbed-form-panel'>
        <Row>
          <Col xs={12}>
            <DateTimeModal />
          </Col>
          <Col xs={12}>
            <SettingsPreview onClick={this._onEditSettingsClick} />
          </Col>
        </Row>

        {
          this.state.selectedPanel &&
            <div className='active-panel'>
              {
                this.state.selectedPanel === 'EDIT_SETTINGS' &&
                  <ConnectedSettingsSelectorPanel ModeIcon={ModeIcon} />
              }

              <div className='text-center'>
                <Button bsStyle="link" bsSize="small" onClick={this._onHideClick}>
                  {t('hide_settings')}
                </Button>
              </div>
            </div>
        }
      </div>
    )
  }
}

export default withNamespaces()(TabbedFormPanel)
