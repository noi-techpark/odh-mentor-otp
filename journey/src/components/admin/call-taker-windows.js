// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from "react-i18next";

import * as callTakerActions from '../../actions/call-taker'
import CallRecord from './call-record'
import DraggableWindow from './draggable-window'
import Icon from '../narrative/icon'

/**
 * Collects the various draggable windows used in the Call Taker module to
 * display, for example, the call record list and (TODO) the list of field trips.
 */
class CallTakerWindows extends Component {
  render () {
    const {callTaker, fetchQueries, searches, t} = this.props
    const {activeCall, callHistory} = callTaker
    return (
      <>
        {callHistory.visible
          // Active call window
          ? <DraggableWindow
            draggableProps={{
              defaultPosition: callHistory.position
            }}
            header={<span><Icon type='history' /> {t('call_history')}</span>}
            onClickClose={this.props.toggleCallHistory}
          >
            {activeCall
              ? <CallRecord
                call={activeCall}
                searches={searches}
                inProgress />
              : null
            }
            {callHistory.calls.data.length > 0
              ? callHistory.calls.data.map((call, i) => (
                <CallRecord
                  key={i}
                  index={i}
                  call={call}
                  fetchQueries={fetchQueries} />
              ))
              : <div>{t('no_calls_in_history')}</div>
            }
          </DraggableWindow>
          : null
        }
      </>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    callTaker: state.callTaker,
    currentQuery: state.otp.currentQuery,
    searches: state.otp.searches
  }
}

const {
  fetchQueries,
  toggleCallHistory
} = callTakerActions

const mapDispatchToProps = { fetchQueries, toggleCallHistory }

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(CallTakerWindows))
