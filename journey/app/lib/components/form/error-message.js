import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import TripTools from '../narrative/trip-tools'

import { getActiveSearch } from '../../util/state'

class ErrorMessage extends Component {
  static propTypes = {
    error: PropTypes.object
  }

  render () {
    const { error, errorMessages, currentQuery, t } = this.props
    if (!error) return null

    let message = error.msg
    // check for configuration-defined message override
    if (errorMessages) {
      const msgConfig = errorMessages.find(m => m.id === error.id)
      if (msgConfig) {
        if (msgConfig.modes) {
          for (const mode of msgConfig.modes) {
            if (currentQuery.mode.includes(mode)) {
              message = msgConfig.msg
              break
            }
          }
        } else message = msgConfig.msg
      }
    }

    return (
      <div className='error-message'>
        <div className='header'>
          <i className='fa fa-exclamation-circle' />
        </div>
        <div className='message'>{message}</div>
        <TripTools buttonTypes={['START_OVER', 'REPORT_ISSUE']} />
      </div>
    )
  }
}

// connect to the redux store

const mapStateToProps = (state, ownProps) => {
  const activeSearch = getActiveSearch(state.otp)
  return {
    error: activeSearch && activeSearch.response && activeSearch.response[0] && activeSearch.response[0].error,
    currentQuery: state.otp.currentQuery,
    errorMessages: state.otp.config.errorMessages
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(ErrorMessage))
