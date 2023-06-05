// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { Component } from 'react'

export default class MobileContainer extends Component {
  render () {
    return (
      <div className='otp mobile'>
        {this.props.children}
      </div>
    )
  }
}
