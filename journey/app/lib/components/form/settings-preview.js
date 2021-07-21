import coreUtils from '../../otp-ui/core-utils'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'

import { mergeMessages } from '../../util/messages'

class SettingsPreview extends Component {
  static propTypes = {
    // component props
    caret: PropTypes.string,
    compressed: PropTypes.bool,
    editButtonText: PropTypes.element,
    showCaret: PropTypes.bool,
    onClick: PropTypes.func,

    // application state
    companies: PropTypes.string,
    modeGroups: PropTypes.array,
    queryModes: PropTypes.array
  }

  static defaultProps = {
    editButtonText: <i className='fa fa-pencil' />
  }

  render () {
    const { caret, config, query, editButtonText, t } = this.props
    const messages = mergeMessages({
      messages: {
        label: t('settings')
      }
    }, this.props)
    // Show dot indicator if the current query differs from the default query.
    let showDot = coreUtils.query.isNotDefaultQuery(query, config)
    return (
      <div className='button-container'>
        <Button
          aria-label={messages.label.replace('\n', ' ')}
          onClick={this.props.onClick}
          block
        >
          {editButtonText} {messages.label} {caret && <span> <i className={`fa fa-caret-${caret}`} /></span>}
        </Button>
        {showDot && <div className='dot' />}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    config: state.otp.config,
    messages: state.otp.config.language.settingsPreview,
    query: state.otp.currentQuery
  }
}

const mapDispatchToProps = { }

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(SettingsPreview))
