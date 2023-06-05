// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'

export default class Icon extends Component {
  static propTypes = {
    // type: PropTypes.string.required
  }
  render () {
    return (
      <FontAwesome
        name={this.props.type}
        fixedWidth
        {...this.props}
      />)
  }
}
