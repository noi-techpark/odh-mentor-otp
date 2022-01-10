import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withNamespaces } from "react-i18next";

import { switchLocations } from '../../actions/map'

class SwitchButton extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    switchLocations: PropTypes.func
  }

  static defaultProps = {
    content: 'Switch'
  }

  _onClick = () => {
    this.props.switchLocations()
  }

  render () {
    const { content, t } = this.props
    return (
      <Button
        bsSize="small"
        title={t('switch_locations')}
        onClick={this._onClick || this.props.onClick}
      >{content}</Button>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    switchLocations: () => { dispatch(switchLocations()) }
  }
}

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(SwitchButton))
