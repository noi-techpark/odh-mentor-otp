// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from "react-i18next";

import * as formActions from '../../actions/form'
import Icon from '../narrative/icon'

/**
 * Displays information for a query stored for the Call Taker module.
 */
class QueryRecordLayout extends Component {
  _viewQuery = () => {
    const {parseUrlQueryString, query, t} = this.props
    const params = JSON.parse(query.queryParams)
    if ('arriveBy' in params) {
      params.departArrive = params.arriveBy ? 'ARRIVE' : 'DEPART'
    }
    parseUrlQueryString(params)
  }

  render () {
    const {index} = this.props
    return (
      <li>
        <button onClick={this._viewQuery} className='clear-button-formatting'>
          <Icon type='search' />
        </button>{' '}
        {t('query')} {index + 1}
      </li>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const {parseUrlQueryString} = formActions

const mapDispatchToProps = { parseUrlQueryString }

const QueryRecord = withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(QueryRecordLayout))
export default QueryRecord
