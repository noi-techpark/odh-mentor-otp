import moment from 'moment'
import React, { Component } from 'react'
import { withNamespaces } from "react-i18next";

import CallTimeCounter from './call-time-counter'
import Icon from '../narrative/icon'
import QueryRecord from './query-record'
import {searchToQuery} from '../../util/call-taker'

/**
 * Displays information for a particular call record in the Call Taker window.
 */
class CallRecord extends Component {
  state = {
    expanded: false
  }

  _toggleExpanded = () => {
    const {call, fetchQueries} = this.props
    const {expanded} = this.state
    if (!expanded) fetchQueries(call.id)
    this.setState({expanded: !expanded})
  }

  render () {
    // FIXME: consolidate red color with call taker controls
    const RED = '#C35134'
    const {call, index, inProgress, searches, t} = this.props
    const {expanded} = this.state
    if (!call) return null
    if (inProgress) {
      // Map search IDs made during active call to queries.
      const activeQueries = call.searches
        .map(searchId => searchToQuery(searches[searchId], call, {}))
      return (
        <div>
          <div className='pull-right'>
            <Icon
              style={{color: RED, fontSize: '8px', verticalAlign: '2px'}}
              type='circle'
              className='animate-flicker' />
            <CallTimeCounter style={{display: 'inline'}} />
          </div>
          <Icon type='phone' className='fa-flip-horizontal' />{' '}
          [{t('active_call')}]
          <br />
          <small style={{marginLeft: '20px'}}>
            {t('in_progress')}... {t('click')} <Icon type='stop' /> {t('to_save')}{' '}
            ({call.searches.length} {t('searches')})
          </small>
          <div>
            {activeQueries.length > 0
              ? activeQueries.map((query, i) => (
                <QueryRecord key={i} query={query} index={i} />
              ))
              : t('no_queries_recorded')
            }
          </div>
        </div>
      )
    }
    return (
      <div style={{margin: '5px 0'}}>
        <button
          style={{width: '100%'}}
          className='clear-button-formatting'
          onClick={this._toggleExpanded}
        >
          <Icon type='phone' className='fa-flip-horizontal' />
          {t('call')} {index} ({moment(call.endTime).fromNow()})
        </button>
        {expanded
          ? <ul className='list-unstyled'>
            {call.queries && call.queries.length > 0
              ? call.queries.map((query, i) => (
                <QueryRecord key={i} query={query} index={i} />
              ))
              : t('no_queries_recorded')
            }
          </ul>
          : null
        }
      </div>
    )
  }
}

export default withNamespaces()(CallRecord)
