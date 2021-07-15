import moment from 'moment'
import coreUtils from '../../otp-ui/core-utils'
import React, { Component } from 'react'
import { Button, ButtonGroup, Panel, ListGroup, ListGroupItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'

import Icon from '../narrative/icon'
import { forgetSearch, toggleTracking } from '../../actions/api'
import { setQueryParam } from '../../actions/form'
import { forgetPlace, forgetStop, setLocation } from '../../actions/map'
import { setViewedStop } from '../../actions/ui'

const { getDetailText, formatStoredPlaceName, matchLatLon } = coreUtils.map
const { summarizeQuery } = coreUtils.query

const BUTTON_WIDTH = 40

class UserSettings extends Component {
  _disableTracking = () => {
    const { user, toggleTracking } = this.props
    if (!user.trackRecent) return
    const hasRecents = user.recentPlaces.length > 0 || user.recentSearches.length > 0
    // If user has recents and does not confirm deletion, return without doing
    // anything.
    if (hasRecents && !window.confirm('You have recent searches and/or places stored. Disabling storage of recent places/searches will remove these items. Continue?')) {
      return
    }
    // Disable tracking if we reach this statement.
    toggleTracking(false)
  }

  _enableTracking = () => !this.props.user.trackRecent && this.props.toggleTracking(true)

  _getLocations = (user) => {
    const { t } = this.props
    const locations = [...user.locations]
    if (!locations.find(l => l.type === 'work')) {
      locations.push({
        id: 'work',
        type: 'work',
        icon: 'briefcase',
        name: t('add'),
        blank: true
      })
    }
    if (!locations.find(l => l.type === 'home')) {
      locations.push({
        id: 'home',
        type: 'home',
        icon: 'home',
        name: t('add'),
        blank: true
      })
    }
    return locations
  }

  render () {
    const { storageDisclaimer, user, t } = this.props
    const { favoriteStops, trackRecent, recentPlaces, recentSearches } = user
    // Clone locations in order to prevent blank locations from seeping into the
    // app state/store.
    const locations = this._getLocations(user)
    const order = ['home', 'work', 'suggested', 'stop', 'recent']
    const sortedLocations = locations
      .sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type))
    return (
      <div className='user-settings'>
        <Panel>
          <Panel.Heading>
            <Panel.Title componentClass="h3">{t('favorite_places')}</Panel.Title>
          </Panel.Heading>

            <ListGroup>
              {
                sortedLocations.map(location => {
                  return <Place key={location.id} location={location} {...this.props} />
                })
              }
            </ListGroup>
        </Panel>

        <Panel>
          <Panel.Heading>
            <Panel.Title componentClass="h3">{t('favorite_stops')}</Panel.Title>
          </Panel.Heading>
          <ListGroup>
            {
              favoriteStops.length > 0
                ? favoriteStops.map(location => {
                  return <Place key={location.id} location={location} {...this.props} />
                })
                : <ListGroupItem>{t('no_favorite_stops')} </ListGroupItem>
            }
          </ListGroup>
        </Panel>

        {
          trackRecent && recentPlaces.length > 0 &&
            <div className='recent-places-container'>
              <Panel>
                <Panel.Heading>
                  <Panel.Title componentClass="h3">{t('recent_places')}</Panel.Title>
                </Panel.Heading>
                <ListGroup>
                  {recentPlaces.map(location => {
                    return <Place key={location.id} location={location} {...this.props} />
                  })}
                </ListGroup>
              </Panel>
            </div>
        }

        {
          trackRecent && recentSearches.length > 0 &&
            <div className='recent-searches-container'>
              <Panel>
                <Panel.Heading>
                  <Panel.Title componentClass="h3">{t('recent_searches')}</Panel.Title>
                </Panel.Heading>
                <ListGroup>
                  {
                    recentSearches
                      .sort((a, b) => b.timestamp - a.timestamp)
                      .map(search => {
                        return <RecentSearch key={search.id} search={search} {...this.props} />
                      })
                  }
                </ListGroup>
              </Panel>
            </div>
        }

        <Panel>
          <Panel.Heading>
            <Panel.Title componentClass="h3">{t('my_preferences')}</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <div className='remember-settings'>
              <span>{t('save_researches')}</span>
              <ButtonGroup>
                <Button
                  onClick={this._enableTracking}
                  className={trackRecent ? 'active' : ''}
                  bsSize='xsmall'>
                    {t('yes')}
                </Button>
                <Button
                  onClick={this._disableTracking}
                  className={!trackRecent ? 'active' : ''}
                  bsSize='xsmall'>
                    {t('no')}
                </Button>
              </ButtonGroup>
            </div>
          </Panel.Body>
        </Panel>

        {
          storageDisclaimer &&
            <div className="disclaimer">{t(storageDisclaimer)}</div>
        }
      </div>
    )
  }
}


class Place extends Component {
  _onSelect = () => {
    const { location, query, setLocation } = this.props
    if (location.blank) {
      window.alert(`Enter origin/destination in the form (or set via map click) and click the resulting marker to set as ${location.type} location.`)
    } else {
      // If 'to' not set and 'from' does not match location, set as 'to'.
      if (
        !query.to && (
          !query.from || !matchLatLon(location, query.from)
        )
      ) {
        setLocation({ locationType: 'to', location })
      } else if (
        // Vice versa for setting as 'from'.
        !query.from &&
          !matchLatLon(location, query.to)
      ) {
        setLocation({ locationType: 'from', location })
      }
    }
  }

  _onView = () => {
    const { location, setViewedStop } = this.props
    setViewedStop({ stopId: location.id })
  }

  _onForget = () => {
    const { forgetPlace, forgetStop, location } = this.props
    if (location.type === 'stop') forgetStop(location.id)
    else forgetPlace(location.id)
  }

  _isViewable = () => this.props.location.type === 'stop'

  _isForgettable = () =>
    ['stop', 'home', 'work', 'recent'].indexOf(this.props.location.type) !== -1

  _getButtonTitle = () => {
    const { location, t } = this.props
    const { displayName, detailText } = formatStoredPlaceName(location)
    return `${t(displayName)} ${detailText ? `(${detailText})` : ''}`;
  }

  _getButtonLabel = icon => {
    const { location, t } = this.props
    const { displayName } = formatStoredPlaceName(location, false)

    if (icon) {
      return <><Icon type={icon} /> {t(displayName)}</>
    } else {
      return t(displayName);
    }
  }

  render () {
    const { location, t } = this.props
    const { blank, icon } = location
    const showView = this._isViewable()
    const showForget = this._isForgettable() && !blank
    // Determine how much to offset width of main button (based on visibility of
    // other buttons sharing the same line).
    let offset = 0
    if (showView) offset += BUTTON_WIDTH
    if (showForget) offset += BUTTON_WIDTH
    return (
      <div className="place-list-group">
        <ListGroupItem
          href="#"
          header={this._getButtonLabel(icon)}
          onClick={this._onSelect}
        >
          <div className="place-list-inner">
            <div className="place-list-inner__title">
              <Icon type='plus' />
              <small>{getDetailText(location)}</small>
            </div>

            <div className="place-list-inner__cta">
              {showView &&
                <Button
                  onClick={this._onView}
                  bsSize='xsmall'
                  title={t('view_stop')}
                  bsStyle='link'><Icon type='eye' /></Button>
              }
              {showForget &&
                <Button
                  onClick={this._onForget}
                  bsSize='xsmall'
                  bsStyle='link'>
                    <Icon type='times' className='text-danger' />
                  </Button>
              }
            </div>
          </div>
        </ListGroupItem>
      </div>
    )
  }
}

class RecentSearch extends Component {
  _onSelect = () => {
    const { search, setQueryParam } = this.props
    // Update query params and initiate search.
    setQueryParam(search.query, search.id)
  }

  _onForget = () => this.props.forgetSearch(this.props.search.id)

  render () {
    const { search, user, t } = this.props
    const { query, timestamp } = search
    const name = summarizeQuery(query, user.locations)
    return (
      <div className="place-list-group">
        <ListGroupItem
          href="#"
          header={<>{name}</>}
          onClick={this._onSelect}
        >
          <div className="place-list-inner">
            <div className="place-list-inner__title">
              <Icon type='clock-o' />
              <small>{moment(timestamp).fromNow()}</small>
            </div>

            <div className="place-list-inner__cta">
              <Button
                onClick={this._onForget}
                bsSize='xsmall'
                bsStyle='link'>
                  <Icon type='times' className='text-danger' />
              </Button>
            </div>
          </div>
        </ListGroupItem>
      </div>
    )
  }
}

// connect to redux store

const mapStateToProps = (state, ownProps) => {
   const { t } = ownProps;
  return {
    config: state.otp.config,
    currentPosition: state.otp.location.currentPosition,
    nearbyStops: state.otp.location.nearbyStops,
    query: state.otp.currentQuery,
    sessionSearches: state.otp.location.sessionSearches,
    stopsIndex: state.otp.transitIndex.stops,
    storageDisclaimer: state.otp.config.language.storageDisclaimer,
    user: state.otp.user
  }
}

const mapDispatchToProps = {
  forgetStop,
  forgetPlace,
  forgetSearch,
  setLocation,
  setQueryParam,
  setViewedStop,
  toggleTracking
}

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(UserSettings))
