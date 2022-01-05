import moment from 'moment'
import coreUtils from '../../otp-ui/core-utils'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button, DropdownButton, MenuItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withNamespaces } from "react-i18next"

const {
  OTP_API_DATE_FORMAT,
  OTP_API_TIME_FORMAT,
  getTimeFormat,
  getDateFormat
} = coreUtils.time

class DateTimePreview extends Component {
  static propTypes = {
    caret: PropTypes.string,
    compressed: PropTypes.bool,
    date: PropTypes.string,
    departArrive: PropTypes.string,
    editButtonText: PropTypes.element,
    time: PropTypes.string,
    onClick: PropTypes.func,
    routingType: PropTypes.string
  }

  static defaultProps = {
    editButtonText: <i className='fa fa-pencil' />
  }

  render () {
    const {
      caret,
      date,
      editButtonText,
      time,
      departArrive,
      routingType,
      startTime,
      endTime,
      timeFormat,
      dateFormat,
      t,
      lng
    } = this.props

    let timeStr
    moment.locale(lng || "it");
    var separator = "a";
    switch(lng){
        case 'it': separator = "a"; break;
        case 'de': separator = "um"; break;
        default: separator = "at";
    }
    const formattedTime = moment.utc(time, OTP_API_TIME_FORMAT).format(timeFormat)
    if (routingType === 'ITINERARY') {
      if (departArrive === 'NOW') timeStr = t('now')
      else if (departArrive === 'ARRIVE') timeStr = `${t('arrive')} ${formattedTime}`
      else if (departArrive === 'DEPART') timeStr = `${t('departure')} ${formattedTime}`
    } else if (routingType === 'PROFILE') {
      timeStr = startTime + " "+separator+" " + endTime
    }

    const summary = (
      <span>
        <i className='fa fa-clock-o' /> {
          moment(date, OTP_API_DATE_FORMAT)
            .calendar(null, { sameElse: dateFormat })
            .split(" "+separator)[0]} - {timeStr}
      </span>
    )

    return (
      <DropdownButton
        title={summary}
        id={`dropdown-date-time-preview`}
      >
        <MenuItem onClick={this.props.onClick}>Parti adesso</MenuItem>
        <MenuItem onClick={this.props.onClick}>Pianifica partenza</MenuItem>
        <MenuItem onClick={this.props.onClick}>Pianifica arrivo</MenuItem>
      </DropdownButton>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { departArrive, date, time, routingType, startTime, endTime } = state.otp.currentQuery
  const config = state.otp.config
  return {
    config,
    routingType,
    departArrive,
    date,
    time,
    startTime,
    endTime,
    timeFormat: getTimeFormat(config),
    dateFormat: getDateFormat(config)
  }
}

const mapDispatchToProps = {
}

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(DateTimePreview))
